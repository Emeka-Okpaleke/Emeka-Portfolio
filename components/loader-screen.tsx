"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoaderScreenProps {
  onLoadingComplete: () => void;
}

export default function LoaderScreen({ onLoadingComplete }: LoaderScreenProps) {
  const [isExploding, setIsExploding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to prevent hydration issues
    setIsMounted(true);

    // Start explosion animation after 3 seconds
    const timer = setTimeout(() => {
      setIsExploding(true);

      // Notify parent component that loading is complete after explosion animation
      const completeTimer = setTimeout(() => {
        onLoadingComplete();
      }, 600); // Duration of explosion animation

      return () => clearTimeout(completeTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Don't render anything during SSR or before client-side mount
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={
        isExploding
          ? {
              opacity: 0,
              scale: 5,
            }
          : { opacity: 1 }
      }
      transition={
        isExploding
          ? {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1], // Custom easing for explosive feel
            }
          : {}
      }
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-violet-500"
          animate={{
            rotate: 360,
            background: [
              "linear-gradient(to right, #8b5cf6, #3b82f6, #8b5cf6)",
              "linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)",
            ],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            background: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <motion.div
              className="w-24 h-24 rounded-full bg-background"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold animated-gradient-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Emeka Okpaleke
        </motion.h1>

        <motion.div
          className="mt-4 text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Portfolio
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
