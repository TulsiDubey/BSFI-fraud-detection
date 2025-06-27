"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { UserProfile } from "@/contexts/UserContext"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, ArrowRight, Shield, TrendingUp, Heart, PiggyBank } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Recommendation {
  id: string
  name: string
  type: string
  description: string
  benefits: string[]
  rating: number
  monthlyPremium?: number
  expectedReturns?: string
  icon: any
  color: string
  priority: "high" | "medium" | "low"
}

interface RecommendationsSectionProps {
  user: UserProfile
}

export default function RecommendationsSection({ user }: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    // Generate personalized recommendations based on user profile
    const generateRecommendations = (): Recommendation[] => {
      const recs: Recommendation[] = []

      // Life Insurance - High priority for users with dependents
      if (user.dependents > 0) {
        recs.push({
          id: "1",
          name: "SecureLife Term Plan",
          type: "Term Insurance",
          description:
            "Comprehensive term life insurance with high coverage amount to secure your family's financial future.",
          benefits: [
            `Coverage up to ₹${(user.income * 10).toLocaleString()}`,
            "Tax benefits under Section 80C",
            "Accidental death benefit",
            "Critical illness rider available",
          ],
          rating: 4.8,
          monthlyPremium: Math.floor(user.income * 0.001),
          icon: Shield,
          color: "bg-blue-100 text-blue-600 border-blue-200",
          priority: "high",
        })
      }

      // Health Insurance - Always high priority
      recs.push({
        id: "2",
        name: "HealthGuard Family Plan",
        type: "Health Insurance",
        description: "Comprehensive health insurance covering your entire family with cashless treatment options.",
        benefits: [
          `Family coverage up to ₹${(user.dependents + 1) * 500000}`,
          "Cashless treatment at 10,000+ hospitals",
          "Pre & post hospitalization coverage",
          "Annual health check-ups included",
        ],
        rating: 4.7,
        monthlyPremium: Math.floor((user.dependents + 1) * 800),
        icon: Heart,
        color: "bg-red-100 text-red-600 border-red-200",
        priority: "high",
      })

      // Investment recommendations based on risk appetite
      if (user.riskAppetite === "high" && user.investmentExperience !== "beginner") {
        recs.push({
          id: "3",
          name: "GrowthMax Equity Fund",
          type: "Mutual Fund",
          description: "High-growth equity mutual fund perfect for aggressive investors seeking maximum returns.",
          benefits: [
            "Historical returns: 15-18% annually",
            "Diversified equity portfolio",
            "SIP starting from ₹500",
            "Tax-efficient long-term gains",
          ],
          rating: 4.6,
          expectedReturns: "15-18% p.a.",
          icon: TrendingUp,
          color: "bg-green-100 text-green-600 border-green-200",
          priority: "high",
        })
      } else if (user.riskAppetite === "medium") {
        recs.push({
          id: "4",
          name: "BalancedGrow Hybrid Fund",
          type: "Hybrid Fund",
          description: "Balanced approach combining equity and debt for steady growth with moderate risk.",
          benefits: [
            "Historical returns: 10-12% annually",
            "60% equity, 40% debt allocation",
            "Lower volatility than pure equity",
            "Suitable for medium-term goals",
          ],
          rating: 4.5,
          expectedReturns: "10-12% p.a.",
          icon: TrendingUp,
          color: "bg-yellow-100 text-yellow-600 border-yellow-200",
          priority: "high",
        })
      } else {
        recs.push({
          id: "5",
          name: "SecureDebt Conservative Fund",
          type: "Debt Fund",
          description: "Low-risk debt fund ideal for conservative investors prioritizing capital protection.",
          benefits: [
            "Historical returns: 7-9% annually",
            "High credit quality portfolio",
            "Low volatility and risk",
            "Better than traditional FDs",
          ],
          rating: 4.3,
          expectedReturns: "7-9% p.a.",
          icon: PiggyBank,
          color: "bg-blue-100 text-blue-600 border-blue-200",
          priority: "medium",
        })
      }

      // Tax saving recommendations
      if (user.financialGoals.includes("Tax Saving")) {
        recs.push({
          id: "6",
          name: "TaxSaver ELSS Fund",
          type: "ELSS",
          description: "Equity Linked Savings Scheme offering tax benefits under Section 80C with growth potential.",
          benefits: [
            "Tax deduction up to ₹1.5 lakh",
            "Historical returns: 12-15% annually",
            "Shortest lock-in period (3 years)",
            "Wealth creation with tax benefits",
          ],
          rating: 4.4,
          expectedReturns: "12-15% p.a.",
          icon: TrendingUp,
          color: "bg-purple-100 text-purple-600 border-purple-200",
          priority: "high",
        })
      }

      // Retirement planning for older users
      if (user.age > 30 && user.financialGoals.includes("Retirement Planning")) {
        recs.push({
          id: "7",
          name: "RetirementSecure Pension Plan",
          type: "Pension Plan",
          description: "Systematic retirement planning solution to ensure a comfortable post-retirement life.",
          benefits: [
            "Guaranteed pension after retirement",
            "Tax benefits during accumulation",
            "Flexible premium payment options",
            "Spouse pension option available",
          ],
          rating: 4.2,
          monthlyPremium: Math.floor((user.income * 0.05) / 12),
          icon: PiggyBank,
          color: "bg-indigo-100 text-indigo-600 border-indigo-200",
          priority: "medium",
        })
      }

      // Sort by priority and return top 4-6 recommendations
      return recs
        .sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })
        .slice(0, 6)
    }

    setRecommendations(generateRecommendations())
  }, [user])

  useEffect(() => {
    const cards = gsap.utils.toArray(".recommendation-card")

    cards.forEach((card: any, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        },
      )
    })
  }, [recommendations])

  return (
    <section id="recommendations" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Personalized{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recommendations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your profile, financial goals, and risk appetite, here are our AI-powered recommendations tailored
            specifically for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon
            return (
              <Card
                key={rec.id}
                className={`recommendation-card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border-2 ${rec.color.split(" ")[2]} overflow-hidden relative`}
              >
                {rec.priority === "high" && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Recommended</Badge>
                  </div>
                )}

                <CardHeader className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${rec.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                    {rec.name}
                  </CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {rec.type}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">{rec.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">{rec.description}</CardDescription>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {rec.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {rec.monthlyPremium && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Monthly Premium</div>
                      <div className="text-2xl font-bold text-gray-900">₹{rec.monthlyPremium.toLocaleString()}</div>
                    </div>
                  )}

                  {rec.expectedReturns && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm text-green-600">Expected Returns</div>
                      <div className="text-2xl font-bold text-green-700">{rec.expectedReturns}</div>
                    </div>
                  )}

                  <Button className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Need more personalized advice? Our financial experts are here to help.</p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 bg-transparent"
          >
            Consult with Expert
          </Button>
        </div>
      </div>
    </section>
  )
}
