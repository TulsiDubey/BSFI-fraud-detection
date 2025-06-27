"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/contexts/UserContext"
import { gsap } from "gsap"
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react"

interface HeroSectionProps {
  user: UserProfile
}

export default function HeroSection({ user }: HeroSectionProps) {
  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .fromTo(
        ".hero-stats",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
  }, [])

  const scrollToRecommendations = () => {
    const element = document.getElementById("recommendations")
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Message */}
          <h1 className="hero-title text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user.name}
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your personalized financial dashboard is ready. Discover tailored recommendations and take control of your
            financial future with confidence.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="hero-stats bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">₹{user.income.toLocaleString()}</h3>
              <p className="text-gray-600">Annual Income</p>
            </div>

            <div className="hero-stats bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{user.riskAppetite}</h3>
              <p className="text-gray-600">Risk Appetite</p>
            </div>

            <div className="hero-stats bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.dependents}</h3>
              <p className="text-gray-600">Dependents</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hero-cta">
            <Button
              onClick={scrollToRecommendations}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View My Recommendations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
