"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { gsap } from "gsap"
import { Eye, EyeOff, Shield, TrendingUp, Users } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setIsAuthenticated } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // GSAP animations for page load
    const tl = gsap.timeline()

    tl.fromTo(".hero-section", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .fromTo(".login-card", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .fromTo(
        ".feature-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.3",
      )
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setIsAuthenticated(true)
        toast({
          title: "Login Successful",
          description: "Welcome to BSFI Dashboard",
        })
        router.push("/profile-setup")
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Hero Section */}
          <div className="hero-section space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BSFI</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Your trusted partner for Banking, Financial Services, and Insurance solutions. Secure your future with
                our comprehensive financial products.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-6">
              <div className="feature-card flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure & Trusted</h3>
                  <p className="text-gray-600">Bank-grade security for all your transactions</p>
                </div>
              </div>

              <div className="feature-card flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Investments</h3>
                  <p className="text-gray-600">AI-powered recommendations for better returns</p>
                </div>
              </div>

              <div className="feature-card flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Support</h3>
                  <p className="text-gray-600">24/7 customer support from financial experts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="login-card">
            <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot Password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
