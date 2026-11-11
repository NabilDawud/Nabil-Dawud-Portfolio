"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  life: number;
  decay: number;
  color: string;
}

const CHAMPAGNE_COLOR = "#F0CD5F";
const CYBER_TEAL_COLOR = "#58D7CD";
const MAX_PARTICLES = 90;

export function CustomCursor() {
  const isInteractive = useInteractiveMotion();
  const [mounted, setMounted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInteractive) return;

    const docEl = document.documentElement;
    docEl.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const lens = lensRef.current;
    if (!canvas || !dot || !lens) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    let mouseX = -100;
    let mouseY = -100;
    let circleX = -100;
    let circleY = -100;
    let lastX = 0;
    let lastY = 0;
    let isVisible = false;
    let isHovering = false;
    let animFrameId: number;

    const particles: Particle[] = [];

    const spawnParticle = (x: number, y: number, isBurst = false) => {
      if (particles.length >= MAX_PARTICLES) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4.5 + 1.5 : Math.random() * 1.8 + 0.4;
      const size = isBurst ? Math.random() * 3.2 + 1.4 : Math.random() * 2.2 + 1.0;

      particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - (isBurst ? 0 : 0.35),
        size,
        life: 1,
        decay: isBurst ? Math.random() * 0.04 + 0.02 : Math.random() * 0.03 + 0.018,
        color: Math.random() > 0.4 ? CHAMPAGNE_COLOR : CYBER_TEAL_COLOR,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        docEl.classList.add("custom-cursor-active");
      }

      const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
      lastX = mouseX;
      lastY = mouseY;

      // Spawn fine micro-particles during motion
      if (dist > 5) {
        const count = Math.min(2, Math.floor(dist / 8) + 1);
        for (let i = 0; i < count; i++) {
          spawnParticle(mouseX, mouseY, false);
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const burstCount = 18;
      for (let i = 0; i < burstCount; i++) {
        spawnParticle(e.clientX, e.clientY, true);
      }
    };

    const onMouseEnter = () => {
      isVisible = true;
      docEl.classList.add("custom-cursor-active");
    };

    const onMouseLeave = () => {
      isVisible = false;
      docEl.classList.remove("custom-cursor-active");
    };

    // Delegated hover detection for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], .spotlight-card, [data-magnetic]'
      );
      isHovering = Boolean(interactiveEl);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // 60fps render loop
    const render = () => {
      // Lerp outer lens circle
      circleX += (mouseX - circleX) * 0.22;
      circleY += (mouseY - circleY) * 0.22;

      const targetOpacity = isVisible ? "1" : "0";
      dot.style.opacity = targetOpacity;
      lens.style.opacity = targetOpacity;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      lens.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;

      if (isHovering) {
        lens.style.width = "72px";
        lens.style.height = "72px";
      } else {
        lens.style.width = "40px";
        lens.style.height = "40px";
      }

      // Draw and update particle canvas
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;
        if (p.size > 0.3) p.size -= 0.025;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      docEl.classList.remove("custom-cursor-active");
    };
  }, [mounted, isInteractive]);

  // Clean unmount or SSR return
  if (!mounted || !isInteractive) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997]"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-teal opacity-0 shadow-[0_0_8px_var(--color-teal)] transition-opacity duration-150"
      />
      <div
        ref={lensRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 rounded-full border border-champagne/60 bg-white/95 opacity-0 mix-blend-difference transition-[width,height,opacity] duration-200 ease-out"
      />
    </>
  );
}
