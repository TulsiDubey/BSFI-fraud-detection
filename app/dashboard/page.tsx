"use client"

import { useEffect, useRef } from "react"
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

gsap.registerPlugin(ScrollTrigger)

export default function DashboardPage() {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

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
    </div>
  )
}
