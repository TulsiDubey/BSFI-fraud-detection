"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Building2, Users, Award, Globe } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  useEffect(() => {
    const stats = gsap.utils.toArray(".stat-item")

    stats.forEach((stat: any) => {
      gsap.fromTo(
        stat,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Animate numbers counting up
    const numbers = gsap.utils.toArray(".count-up")
    numbers.forEach((number: any) => {
      const target = Number.parseInt(number.textContent)
      gsap.fromTo(
        number,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: number,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  }, [])

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BSFI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Banking, Financial Services, and Insurance - Your comprehensive partner for all financial needs. We combine
            cutting-edge technology with expert knowledge to deliver personalized financial solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="stat-item text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <span className="count-up">50000</span>+
            </div>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="stat-item text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <span className="count-up">25</span>+
            </div>
            <p className="text-gray-600">Years Experience</p>
          </div>

          <div className="stat-item text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <span className="count-up">100</span>+
            </div>
            <p className="text-gray-600">Awards Won</p>
          </div>

          <div className="stat-item text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4">
              <Globe className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <span className="count-up">500</span>+
            </div>
            <p className="text-gray-600">Cities Served</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="stat-item">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To democratize financial services by providing accessible, transparent, and personalized banking and
              insurance solutions that empower individuals and businesses to achieve their financial goals with
              confidence.
            </p>
          </div>

          <div className="stat-item">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading digital-first financial services platform that transforms how people interact with
              money, investments, and insurance through innovative technology and exceptional customer experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
