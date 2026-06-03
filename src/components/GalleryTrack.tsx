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

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const handleDown = (clientX: number) => {
      track.dataset.mouseDownAt = String(clientX);
    };

    const handleUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage ?? "0";
    };

    const handleMove = (clientX: number) => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt!) - clientX;
      const maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -100;
      const nextUnconstrained = parseFloat(track.dataset.prevPercentage ?? "0") + percentage;
      const next = Math.max(Math.min(nextUnconstrained, 0), -100);

      track.dataset.percentage = String(next);

      track.animate(
        { transform: `translate(${next}%, -50%)` },
        { duration: 1200, fill: "forwards" }
      );

      for (const img of track.getElementsByClassName("gi")) {
        (img as HTMLElement).animate(
          { objectPosition: `${100 + next}% center` },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    const onDown = (e: MouseEvent) => handleDown(e.clientX);
    const onTouchStart = (e: TouchEvent) => handleDown(e.touches[0].clientX);
    const onUp = () => handleUp();
    const onTouchEnd = () => handleUp();
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    container.addEventListener("mousedown", onDown);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div
        ref={trackRef}
        data-mouse-down-at="0"
        data-prev-percentage="0"
        data-percentage="0"
        className="select-none"
        style={{
          display: "flex",
          gap: "4vmin",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(0%, -50%)",
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
              width: "40vmin",
              height: "56vmin",
              objectFit: "cover",
              objectPosition: "100% center",
              pointerEvents: "none",
              borderRadius: "16px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
