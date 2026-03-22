"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

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
    router.push("/dashboard");
  };

  return (
    <main className={styles.container}>
      <div className={styles.webStringLeft} />
      <div className={styles.webStringRight} />

      <div className={`${styles.loading} ${isLoaded ? styles.fadeOut : ""}`}>
        <div className={styles.cardWrapper}>
          <Image
            src="/loading.png"
            alt="Spider-Man"
            width={280}
            height={280}
            className={styles.card}
            priority
          />
        </div>
        <p className={styles.loadingText}>Loading...</p>
        <div className={styles.filmGrain} />
      </div>

      <div className={`${styles.videoContainer} ${isLoaded ? styles.visible : ""}`}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={handleVideoCanPlay}
          className={styles.video}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay} />
        <div className={styles.filmGrainSubtle} />

        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={150}
            className={styles.logoImage}
          />
        </div>

        {showContent && (
          <div className={styles.enterButton}>
            <button
              onClick={handleEnter}
              className={styles.enterButtonInner}
              aria-label="Enter the app"
            >
              Enter the Multiverse
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
