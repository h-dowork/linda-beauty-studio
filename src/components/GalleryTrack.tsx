"use client";

import { useRef, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80",
  "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2134&q=80",
  "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1759&q=80",
  "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
];

export default function GalleryTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const drag = useRef({
    active: false,
    startX: 0,
    startPct: 0,
    curPct: 0,
    vx: 0,
    prevX: 0,
    prevT: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const applyPct = (pct: number) => {
      const clamped = Math.max(Math.min(pct, 0), -100);
      drag.current.curPct = clamped;
      track.style.transform = `translate(${clamped}%, -50%)`;
      for (const img of track.getElementsByClassName("gi")) {
        (img as HTMLElement).style.objectPosition = `${100 + clamped}% center`;
      }
    };

    const cancelMomentum = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onDown = (clientX: number) => {
      cancelMomentum();
      drag.current = {
        active: true,
        startX: clientX,
        startPct: drag.current.curPct,
        curPct: drag.current.curPct,
        vx: 0,
        prevX: clientX,
        prevT: Date.now(),
      };
    };

    const onMove = (clientX: number) => {
      if (!drag.current.active) return;

      const now = Date.now();
      const dt = now - drag.current.prevT;

      if (dt > 0 && dt < 150) {
        const maxDelta = window.innerWidth / 2;
        const rawVx = ((drag.current.prevX - clientX) / dt / maxDelta) * -100;
        drag.current.vx = drag.current.vx * 0.6 + rawVx * 0.4;
      } else if (dt >= 150) {
        drag.current.vx = 0;
      }

      drag.current.prevX = clientX;
      drag.current.prevT = now;

      const maxDelta = window.innerWidth / 2;
      const deltaPct = ((drag.current.startX - clientX) / maxDelta) * -100;
      applyPct(drag.current.startPct + deltaPct);
    };

    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;

      let velocity = drag.current.vx * 35;
      let lastT = Date.now();

      const animate = () => {
        const now = Date.now();
        const dt = now - lastT;
        lastT = now;

        const next = drag.current.curPct + velocity * dt;
        const clamped = Math.max(Math.min(next, 0), -100);
        applyPct(clamped);

        // Stop at boundaries
        if (clamped !== next) {
          velocity = 0;
        }

        // Friction
        velocity *= Math.pow(0.90, dt / 16);

        if (Math.abs(velocity) > 0.005) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          rafRef.current = null;
        }
      };

      if (Math.abs(velocity) > 0.005) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const mouseDown = (e: MouseEvent) => onDown(e.clientX);
    const mouseMove = (e: MouseEvent) => onMove(e.clientX);
    const touchStart = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const touchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);

    container.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", onUp);
    container.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      cancelMomentum();
      container.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div
        ref={trackRef}
        className="select-none"
        style={{
          display: "flex",
          gap: "4vmin",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(0%, -50%)",
          willChange: "transform",
        }}
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            className="gi"
            src={src}
            alt=""
            draggable={false}
            style={{
              width: "clamp(240px, 70vw, 380px)",
              height: "clamp(336px, 98vw, 530px)",
              objectFit: "cover",
              objectPosition: "100% center",
              pointerEvents: "none",
              borderRadius: "16px",
              willChange: "object-position",
            }}
          />
        ))}
      </div>
    </div>
  );
}
