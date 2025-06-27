"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useUser()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (!user) {
      router.push("/profile-setup")
    } else {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  )
}
