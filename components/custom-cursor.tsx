"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Mark as mounted to prevent hydration issues
    setIsMounted(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y)
      const isPointerElement = hoveredElement?.closest('a, button, [role="button"], input, select, textarea')
      setIsPointer(!!isPointerElement)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseover", updateCursorType)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseover", updateCursorType)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [position])

  // Don't render anything during SSR or before client-side mount
  if (!isMounted) {
    return null
  }

  // Check if on mobile device (no custom cursor)
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null
  }

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 z-50 pointer-events-none ${isDark ? "mix-blend-difference" : "mix-blend-darken"}`}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        <motion.div
          className={`w-2 h-2 rounded-full ${isDark ? "bg-white" : "bg-gray-800"}`}
          animate={{ scale: isClicking ? 0.5 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
      <motion.div
        className={`fixed top-0 left-0 z-50 pointer-events-none ${isDark ? "mix-blend-difference" : "mix-blend-darken"}`}
        animate={{
          x: position.x - (isPointer ? 20 : 16),
          y: position.y - (isPointer ? 20 : 16),
          width: isPointer ? 40 : 32,
          height: isPointer ? 40 : 32,
          opacity: isHidden ? 0 : 0.5,
          borderRadius: isPointer ? "25%" : "50%",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <motion.div
          className={`w-full h-full border rounded-full ${isDark ? "border-white" : "border-gray-800"}`}
          animate={{ scale: isClicking ? 0.8 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  )
}
