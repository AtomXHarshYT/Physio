"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function TiltCard({ children, className = "" }) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Motion values for smooth tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for butter-smooth movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Float animation values
  const floatY = useSpring(0, { damping: 20, stiffness: 200, mass: 0.3 });
  const floatRotate = useSpring(0, { damping: 20, stiffness: 200, mass: 0.3 });

  // Glow effect position
  const glowX = useSpring(0, { damping: 30, stiffness: 400, mass: 0.2 });
  const glowY = useSpring(0, { damping: 30, stiffness: 400, mass: 0.2 });

  useEffect(() => {
    let animationFrame;

    if (isHovering) {
      // Continuous floating animation
      let startTime = Date.now();
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const floatAmt = Math.sin(elapsed * 1.5) * 3;
        const rotateAmt = Math.sin(elapsed * 1.2) * 1.5;
        
        floatY.set(floatAmt);
        floatRotate.set(rotateAmt);
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
    } else {
      floatY.set(0);
      floatRotate.set(0);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isHovering, floatY, floatRotate]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized mouse position (-0.5 to 0.5)
    const normX = (e.clientX - centerX) / rect.width;
    const normY = (e.clientY - centerY) / rect.height;
    
    x.set(normX);
    y.set(normY);
    
    // Update glow position
    glowX.set((e.clientX - rect.left) / rect.width);
    glowY.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    x.set(0);
    y.set(0);
    glowX.set(0.5);
    glowY.set(0.5);
    setIsHovering(false);
  }

  function handleEnter() {
    setIsHovering(true);
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={reset}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        y: floatY,
        z: isHovering ? 50 : 0,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      animate={{
        scale: isHovering ? 1.05 : 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.3,
        },
      }}
    >
      {/* 3D Shadow Layer */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2), transparent 70%)",
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          translateZ: -20,
          filter: "blur(20px)",
        }}
        animate={{
          opacity: isHovering ? 0.4 : 0,
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Dynamic Light Reflection */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(
              circle at ${useTransform(glowX, (v) => v * 100)}% ${useTransform(glowY, (v) => v * 100)}%,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.05) 30%,
              transparent 70%
            )
          `,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Border Glow Effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0), rgba(255,255,255,0.2))",
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          translateZ: 1,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Main Content with Inner 3D Effect */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          rotateX: useTransform(y, [-0.5, 0.5], [8, -8]),
          rotateY: useTransform(x, [-0.5, 0.5], [-8, 8]),
          translateZ: isHovering ? 20 : 0,
        }}
      >
        {children}
      </motion.div>

      {/* Particle Sparkles on Hover */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 60],
                y: [0, (Math.random() - 0.5) * 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.6,
                delay: Math.random() * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}