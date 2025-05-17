"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import SkillsMarquee from "@/components/skills-marquee"

// Import loader with dynamic import to prevent SSR
const LoaderScreen = dynamic(() => import("@/components/loader-screen"), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Only show components after client-side mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Don't render anything until client-side mount
  if (!isMounted) {
    return null
  }

  return (
    <>
      {isLoading && <LoaderScreen onLoadingComplete={handleLoadingComplete} />}

      <AnimatePresence>
        {!isLoading && (
          <motion.main
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero animateOnLoad={true} />
            <About />
            <SkillsMarquee />
            <Skills />
            <Projects />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
