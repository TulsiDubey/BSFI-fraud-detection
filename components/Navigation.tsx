"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Menu, X, User, LogOut } from "lucide-react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, setIsAuthenticated, setUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    gsap.fromTo(".nav-container", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      })
    }
    setIsOpen(false)
  }

  return (
    <nav className="nav-container fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BSFI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("recommendations")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Recommendations
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-4 h-4" />
              <span className="text-sm">Welcome, {user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("recommendations")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Recommendations
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                FAQ
              </button>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-700 mb-4">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome, {user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
