import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 40;
const FRAME_PATH = (i: number) => `/frames/frame-${String(i).padStart(3, "0")}.jpg`;

/**
 * Apple-style scroll-driven frame-by-frame canvas animation.
 * Preloads all frames, then paints the correct frame on a <canvas>
 * based on scroll position — producing ultra-smooth cinematic playback.
 */
export default function useFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
          // Draw first frame
          renderFrame(0);
        }
      };
      images[i] = img;
    }
  }, []);

  // Render a specific frame to canvas with cover-fit
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    // Set canvas to viewport size for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    }

    // Object-fit: cover calculation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Handle resize
  useEffect(() => {
    const onResize = () => {
      if (loaded) renderFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, renderFrame]);

  // Scroll-driven frame update with smooth interpolation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;

    const targetFrame = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;

      // Use rAF for smooth GPU-accelerated rendering
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    }
  });

  // Derived motion values for cinematic parallax layers
  const frameProgress = scrollYProgress;

  return {
    canvasRef,
    containerRef,
    loaded,
    progress,
    frameProgress,
    scrollYProgress,
  };
}

export { FRAME_COUNT, FRAME_PATH };
