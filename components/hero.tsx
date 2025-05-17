"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Typewriter from "typewriter-effect";
import { MoonIcon, SunIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroProps {
  animateOnLoad?: boolean;
}

export default function Hero({ animateOnLoad = false }: HeroProps) {
  const { theme, setTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);

    // Hide pulse after 10 seconds
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();

      // Calculate mouse position as percentage of container
      const x = (clientX / width - 0.5) * 2; // -1 to 1
      const y = (clientY / height - 0.5) * 2; // -1 to 1

      setMousePosition({ x, y });
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.transform = `translate(${
        mousePosition.x * -15
      }px, ${mousePosition.y * -15}px)`;
    }

    if (mountainsRef.current) {
      mountainsRef.current.style.transform = `translate(${
        mousePosition.x * -25
      }px, ${mousePosition.y * -5}px)`;
    }

    if (starsRef.current) {
      starsRef.current.style.transform = `translate(${
        mousePosition.x * -5
      }px, ${mousePosition.y * -5}px)`;
    }

    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${
        mousePosition.x * 10
      }px, ${mousePosition.y * 10}px)`;
    }
  }, [mousePosition]);

  // Handle scroll to next section
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle theme toggle with pulse hiding
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setShowPulse(false); // Hide pulse after user clicks
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  const isDarkTheme = theme === "dark";

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dark Theme Background */}
        <AnimatePresence initial={false}>
          {isDarkTheme && (
            <motion.div
              key="dark-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              ref={backgroundRef}
              className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out"
              style={{ willChange: "transform" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
              <Image
                src="/images/parallax-background.jpg"
                alt="Night sky with mountains"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Light Theme Background */}
        <AnimatePresence initial={false}>
          {!isDarkTheme && (
            <motion.div
              key="light-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              ref={backgroundRef}
              className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out"
              style={{ willChange: "transform" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/40 z-10" />
              <Image
                src="/images/light-background.jpg"
                alt="Misty mountains in daylight"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stars Layer - Only visible in dark theme */}
        <AnimatePresence initial={false}>
          {isDarkTheme && (
            <motion.div
              key="stars-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              ref={starsRef}
              className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out z-20"
              style={{ willChange: "transform" }}
            >
              {/* This is a semi-transparent overlay to simulate stars moving differently */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-transparent via-white/5 opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mountains Layer - Moves fastest for depth */}
        <div
          ref={mountainsRef}
          className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out z-30"
          style={{ willChange: "transform" }}
        >
          {/* This is just to enhance the silhouette effect */}
          <div
            className={`absolute bottom-0 w-full h-1/3 ${
              isDarkTheme
                ? "bg-gradient-to-t from-black/80 to-transparent"
                : "bg-gradient-to-t from-white/20 to-transparent"
            }`}
          />
        </div>
      </div>

      {/* Theme Toggle Button with Pulsing Wave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-4 right-4 z-50"
      >
        <div className="relative">
          {/* Pulsing waves - multiple layers for better effect */}
          {showPulse && (
            <>
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  isDarkTheme ? "bg-white/5" : "bg-gray-800/5"
                }`}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  isDarkTheme ? "bg-white/10" : "bg-gray-800/10"
                }`}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  isDarkTheme ? "bg-white/20" : "bg-gray-800/20"
                }`}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* Tooltip that appears briefly */}
          {showPulse && (
            <motion.div
              className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs ${
                isDarkTheme
                  ? "bg-white/20 backdrop-blur-sm text-white"
                  : "bg-gray-800/70 backdrop-blur-sm text-white"
              }`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              🔅
            </motion.div>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={handleThemeToggle}
            className={`relative rounded-full w-10 h-10 ${
              isDarkTheme
                ? "bg-black/30 backdrop-blur-sm border-white/20 hover:bg-black/50"
                : "bg-white/30 backdrop-blur-sm border-black/10 hover:bg-white/50"
            }`}
            aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} mode`}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isDarkTheme ? 0 : 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute"
            >
              {isDarkTheme ? (
                <MoonIcon className="h-5 w-5 text-white" />
              ) : (
                <SunIcon className="h-5 w-5 text-gray-800" />
              )}
            </motion.div>
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 z-40 transition-transform duration-200 ease-out"
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ y: animateOnLoad ? 100 : 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: animateOnLoad ? 0.2 : 0,
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              <span className="animated-gradient-text">
                Hello, I'm Emeka Okpaleke
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: animateOnLoad ? 100 : 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: animateOnLoad ? 0.4 : 0.2,
              ease: "easeOut",
            }}
            className={`text-xl md:text-2xl font-medium mb-8 h-12 drop-shadow-lg ${
              isDarkTheme ? "text-white/90" : "text-gray-800"
            }`}
          >
            <Typewriter
              options={{
                strings: [
                  "FullStack Developer",
                  "Mobile Developer",
                  "Creative Technologist",
                  "Animation Specialist",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ y: animateOnLoad ? 100 : 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: animateOnLoad ? 0.6 : 0.4,
              ease: "easeOut",
            }}
            className="flex gap-4"
          >
            <Button
              className={`rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 ${
                isDarkTheme
                  ? "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                  : "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-800/90 text-white border-gray-800/80"
              }`}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </Button>
            <Button
              variant="outline"
              className={`rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 ${
                isDarkTheme
                  ? "bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50"
                  : "bg-white/50 backdrop-blur-sm border-gray-800/30 text-gray-800 hover:bg-white/70"
              }`}
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className={`w-8 h-14 rounded-full border-2 flex justify-center p-1 mb-2 ${
              isDarkTheme ? "border-white/50" : "border-gray-800/50"
            }`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className={`w-1 rounded-full ${
                isDarkTheme ? "bg-white/80" : "bg-gray-800/80"
              }`}
              initial={{ height: "30%" }}
              animate={{ height: ["30%", "60%", "30%"], y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDownIcon
              className={`h-6 w-6 ${
                isDarkTheme ? "text-white/80" : "text-gray-800/80"
              }`}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
