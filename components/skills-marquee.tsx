"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  CodeIcon,
  LayoutIcon,
  ServerIcon,
  DatabaseIcon,
  GitBranchIcon,
  PenToolIcon,
  GlobeIcon,
  ZapIcon,
  TerminalIcon,
  PackageIcon,
  CpuIcon,
  BarChartIcon,
  CloudIcon,
  Smartphone,
  SmartphoneIcon,
  ShieldIcon,
} from "lucide-react"

interface Skill {
  name: string
  icon: React.ReactNode
  color: string
}

export default function SkillsMarquee() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const skills: Skill[] = [
    { name: "JavaScript", icon: <CodeIcon className="h-6 w-6" />, color: "bg-yellow-500" },
    { name: "React", icon: <CodeIcon className="h-6 w-6" />, color: "bg-blue-400" },
    { name: "React Native", icon: <Smartphone className="h-6 w-6" />, color: "bg-blue-400" },
    { name: "TypeScript", icon: <CodeIcon className="h-6 w-6" />, color: "bg-blue-600" },
    { name: "Next.js", icon: <PackageIcon className="h-6 w-6" />, color: "bg-black" },
    { name: "HTML5", icon: <LayoutIcon className="h-6 w-6" />, color: "bg-orange-500" },
    { name: "CSS3", icon: <PenToolIcon className="h-6 w-6" />, color: "bg-blue-500" },
    { name: "Tailwind CSS", icon: <PenToolIcon className="h-6 w-6" />, color: "bg-cyan-500" },
    { name: "Node.js", icon: <ServerIcon className="h-6 w-6" />, color: "bg-green-600" },
    { name: "Express", icon: <ServerIcon className="h-6 w-6" />, color: "bg-gray-600" },
    { name: "MongoDB", icon: <DatabaseIcon className="h-6 w-6" />, color: "bg-green-500" },
    { name: "PostgreSQL", icon: <DatabaseIcon className="h-6 w-6" />, color: "bg-blue-700" },
    { name: "GraphQL", icon: <GlobeIcon className="h-6 w-6" />, color: "bg-pink-600" },
    { name: "REST API", icon: <GlobeIcon className="h-6 w-6" />, color: "bg-indigo-500" },
    { name: "Git", icon: <GitBranchIcon className="h-6 w-6" />, color: "bg-orange-600" },
    { name: "Docker", icon: <PackageIcon className="h-6 w-6" />, color: "bg-blue-600" },
    // { name: "AWS", icon: <CloudIcon className="h-6 w-6" />, color: "bg-yellow-600" },
    { name: "Firebase", icon: <ZapIcon className="h-6 w-6" />, color: "bg-yellow-500" },
    { name: "Redux", icon: <CpuIcon className="h-6 w-6" />, color: "bg-purple-600" },
    { name: "Framer Motion", icon: <ZapIcon className="h-6 w-6" />, color: "bg-purple-500" },
    { name: "Jest", icon: <TerminalIcon className="h-6 w-6" />, color: "bg-red-600" },
    { name: "Figma", icon: <PenToolIcon className="h-6 w-6" />, color: "bg-purple-500" },
    { name: "Responsive Design", icon: <SmartphoneIcon className="h-6 w-6" />, color: "bg-teal-500" },
    { name: "Performance", icon: <BarChartIcon className="h-6 w-6" />, color: "bg-green-500" },
    { name: "Security", icon: <ShieldIcon className="h-6 w-6" />, color: "bg-red-500" },
  ]

  // Duplicate skills array to ensure seamless looping
  const duplicatedSkills = [...skills, ...skills]

  return (
    <section className={`py-12 overflow-hidden transition-colors duration-300 ${isDark ? "bg-black" : "bg-gray-100"}`}>
      <div className="mb-8 text-center">
        <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Tech Stack</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex whitespace-nowrap gap-8 py-6"
          animate={{
            x: isHovered ? 0 : [0, -3500],
          }}
          transition={{
            x: {
              duration: 50,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-colors ${
                isDark
                  ? "bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-primary"
                  : "bg-white/70 backdrop-blur-sm border-gray-200 hover:border-primary"
              }`}
            >
              <div className={`p-2 rounded-full ${skill.color} text-white`}>{skill.icon}</div>
              <span className={`font-medium whitespace-nowrap ${isDark ? "text-white" : "text-gray-800"}`}>
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fade effect on edges */}
        <div
          className={`absolute top-0 left-0 h-full w-24 z-10 ${
            isDark ? "bg-gradient-to-r from-black to-transparent" : "bg-gradient-to-r from-gray-100 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute top-0 right-0 h-full w-24 z-10 ${
            isDark ? "bg-gradient-to-l from-black to-transparent" : "bg-gradient-to-l from-gray-100 to-transparent"
          }`}
        ></div>
      </div>
    </section>
  )
}
