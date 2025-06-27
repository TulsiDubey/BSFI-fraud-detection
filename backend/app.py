from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import logging
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow all origins for testing

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure Gemini API
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    # Check available models
    models = genai.list_models()
    supported_models = [m.name for m in models if 'generateContent' in m.supported_generation_methods]
    logger.info(f"Supported models: {supported_models}")
    # Use gemini-1.5-flash (fallback to gemini-1.5-pro if needed)
    model_name = "gemini-1.5-flash"
    if model_name not in [m.split('/')[-1] for m in supported_models]:
        logger.warning(f"Model {model_name} not found, trying gemini-1.5-pro")
        model_name = "gemini-1.5-pro"
    model = genai.GenerativeModel(model_name)
    logger.info(f"Using model: {model_name}")
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {str(e)}")
    model = None

# In-memory storage
profiles = {}
interaction_history = {}

# BFSI Manager prompt
BFSI_PROMPT = """
You are a BFSI (Banking, Financial Services, and Insurance) manager. Answer customer queries in a simple, clear, and professional manner, making complex terms and procedures easy to understand for beginners. Avoid jargon, use examples, and keep responses concise. For complex terms (e.g., ULIP, EMI), provide a beginner-friendly explanation with an example. Maintain a polite and supportive tone.
"""

@app.route("/api/profile", methods=["POST"])
def save_profile():
    try:
        data = request.get_json()
        if not data or "user_id" not in data:
            logger.warning("Invalid profile request: missing user_id")
            return jsonify({"error": "user_id is required"}), 400
        user_id = data["user_id"]
        profiles[user_id] = data
        logger.info(f"Profile saved for user_id: {user_id}")
        return jsonify({"message": "Profile saved successfully"})
    except Exception as e:
        logger.error(f"Error in save_profile: {str(e)}")
        return jsonify({"error": f"Failed to save profile: {str(e)}"}), 500

@app.route("/api/recommend", methods=["POST"])
def recommend_policy():
    try:
        data = request.get_json()
        if not data or "user_id" not in data:
            logger.warning("Invalid recommend request: missing user_id")
            return jsonify({"error": "user_id is required"}), 400
        user_id = data["user_id"]
        if user_id not in profiles:
            logger.warning(f"Profile not found for user_id: {user_id}")
            return jsonify({"error": "Profile not found"}), 404
        if not model:
            logger.error("Gemini model not initialized")
            return jsonify({"error": "AI model unavailable"}), 500
        profile = profiles[user_id]
        prompt = f"""
        {BFSI_PROMPT}
        Recommend an insurance policy for a user with income {profile.get('income', 'unknown')}, {profile.get('dependents', 0)} dependents, and goals {profile.get('goals', 'unknown')}. Explain why it suits them in simple terms, comparing it to one other option (e.g., Term Insurance vs. ULIP).
        """
        response = model.generate_content(prompt)
        if not response or not hasattr(response, 'text') or not response.text:
            logger.error("Empty or invalid response from Gemini API")
            return jsonify({"error": "Failed to generate recommendation"}), 500
        logger.info(f"Recommendation generated for user_id: {user_id}")
        return jsonify({"recommendation": response.text})
    except Exception as e:
        logger.error(f"Error in recommend_policy: {str(e)}")
        return jsonify({"error": f"Failed to generate recommendation: {str(e)}"}), 500

@app.route("/api/fraud", methods=["POST"])
def detect_fraud():
    try:
        data = request.get_json()
        if not data or "user_id" not in data or "premium" not in data:
            logger.warning("Invalid fraud request: missing user_id or premium")
            return jsonify({"error": "user_id and premium are required"}), 400
        user_id = data["user_id"]
        premium = float(data["premium"])
        if user_id not in profiles:
            logger.warning(f"Profile not found for user_id: {user_id}")
            return jsonify({"error": "Profile not found"}), 404
        profile = profiles[user_id]
        income = float(profile.get("income", 0))
        if income == 0:
            logger.warning(f"Invalid income for user_id: {user_id}")
            return jsonify({"error": "Income data missing or invalid"}), 400
        if premium > 0.1 * income:
            logger.info(f"Fraud alert triggered for user_id: {user_id}")
            return jsonify({"fraud_alert": "Warning: The premium is high compared to your income."})
        if user_id in interaction_history:
            recent_requests = [t for t in interaction_history[user_id] if (datetime.now() - t).total_seconds() < 3600]
            if len(recent_requests) > 3:
                logger.info(f"Fraud alert for frequent requests: {user_id}")
                return jsonify({"fraud_alert": "Multiple policy applications detected in a short time."})
        logger.info(f"No fraud detected for user_id: {user_id}")
        return jsonify({"fraud_alert": "No issues detected"})
    except ValueError as e:
        logger.error(f"ValueError in detect_fraud: {str(e)}")
        return jsonify({"error": "Invalid numerical input"}), 400
    except Exception as e:
        logger.error(f"Error in detect_fraud: {str(e)}")
        return jsonify({"error": f"Failed to perform fraud check: {str(e)}"}), 500

@app.route("/api/chat", methods=["POST"])
def chatbot():
    try:
        data = request.get_json()
        if not data or "query" not in data:
            logger.warning("Invalid chat request: missing query")
            return jsonify({"error": "query is required"}), 400
        query = data["query"]
        user_id = data.get("user_id", "anonymous")
        if user_id not in interaction_history:
            interaction_history[user_id] = []
        interaction_history[user_id].append(datetime.now())
        if not model:
            logger.error("Gemini model not initialized")
            return jsonify({"error": "AI model unavailable"}), 500
        prompt = f"""
        {BFSI_PROMPT}
        Customer query: {query}
        Provide a clear, beginner-friendly response. If the query involves a complex term or procedure, explain it simply with an example.
        """
        response = model.generate_content(prompt)
        if not response or not hasattr(response, 'text') or not response.text:
            logger.error("Empty or invalid response from Gemini API")
            return jsonify({"error": "Failed to process query"}), 500
        logger.info(f"Chat response generated for user_id: {user_id}, query: {query}")
        return jsonify({"response": response.text})
    except Exception as e:
        logger.error(f"Error in chatbot: {str(e)}")
        return jsonify({"error": f"Failed to process query: {str(e)}"}), 500

@app.route("/api/health", methods=["GET"])
def health_check():
    logger.info("Health check requested")
    return jsonify({"status": "healthy", "model_available": bool(model), "model_name": model._model_name if model else "none"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)