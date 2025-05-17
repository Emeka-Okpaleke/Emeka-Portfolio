"use client"

import type React from "react"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@/components/theme-provider"

// Import components that use browser APIs with dynamic import to prevent SSR
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  // Only show components after client-side mount
  useEffect(() => {
    setIsMounted(true)

    // Force dark mode initially
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }, [])

  if (!isMounted) {
    // Return a simple loading state or nothing
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <CustomCursor />
      {children}
    </ThemeProvider>
  )
}
