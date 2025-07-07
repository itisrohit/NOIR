import React from "react";
import { motion } from "framer-motion";

// Organic, looping paths for two glows
const mainGlowPath = {
  x: ["-28vw", "18vw", "22vw", "-20vw", "-28vw"],
  y: ["-18vh", "-8vh", "28vh", "22vh", "-18vh"],
  scale: [1.08, 1.13, 0.97, 1.12, 1.08],
  rotate: [0, 8, -6, 4, 0],
  filter: [
    "blur(48px) brightness(1.2) saturate(1.3)",
    "blur(60px) brightness(1.3) saturate(1.5)",
    "blur(52px) brightness(1.18) saturate(1.2)",
    "blur(56px) brightness(1.25) saturate(1.4)",
    "blur(48px) brightness(1.2) saturate(1.3)"
  ],
};
const secondaryGlowPath = {
  x: ["20vw", "-15vw", "-22vw", "18vw", "20vw"],
  y: ["30vh", "-10vh", "18vh", "32vh", "30vh"],
  scale: [0.7, 0.8, 0.65, 0.75, 0.7],
  rotate: [0, -6, 8, -4, 0],
  filter: [
    "blur(80px) brightness(0.7) saturate(1.1)",
    "blur(100px) brightness(0.8) saturate(1.2)",
    "blur(90px) brightness(0.65) saturate(1.0)",
    "blur(110px) brightness(0.75) saturate(1.15)",
    "blur(80px) brightness(0.7) saturate(1.1)"
  ],
};

export default function WorkInProgress() {
  return (
    <div className="noir-coming-soon-bg">
      {/* Main Animated Glow */}
      <motion.div
        className="noir-purple-light noir-main-glow"
        initial={{ x: "-28vw", y: "-18vh", scale: 1.08, rotate: 0, filter: "blur(48px) brightness(1.2) saturate(1.3)" }}
        animate={mainGlowPath}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
        style={{ position: "absolute", left: "50%", top: "50%", translate: "-50% -55%" }}
      />
      {/* Secondary Animated Glow */}
      <motion.div
        className="noir-purple-light noir-secondary-glow"
        initial={{ x: "20vw", y: "30vh", scale: 0.7, rotate: 0, filter: "blur(80px) brightness(0.7) saturate(1.1)" }}
        animate={secondaryGlowPath}
        transition={{ duration: 32, ease: "easeInOut", repeat: Infinity }}
        style={{ position: "absolute", left: "50%", top: "50%", translate: "-50% -55%", opacity: 0.45 }}
      />
      {/* Animated Glass/Caustic Highlight */}
      <motion.div
        className="noir-glass-highlight"
        initial={{ rotate: 0, opacity: 0.18 }}
        animate={{ rotate: [0, 8, -6, 4, 0], opacity: [0.18, 0.22, 0.15, 0.2, 0.18] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Grain overlay */}
      <div className="noir-grain-overlay" />
      {/* Cinematic Animated Text */}
      <div className="noir-coming-soon-text">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(16px)", letterSpacing: "0.2em" }}
          animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0.5em" }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="noir-cinematic-text"
        >
          <span className="noir-shimmer-text">COMING&nbsp;&nbsp;SOON</span>
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 0.7, filter: "blur(0px)" }}
          transition={{ duration: 2.8, ease: "easeOut", delay: 0.7 }}
        >
          NOIR
        </motion.span>
      </div>
      {/* Animated gradients */}
      <div className="noir-ambient-gradient noir-ambient-gradient-1" />
      <div className="noir-ambient-gradient noir-ambient-gradient-2" />
    </div>
  );
}
