"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Code2Icon, PenToolIcon, LayoutIcon, ZapIcon, DatabaseIcon, GitBranchIcon, Smartphone } from "lucide-react"

interface Skill {
  name: string
  percentage: number
  icon: React.ReactNode
  color: string
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills: Skill[] = [
    {
      name: "Frontend Development",
      percentage: 95,
      icon: <Code2Icon className="h-6 w-6" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Mobile Development",
      percentage: 90,
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Responsive Design",
      percentage: 98,
      icon: <LayoutIcon className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
    },
    { name: "Animation", percentage: 85, icon: <ZapIcon className="h-6 w-6" />, color: "from-amber-500 to-orange-500" },
    {
      name: "Backend Integration",
      percentage: 75,
      icon: <DatabaseIcon className="h-6 w-6" />,
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Version Control",
      percentage: 88,
      icon: <GitBranchIcon className="h-6 w-6" />,
      color: "from-indigo-500 to-blue-500",
    },
  ]

  const stats = [
    { value: 5, label: "Years Experience" },
    { value: 20, label: "Projects Completed" },
    { value: 5, label: "Happy Clients" },
    { value: 5, label: "Certificates" },
  ]

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden bg-muted/30" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0 }}
          animate={skillsInView ? { opacity: 1 } : {}}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4`}>{skill.icon}</div>
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>

              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={skillsInView ? { width: `${skill.percentage}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${skill.color}`}
                />
              </div>

              <div className="mt-2 text-right font-medium">
                {skillsInView ? <CountUp end={skill.percentage} suffix="%" duration={1.5} delay={index * 0.1} /> : "0%"}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={statsInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-card p-6 rounded-xl shadow-lg"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsInView ? <CountUp end={stat.value} duration={2} delay={0.5} /> : "0"}
                <span>+</span>
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
