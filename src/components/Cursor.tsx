import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device uses a mouse
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsFinePointer(false);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isFinePointer) return null;

  return (
    <>
      <style>{`
        /* Hide default cursor on desktop to replace it with the custom one */
        @media (pointer: fine) {
          body, a, button {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Core Dot - Instant tracking */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Glowing Aura - Spring tracking */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovering ? 64 : 36,
          height: isHovering ? 64 : 36,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.2)",
          backgroundColor: isHovering ? "rgba(201,169,110,0.08)" : "transparent",
          boxShadow: isHovering ? "0 0 24px rgba(201,169,110,0.2)" : "0 0 0px transparent",
        }}
      >
        {/* Inner ring for hover state */}
        <motion.div 
          className="absolute h-full w-full rounded-full border border-gold/20"
          initial={false}
          animate={{ scale: isHovering ? 0.7 : 1, opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
