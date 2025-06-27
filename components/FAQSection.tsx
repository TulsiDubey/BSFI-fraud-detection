"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, ChevronUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "How does the recommendation system work?",
    answer:
      "Our AI-powered recommendation system analyzes your financial profile, including income, age, dependents, risk appetite, and financial goals to suggest the most suitable insurance and investment products. The system uses advanced algorithms to match your needs with our comprehensive product portfolio.",
  },
  {
    question: "Are my personal and financial details secure?",
    answer:
      "Absolutely. We use bank-grade security measures including 256-bit SSL encryption, multi-factor authentication, and comply with all regulatory requirements. Your data is stored securely and never shared with third parties without your explicit consent.",
  },
  {
    question: "Can I modify my investment portfolio later?",
    answer:
      "Yes, you can modify your investment portfolio at any time. We provide flexible options to switch between funds, increase or decrease SIP amounts, and rebalance your portfolio based on changing financial goals and market conditions.",
  },
  {
    question: "What is the claim settlement process for insurance?",
    answer:
      "Our claim settlement process is streamlined and customer-friendly. For health insurance, we offer cashless treatment at network hospitals. For life insurance claims, we have a dedicated claims team that processes claims within 7-10 working days with proper documentation.",
  },
  {
    question: "How often should I review my financial portfolio?",
    answer:
      "We recommend reviewing your financial portfolio at least once every 6 months or whenever there are significant life changes such as marriage, childbirth, job change, or major financial goals. Our platform provides regular portfolio health checks and rebalancing suggestions.",
  },
  {
    question: "What are the tax benefits available?",
    answer:
      "Various tax benefits are available under different sections of the Income Tax Act. Life insurance premiums qualify for deduction under Section 80C (up to ₹1.5 lakh), health insurance under Section 80D, and ELSS investments also under Section 80C. Our tax advisory team can help optimize your tax savings.",
  },
  {
    question: "Can I get expert advice for my investments?",
    answer:
      "Yes, we have a team of certified financial advisors and investment experts available for consultation. You can schedule one-on-one sessions, participate in webinars, or access our comprehensive educational resources to make informed investment decisions.",
  },
  {
    question: "What happens if I miss my premium payments?",
    answer:
      "Most insurance policies have a grace period (usually 30 days) for premium payments. If you miss payments, we send reminders and offer options to pay with minimal penalties. For investments, you can pause or modify SIPs as needed without significant charges.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    gsap.fromTo(
      ".faq-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    const faqItems = gsap.utils.toArray(".faq-item")
    faqItems.forEach((item: any, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        },
      )
    })
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="faq-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our services, security, and how we can help you achieve your financial
            goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="faq-item overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="cursor-pointer" onClick={() => toggleFAQ(index)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@bsfi.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Email Support
            </a>
            <a
              href="tel:+911800123456"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Call Us: 1800-123-456
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
