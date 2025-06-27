"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Heart, Car, TrendingUp, Home, PiggyBank, Calculator, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family with cashless treatment options.",
    features: ["Cashless Treatment", "Pre & Post Hospitalization", "Day Care Procedures"],
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Secure your family's future with our range of life insurance policies.",
    features: ["Term Insurance", "Whole Life", "ULIP Plans"],
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Car,
    title: "Vehicle Insurance",
    description: "Complete protection for your vehicles with comprehensive coverage options.",
    features: ["Third Party Coverage", "Comprehensive Plans", "Zero Depreciation"],
    color: "bg-green-100 text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Mutual Funds",
    description: "Grow your wealth with our expertly curated mutual fund investment options.",
    features: ["SIP Plans", "Lump Sum Investment", "Tax Saving Funds"],
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Home,
    title: "Home Loans",
    description: "Make your dream home a reality with our competitive home loan rates.",
    features: ["Low Interest Rates", "Quick Approval", "Flexible Tenure"],
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: PiggyBank,
    title: "Fixed Deposits",
    description: "Secure your savings with guaranteed returns through our FD schemes.",
    features: ["Guaranteed Returns", "Flexible Tenure", "Premature Withdrawal"],
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Calculator,
    title: "Tax Saving",
    description: "Optimize your tax savings with our range of tax-efficient investment options.",
    features: ["ELSS Funds", "PPF", "Tax Planning"],
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Investment Plans",
    description: "Diversified investment portfolios tailored to your risk appetite and goals.",
    features: ["Portfolio Management", "Risk Assessment", "Regular Reviews"],
    color: "bg-pink-100 text-pink-600",
  },
]

export default function ServicesSection() {
  useEffect(() => {
    const cards = gsap.utils.toArray(".service-card")

    cards.forEach((card: any, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        },
      )
    })
  }, [])

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial solutions designed to meet all your banking, investment, and insurance needs under
            one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="service-card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
