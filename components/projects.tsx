"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { ExternalLinkIcon, GithubIcon, YoutubeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  youtubeUrl?: string
}

export default function Projects() {
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

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects: Project[] = [
    {
      title: "HotelPro Dashboard",
      description: "HotelPro is a comprehensive hotel management dashboard designed to streamline operations for hospitality businesses. The dashboard provides a centralized interface for managing various aspects of hotel operations including reservations, room management, billing, guest feedback, and room service.",
      image: "/hotelpro-mock.png",
      tags: ["TypeScript", "shadcn/ui", "Framer motion"],
      liveUrl: "https://hotel-pro-dashboard.vercel.app/",
      githubUrl: "https://github.com/Emeka-Okpaleke/hotel-pro",
    },
        {
      title: "Fitness App",
      description: "A mobile app designed to help users track their gym progress, explore a library of workouts with descriptions. Built with Expo and React Native, the app features a clean UI including light/dark mode.",
      image: "/fitnessApp.png",
      tags: ["React Native", "Expo"],
      liveUrl: "https://expo.dev/accounts/emeka8/projects/MyGymApp/updates/2988a434-8f36-4b0e-a5b6-d5e4d17817c5",
      githubUrl: "https://github.com/Emeka-Okpaleke/GymApp",
      youtubeUrl: "https://youtube.com/shorts/GqySg_ZAd9A?si=qOdBcbDLQH46ZPVz" // Add this
    },
    {
      title: "3D Motion Visualization",
      description: "A professional Three.js web application demonstrating real-time 3D model visualization with animation capabilities, perfect for showcasing motion analytics and performance tracking skills.",
      image: "/3d.png",
      tags: ["Three.js", "Javascript"],
      liveUrl: "https://3d-athlete-viewer.vercel.app/",
      githubUrl: "https://github.com/Emeka-Okpaleke/3D-model",
    },
    {
      title: "DevLink – Developer Portfolio & Networking Platform",
      description: "DevLink is a fullstack web application where developers can showcase their work, build personal portfolios, and connect with other developers — like GitHub meets LinkedIn for coders.",
      image: "/devlink.png",
      tags: ["Next.js 14", "Node.js", "PostgreSQL", "Firebase Auth"],
      liveUrl: "https://dev-link-rffy.vercel.app/",
      githubUrl: "/",
    },
    {
      title: "Movie Search Website",
      description: "A modern responsive web application built with Next.js that allows users to search for movies and view detailed information using the OMDB API",
      image: "/movie-mock.png",
      tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://movie-search-web-sigma.vercel.app/",
      githubUrl: "https://github.com/Emeka-Okpaleke/movie-search-web",
    },

  ]

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0 }}
          animate={projectsInView ? { opacity: 1 } : {}}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} inView={projectsInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  inView: boolean
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  // Extract YouTube video ID from URL (supports regular videos and Shorts)
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = project.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full"
      >
        <div className="relative h-64 overflow-hidden">
          {showVideo && youtubeId ? (
            <div className="relative w-full h-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-2 left-2 z-20 px-3 py-1 bg-black/70 hover:bg-black/90 text-white rounded-full text-sm transition-colors"
              >
                Show Image
              </button>
            </div>
          ) : (
            <>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {youtubeId && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors">
                    <YoutubeIcon className="h-8 w-8 text-white" fill="white" />
                  </div>
                </button>
              )}
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="sm" className="rounded-full group">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Live Demo
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-full group">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4 group-hover:animate-spin" />
                Code
              </a>
            </Button>
            {project.youtubeUrl && (
              <Button
                onClick={() => setShowVideo(!showVideo)}
                variant="outline"
                size="sm"
                className="rounded-full group border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <YoutubeIcon className="mr-2 h-4 w-4" />
                {showVideo ? "Hide" : "Video"}
              </Button>
            )}
          </div>
        </div>

        <motion.div
          className="absolute top-2 right-2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ExternalLinkIcon className="h-6 w-6 text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
