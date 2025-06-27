"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import RecommendationsSection from "@/components/RecommendationsSection"
import FAQSection from "@/components/FAQSection"
import Navigation from "@/components/Navigation"
import { MessageCircle, X, Mic, Send } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function DashboardPage() {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")

  // Example chat messages (replace with real chat logic)
  const defaultMessages = [
    { from: "user", text: "What services do you offer?" },
    { from: "bot", text: "We offer a range of financial services including investment planning, insurance, and retirement solutions. How can I assist you today?" },
  ]

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login")
      return
    }

    // Smooth scrolling setup
    const container = containerRef.current
    if (container) {
      gsap.to(container, {
        duration: 0.1,
        ease: "none",
      })
    }

    // Initialize scroll-triggered animations
    const sections = gsap.utils.toArray(".animate-section")
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isAuthenticated, user, router])

  const handleSend = () => {
    setMessage("")
  }

  const handleVoice = () => {
    alert("Voice input not implemented yet.")
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Navigation />
      <main className="smooth-scroll">
        <section className="animate-section">
          <HeroSection user={user} />
        </section>
        <section className="animate-section">
          <AboutSection />
        </section>
        <section className="animate-section">
          <ServicesSection />
        </section>
        <section className="animate-section">
          <RecommendationsSection user={user} />
        </section>
        <section className="animate-section">
          <FAQSection />
        </section>
      </main>
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
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-full bg-white/30 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col border border-white/30" style={{ minHeight: '480px', height: '480px' }}>
          <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/20 rounded-t-2xl">
            <span className="font-semibold text-gray-800">AdvisorBot</span>
            <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat messages would go here */}
            {/*
              INTEGRATION INSTRUCTIONS:
              1. Replace the defaultMessages array with your chat state (e.g., messages from useState).
              2. On handleSend, send the user's message to your chatbot API/model and append the response to the chat.
              3. Optionally, show a loading indicator while waiting for the bot's reply.
              4. For voice, use the Web Speech API or a third-party service to convert speech to text and send it as a message.
            */}
            <div className="space-y-4">
              {defaultMessages.map((msg, idx) => (
                <div key={idx} className={msg.from === "user" ? "text-right" : "text-left"}>
                  <span className={
                    msg.from === "user"
                      ? "inline-block bg-blue-600 text-white px-4 py-2 rounded-lg rounded-br-none max-w-[80%]"
                      : "inline-block bg-white/80 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none border border-gray-200 max-w-[80%]"
                  }>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-white/20 bg-white/20 rounded-b-2xl">
            {/* Input area with both buttons inside */}
            <div className="flex items-center gap-2 bg-white/60 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <button
                onClick={handleVoice}
                className="p-2 rounded-md hover:bg-blue-100 text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              <input
                type="text"
                className="flex-1 px-2 py-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
