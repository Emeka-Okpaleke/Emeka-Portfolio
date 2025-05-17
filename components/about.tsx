"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileDownIcon } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/Emeka.jpeg"
                alt="Emeka Okpaleke"
                width={500}
                height={500}
                className="object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Creative Developer & Designer
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate fullstack developer and designer with a keen eye
              for creating engaging, interactive experiences. With expertise in
              modern web technologies and animation techniques, I bring digital
              products to life through thoughtful design and smooth
              interactions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach combines technical precision with creative vision,
              resulting in websites and applications that not only function
              flawlessly but also delight users with their aesthetic appeal and
              intuitive interfaces.
            </p>
            {/* <div className="pt-4">
              <Button className="rounded-full px-6 group">
                <FileDownIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div> */}
            <div className="pt-4">
              <a
                href="/resume.pdf"
                download
                className="inline-block"
              >
                <Button className="rounded-full px-6 group">
                  <FileDownIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download Resume
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
