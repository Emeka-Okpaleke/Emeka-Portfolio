"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MailIcon, PhoneIcon, MapPinIcon, GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
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

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-muted/30" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: 30 }}
            animate={infoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={infoInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MailIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:olisemekaokpaleke08@gmail.com" className="font-medium hover:text-primary transition-colors">
                      olisemekaokpaleke08@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={infoInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+(234) 812-3884-228</p>
                  </div>
                </motion.div>
                {/* <motion.div
                  className="flex items-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={infoInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </motion.div> */}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/Emeka-Okpaleke"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  <GithubIcon className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/olisemeka-okpaleke-9087a82b3/"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </motion.a>
                {/* <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  <TwitterIcon className="h-5 w-5" />
                </motion.a> */}
                <motion.a
                  href="https://www.instagram.com/emeka_okp/"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  <InstagramIcon className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={infoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="p-6 bg-card rounded-xl shadow-lg"
            >
              <h4 className="text-xl font-bold mb-2">Let's Work Together</h4>
              <p className="text-muted-foreground mb-4">
                Have a project in mind? Let's discuss how we can bring your ideas to life with stunning animations and
                interactions.
              </p>
              <Button variant="outline" className="rounded-full group" asChild>
                <a href="mailto:olisemekaokpaleke08@gmail.com">
                  <MailIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Send Me an Email
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
