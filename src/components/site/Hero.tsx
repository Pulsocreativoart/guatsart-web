"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (!videoRef.current) return;
      if (query.matches) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } else {
        void videoRef.current.play().catch(() => undefined);
      }
    };
    updatePlayback();
    query.addEventListener("change", updatePlayback);
    return () => query.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <section aria-labelledby="hero-title" className="hero" id="inicio" ref={ref}>
      <motion.div className="hero-media" style={{ scale: mediaScale }}>
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero-gallery-poster.jpg"
          preload="metadata"
          ref={videoRef}
        >
          <source src="/media/hero-gallery.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-scrim" />
      <motion.div className="hero-content" style={{ y: contentY }}>
        <p className="hero-kicker">Ciudad de Guatemala · Archivo vivo</p>
        <h1 id="hero-title">GÜATS<br />ART</h1>
        <div className="hero-meta">
          <p>Una no galería<br />por NOUBODY.</p>
          <a className="hero-scroll" href="#obra">
            Explorar obra <ArrowIcon className="hero-scroll-icon" direction="down" />
          </a>
        </div>
      </motion.div>
      <div aria-hidden="true" className="hero-line hero-line-one" />
      <div aria-hidden="true" className="hero-line hero-line-two" />
    </section>
  );
}
