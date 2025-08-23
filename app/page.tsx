"use client";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StyledButton from "./components/button";

export default function LandingPage() {
  const { scrollY } = useScroll();
 
  const opacity = useTransform(scrollY, [0, 400], [1, 0], { clamp: true });
  const y = useTransform(scrollY, [0, 400], [0, -80], { clamp: true });

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden relative scroll-smooth">
      {/* Hero Section */}
      <motion.section
        style={{ opacity }}
        className="relative h-screen w-full"
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./images/bg.png')" }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-950/70 to-black/80" />

        {/* Content */}
        <motion.div
          style={{ y }}
          className="relative container mx-auto flex flex-col items-start justify-center h-full px-6 md:px-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-green-300 text-xl md:text-2xl font-medium tracking-[0.2em] uppercase"
          >
            Welcome to
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold mt-4 leading-snug drop-shadow-lg"
          >
            Haryali
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="text-green-200 text-lg md:text-2xl font-medium mt-4"
          >
            Clearing Fields, Greening Futures
          </motion.h2>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <StyledButton href="#form" variant="primary">
              Start Selling
            </StyledButton>
            <StyledButton onClick={handleScrollDown} variant="secondary">
              Learn More
            </StyledButton>
          </motion.div>
        </motion.div>

        {/* Scroll Down Button */}
        <motion.div
          onClick={handleScrollDown}
          className="absolute bottom-8 right-8 cursor-pointer p-3 rounded-full 
                     bg-green-500/10 backdrop-blur-md border border-green-400/30 
                     hover:bg-green-500/20 hover:scale-110
                     transition-all duration-300 shadow-lg shadow-green-400/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <KeyboardArrowDownIcon className="!text-green-200 !text-3xl" />
        </motion.div>
      </motion.section>
    </div>
  );
}
