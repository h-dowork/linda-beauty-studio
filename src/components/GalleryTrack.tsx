"use client";

import { useRef, useEffect } from "react";

const images = [
  "/gallery/624851261_122207072684339961_3154784856979528981_n.jpg",
  "/gallery/637151159_122209104800339961_7037923131650482814_n.jpg",
  "/gallery/661399700_122213043008339961_5409018310455770294_n.jpg",
  "/gallery/663284222_122214199244339961_5649872447762745557_n.jpg",
  "/gallery/688875261_122216927558339961_4875173414182758606_n.jpg",
  "/gallery/690676760_122217363836339961_7727855726894533995_n.jpg",
];

// Mirrors the CSS: width: clamp(240px, 70vw, 380px), gap: 4vmin
function computeTrackWidth() {
  const vw = window.innerWidth;
  const vmin = Math.min(vw, window.innerHeight);
  const imageW = Math.min(Math.max(240, 0.7 * vw), 380);
  const gapW = 0.04 * vmin;
  return images.length * imageW + (images.length - 1) * gapW;
}

// The minimum % at which the last image's right edge meets the container's right edge.
// translate(X%) is relative to the track's own width, and the track starts at left: 50%.
// Solving: containerW/2 + (X/100)*trackW + trackW = containerW → X = (containerW/2 - trackW)/trackW * 100
function computeMinPct(containerW: number) {
  const trackW = computeTrackWidth();
  return ((containerW / 2 - trackW) / trackW) * 100;
}

export default function GalleryTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const drag = useRef({
    active: false,
    startX: 0,
    startPct: 0,
    curPct: 0,
    vx: 0,      // %/ms, same scale as drag delta
    prevX: 0,
    prevT: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const applyPct = (pct: number) => {
      const minPct = computeMinPct(container.clientWidth);
      const clamped = Math.max(Math.min(pct, 0), minPct);
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

      // maxDelta: pixels of drag = 100% translate. 2× screen width feels natural (≈2.5x amplification).
      const maxDelta = window.innerWidth * 2;

      if (dt > 0 && dt < 150) {
        const rawVx = ((drag.current.prevX - clientX) / dt / maxDelta) * -100;
        drag.current.vx = drag.current.vx * 0.6 + rawVx * 0.4; // EMA smoothing
      } else if (dt >= 150) {
        drag.current.vx = 0; // paused — no momentum
      }

      drag.current.prevX = clientX;
      drag.current.prevT = now;

      const deltaPct = ((drag.current.startX - clientX) / maxDelta) * -100;
      applyPct(drag.current.startPct + deltaPct);
    };

    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;

      let velocity = drag.current.vx; // no extra boost — raw velocity is the momentum
      let lastT = Date.now();

      const animate = () => {
        const now = Date.now();
        const dt = Math.min(now - lastT, 64); // cap dt to avoid huge jumps after tab switch
        lastT = now;

        applyPct(drag.current.curPct + velocity * dt);
        velocity *= Math.pow(0.82, dt / 16); // friction — coast fades in ~80ms

        if (Math.abs(velocity) > 0.003) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          rafRef.current = null;
        }
      };

      if (Math.abs(velocity) > 0.003) {
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
