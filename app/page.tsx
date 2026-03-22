"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { DesktopIcons } from "@/components/desktop-icons";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoCanPlay = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  };

  const handleEnter = () => {
    setShowDesktop(true);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="absolute left-[20%] w-[3px] h-[200px] bg-gradient-to-b from-transparent via-primary to-transparent animate-web-string" />
      <div className="absolute right-[20%] w-[3px] h-[200px] bg-gradient-to-b from-transparent via-primary to-transparent animate-web-string animation-delay-1000" />

      <AnimatePresence mode="wait">
        {!isLoaded && !showDesktop && (
          <motion.div
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="absolute top-[5%] left-1/2 -translate-x-1/2 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={150}
                className="w-[300px] h-auto"
              />
            </motion.div>

            <div className="relative animate-mask-peel">
              <Image
                src="/loading.png"
                alt="Spider-Man"
                width={280}
                height={280}
                className="w-[280px] h-auto object-contain animate-glow-pulse animation-delay-1000"
                priority
              />
            </div>
            <p className="mt-8 text-2xl font-bold tracking-[0.3em] uppercase text-foreground animate-dramatic-zoom animation-delay-500 animation-fill-mode-both animate-text-glitch animation-delay-1500">
              Loading...
            </p>
            <div className="fixed inset-0 w-full h-full pointer-events-none opacity-80 z-[1000] animate-film-grain animation-steps-10" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-[5%] left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={150}
            className="w-[300px] h-auto drop-shadow-[0_0_30px_rgba(224,17,2,0.5)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={handleVideoCanPlay}
          className="w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none" />
        <div className="fixed inset-0 w-full h-full pointer-events-none opacity-40 z-50 animate-film-grain animation-steps-8" />

        <AnimatePresence>
          {showContent && !showDesktop && (
            <motion.div
              className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <button
                onClick={handleEnter}
                className="px-12 py-4 text-lg font-bold tracking-[0.15em] uppercase text-white bg-primary border-2 border-primary rounded cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(224,17,2,0.3),0_0_40px_rgba(224,17,2,0.2)] hover:bg-transparent hover:text-primary hover:shadow-[0_0_30px_rgba(224,17,2,0.5),0_0_60px_rgba(224,17,2,0.3)] hover:scale-105 active:scale-98"
                aria-label="Enter the app"
              >
                Enter the Multiverse
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showDesktop && (
          <motion.div
            className="absolute inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-[1.2]"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <motion.div
              className="absolute top-[5%] left-1/2 -translate-x-1/2 z-60"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div
                className="flex items-center justify-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={300}
                  height={150}
                  className="w-[300px] h-auto drop-shadow-[0_0_30px_rgba(224,17,2,0.5)]"
                />
              </motion.div>
            </motion.div>
            <DesktopIcons />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
