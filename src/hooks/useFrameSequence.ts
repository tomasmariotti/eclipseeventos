import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 40;
const FRAME_PATH = (i: number) => `/frames/frame-${String(i).padStart(3, "0")}.jpg`;

/**
 * Apple-style scroll-driven frame-by-frame canvas animation.
 * Optimized for mobile: caps DPR at 1.5 on mobile, uses low-power rendering.
 */
export default function useFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
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
          renderFrame(0);
        }
      };
      images[i] = img;
    }
  }, []);

  // Setup canvas size — call once and on resize
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    // Cap DPR: 1.5 on mobile, 2 on desktop for crispness without GPU strain
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    // Use dvh-aware height on mobile
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;
    }

    sizeRef.current = { w, h, dpr };
  }, []);

  // Render a specific frame to canvas with cover-fit
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    let ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;

    // Setup canvas if not done yet or size changed
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (!ctx || sizeRef.current.w !== w || sizeRef.current.h !== h) {
      setupCanvas();
      ctx = ctxRef.current;
    }
    if (!ctx) return;

    const { w: cw, h: ch } = sizeRef.current;

    // Object-fit: cover calculation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [setupCanvas]);

  // Handle resize
  useEffect(() => {
    const onResize = () => {
      setupCanvas();
      if (loaded) renderFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, renderFrame, setupCanvas]);

  // Handle orientation change on mobile
  useEffect(() => {
    const onOrientationChange = () => {
      // Small delay to let the browser settle
      setTimeout(() => {
        setupCanvas();
        if (loaded) renderFrame(currentFrameRef.current);
      }, 150);
    };
    window.addEventListener("orientationchange", onOrientationChange);
    return () => window.removeEventListener("orientationchange", onOrientationChange);
  }, [loaded, renderFrame, setupCanvas]);

  // Scroll-driven frame update
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;

    const targetFrame = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    }
  });

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
