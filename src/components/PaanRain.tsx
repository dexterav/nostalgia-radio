import { useEffect, useRef, useState } from "react";
import { isTypingTarget } from "@/lib/keyboard";

type Leaf = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  opacity: number;
  hue: number;
};

function PaanLeaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <path
        d="M50 6c18 14 34 30 34 50 0 19-15 32-34 38C31 88 16 75 16 56 16 36 32 20 50 6Z"
        fill="currentColor"
      />
      <path
        d="M50 12v78M50 40c-9-6-17-9-26-11M50 40c9-6 17-9 26-11M50 62c-8-5-15-8-23-10M50 62c8-5 15-8 23-10"
        stroke="oklch(0.82 0.09 95 / 45%)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function makeLeaves(count: number): Leaf[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 96,
    size: 14 + Math.random() * 22,
    delay: Math.random() * 0.9,
    duration: 2 + Math.random() * 1.4,
    drift: (Math.random() - 0.5) * 120,
    spin: (Math.random() - 0.5) * 720,
    opacity: 0.4 + Math.random() * 0.45,
    hue: Math.random(),
  }));
}

export function PaanRain() {
  const [leaves, setLeaves] = useState<Leaf[] | null>(null);
  const [burst, setBurst] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const rain = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (timer.current) window.clearTimeout(timer.current);
    setLeaves(null);
    const next = makeLeaves(reduced ? 8 : 25 + Math.floor(Math.random() * 15));
    window.requestAnimationFrame(() => {
      setBurst((b) => b + 1);
      setLeaves(next);
    });
    timer.current = window.setTimeout(
      () => {
        setLeaves(null);
        timer.current = null;
      },
      reduced ? 1400 : 3600,
    );
  };

  // Keep the latest `rain` callback in a ref so the listener below can stay
  // registered once while always running the same leaf-rain animation.
  const rainRef = useRef(rain);
  useEffect(() => {
    rainRef.current = rain;
  });

  // Pressing "P" triggers the exact same leaf-rain burst as the leaf button.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.isComposing) {
        return;
      }

      if (isTypingTarget(event.target)) return;

      if (event.key === "p" || event.key === "P") {
        rainRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={rain}
        aria-label="Make it rain paan"
        className="fixed top-[calc(2.25rem+118px)] left-9 z-30 flex size-10 items-center justify-center rounded-full border border-white bg-glass text-[oklch(0.62_0.09_150)] shadow-low backdrop-blur-lo transition-all duration-300 hover:scale-110 hover:border-ember/70 hover:text-[oklch(0.72_0.11_150)] hover:shadow-glow sm:top-[calc(2.5rem+118px)] sm:left-14 sm:size-11 animate-[paanFloat_3s_ease-in-out_infinite]"
      >
        <PaanLeaf className="size-5 drop-shadow-glow sm:size-6 animate-[wiggle_2.5s_ease-in-out_infinite]" />
      </button>

      {leaves && (
        <div
          key={burst}
          className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
          aria-hidden
        >
          {leaves.map((leaf) => (
            <span
              key={leaf.id}
              className="paan-fall absolute -top-16 block"
              style={
                {
                  left: `${leaf.left}%`,
                  width: leaf.size,
                  height: leaf.size,
                  opacity: leaf.opacity,
                  animationDelay: `${leaf.delay}s`,
                  animationDuration: `${leaf.duration}s`,
                  "--paan-drift": `${leaf.drift}px`,
                  "--paan-spin": `${leaf.spin}deg`,
                } as React.CSSProperties
              }
            >
              <PaanLeaf
                className="size-full"
                style={{
                  color:
                    leaf.hue > 0.75
                      ? "oklch(0.55 0.11 128)"
                      : leaf.hue > 0.4
                        ? "oklch(0.44 0.09 145)"
                        : "oklch(0.36 0.07 150)",
                  filter: "drop-shadow(0 4px 10px oklch(0.05 0.02 30 / 70%))",
                }}
              />
            </span>
          ))}
        </div>
      )}
    </>
  );
}
