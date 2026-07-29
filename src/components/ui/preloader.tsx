"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"

const words = [
  "SELAMAT",
  "DATANG DI",
  "ARTIFICIAL RIPE"
]

const opacity: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.96,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
}

const slideUp: Variants = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (index === words.length - 1) {
      // Word 3 ("ARTIFICIAL RIPE") stays for 800ms, then slideUp exit takes 800ms = Total 4000ms (4 seconds)
      const timer = setTimeout(() => {
        setIsExiting(true)
        const completeTimer = setTimeout(() => {
          onComplete?.()
        }, 800)
        return () => clearTimeout(completeTimer)
      }, 800)
      return () => clearTimeout(timer)
    }

    // Step each of the first 3 words at 800ms interval (3 * 800ms = 2400ms)
    const timer = setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [index, onComplete])

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black z-[99999999999] pointer-events-auto overflow-hidden select-none"
    >
      {/* Background Video - Stays active and visible during exit slide */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/bc.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1] backdrop-blur-[1px]" />

      {/* Professional Silver Metallic Gradient Typography */}
      <motion.p
        key={index}
        variants={opacity}
        initial="initial"
        animate="enter"
        className="absolute z-10 text-center font-extrabold uppercase tracking-wider text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
      >
        {words[index]}
      </motion.p>
    </motion.div>
  )
}
