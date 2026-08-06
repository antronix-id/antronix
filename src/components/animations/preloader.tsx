"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import TextType from "@/components/animations/text-type";

const words = "SELAMAT DATANG DI ANTRONIX"

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
  const [isExiting, setIsExiting] = useState(false)

  const handleTextComplete = () => {
    // Hold final text briefly then trigger exit transition
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onComplete?.()
      }, 800)
    }, 800)
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black z-[99999999999] pointer-events-auto overflow-hidden select-none"
    >
      {/* Background Video */}
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

      {/* Professional Silver Metallic Gradient Typography with TextType */}
      <div className="absolute z-10 text-center px-4 max-w-5xl">
        <TextType
          text={words}
          typingSpeed={50}
          loop={false}
          showCursor={true}
          cursorCharacter="|"
          cursorClassName="text-slate-200 font-light opacity-80"
          className="font-extrabold uppercase tracking-wider text-3xl sm:text-5xl md:text-6xl bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
          onComplete={handleTextComplete}
        />
      </div>
    </motion.div>
  )
}
