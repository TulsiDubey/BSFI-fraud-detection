"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface UserProfile {
  name: string
  email: string
  age: number
  gender?: string
  income: number
  dependents: number
  financialGoals: string[]
  riskAppetite: "low" | "medium" | "high"
  investmentExperience: "beginner" | "intermediate" | "advanced"
  futurePlans: string[]
  preferredPolicies: string[]
}

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
