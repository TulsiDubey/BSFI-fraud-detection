"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { MessageCircle, X, Mic, Send } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useUser()
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (!user) {
      router.push("/profile-setup")
    } else {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user, router])

  const handleSend = () => {
    // Placeholder for sending message logic
    setMessage("")
  }

  const handleVoice = () => {
    // Placeholder for voice input logic
    alert("Voice input not implemented yet.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      {/* Chatbot Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg backdrop-blur-md"
        onClick={() => setChatOpen(true)}
        style={{ display: chatOpen ? 'none' : 'block' }}
        aria-label="Open Chatbot"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col" style={{ minHeight: '350px' }}>
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <span className="font-semibold text-gray-800">Chatbot</span>
            <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            {/* Chat messages would go here */}
            <div className="text-gray-500 text-sm text-center mt-8">How can I help you today?</div>
          </div>
          <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white/60 backdrop-blur-md rounded-b-xl">
            <button onClick={handleVoice} className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
              placeholder="Type your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
            />
            <button onClick={handleSend} className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
