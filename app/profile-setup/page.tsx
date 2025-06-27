"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { gsap } from "gsap"
import { ArrowLeft, ArrowRight, User, DollarSign, Target, TrendingUp } from "lucide-react"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Financial Details", icon: DollarSign },
  { id: 3, title: "Goals & Preferences", icon: Target },
  { id: 4, title: "Investment Profile", icon: TrendingUp },
]

const financialGoals = [
  "Retirement Planning",
  "Child Education",
  "Home Buying",
  "Emergency Fund",
  "Wealth Creation",
  "Tax Saving",
]

const futurePlans = [
  "Travel",
  "Business Investment",
  "Property Purchase",
  "Vehicle Purchase",
  "Medical Expenses",
  "Wedding Expenses",
]

const policyTypes = [
  "Life Insurance",
  "Health Insurance",
  "Vehicle Insurance",
  "Mutual Funds",
  "Fixed Deposits",
  "PPF/ELSS",
]

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    income: "",
    dependents: "",
    financialGoals: [] as string[],
    riskAppetite: "",
    investmentExperience: "",
    futurePlans: [] as string[],
    preferredPolicies: [] as string[],
  })
  const { setUser, isAuthenticated } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // GSAP animations
    gsap.fromTo(".step-indicator", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })
    gsap.fromTo(".form-card", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" })
  }, [isAuthenticated, router])

  useEffect(() => {
    // Animate step changes
    gsap.fromTo(".form-content", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 })
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const userProfile = {
      name: formData.name,
      email: "user@example.com", // This would come from login
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      income: Number.parseInt(formData.income),
      dependents: Number.parseInt(formData.dependents),
      financialGoals: formData.financialGoals,
      riskAppetite: formData.riskAppetite as "low" | "medium" | "high",
      investmentExperience: formData.investmentExperience as "beginner" | "intermediate" | "advanced",
      futurePlans: formData.futurePlans,
      preferredPolicies: formData.preferredPolicies,
    }

    setUser(userProfile)
    toast({
      title: "Profile Setup Complete",
      description: "Welcome to your personalized dashboard!",
    })
    router.push("/dashboard")
  }

  const handleCheckboxChange = (field: "financialGoals" | "futurePlans" | "preferredPolicies", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-content space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender (Optional)</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="form-content space-y-6">
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income (₹)</Label>
              <Input
                id="income"
                type="number"
                value={formData.income}
                onChange={(e) => setFormData((prev) => ({ ...prev, income: e.target.value }))}
                placeholder="Enter your annual income"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Financial Dependents</Label>
              <Input
                id="dependents"
                type="number"
                value={formData.dependents}
                onChange={(e) => setFormData((prev) => ({ ...prev, dependents: e.target.value }))}
                placeholder="Number of dependents"
                className="h-12"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="form-content space-y-6">
            <div className="space-y-4">
              <Label>Financial Goals (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {financialGoals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.financialGoals.includes(goal)}
                      onCheckedChange={() => handleCheckboxChange("financialGoals", goal)}
                    />
                    <Label htmlFor={goal} className="text-sm">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label>Future Plans (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {futurePlans.map((plan) => (
                  <div key={plan} className="flex items-center space-x-2">
                    <Checkbox
                      id={plan}
                      checked={formData.futurePlans.includes(plan)}
                      onCheckedChange={() => handleCheckboxChange("futurePlans", plan)}
                    />
                    <Label htmlFor={plan} className="text-sm">
                      {plan}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="form-content space-y-6">
            <div className="space-y-2">
              <Label htmlFor="risk">Risk Appetite</Label>
              <Select
                value={formData.riskAppetite}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, riskAppetite: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your risk appetite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - I prefer safe investments</SelectItem>
                  <SelectItem value="medium">Medium - I can take moderate risks</SelectItem>
                  <SelectItem value="high">High - I'm comfortable with high-risk investments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Investment Experience</Label>
              <Select
                value={formData.investmentExperience}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, investmentExperience: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to investing</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced investor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Preferred Policy Types (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {policyTypes.map((policy) => (
                  <div key={policy} className="flex items-center space-x-2">
                    <Checkbox
                      id={policy}
                      checked={formData.preferredPolicies.includes(policy)}
                      onCheckedChange={() => handleCheckboxChange("preferredPolicies", policy)}
                    />
                    <Label htmlFor={policy} className="text-sm">
                      {policy}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="step-indicator flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="form-card shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Help us understand your financial needs to provide personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <span>{currentStep === 4 ? "Complete Setup" : "Next"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
