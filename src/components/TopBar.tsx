import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function TopBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [online, setOnline] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const seed = 20 + Math.floor(Math.random() * 61);
    setOnline(seed);
    const drift = window.setInterval(() => {
      setOnline((current) => {
        const next = current + (Math.floor(Math.random() * 7) - 3);
        return Math.min(80, Math.max(20, next));
      });
    }, 4000);
    return () => window.clearInterval(drift);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 grid grid-cols-3 items-center gap-4 px-4 py-4 sm:flex sm:justify-between sm:px-8">
      <span className="justify-self-start font-mono text-[10px] tracking-[0.15em] text-white uppercase drop-shadow-glow sm:text-sm sm:tracking-[0.2em]">
        {now ? formatTime(now) : "--:--:--"}
      </span>

      <span className="justify-self-center flex items-center gap-2 rounded-full border border-glass-border bg-glass px-2 py-1.5 font-mono text-[10px] tracking-[0.15em] text-foreground/80 uppercase backdrop-blur-md sm:px-3 sm:tracking-[0.18em] sm:text-xs !text-white">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-ember" />
        </span>
        {online ? `${online} online` : "connecting"}
      </span>

      <a
        href="https://github.com/dexterav"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my GitHub profile"
        className="justify-self-end pointer-events-auto flex items-center gap-2 rounded-full border border-ember/40 bg-glass px-2.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-foreground/85 uppercase shadow-deep backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-ember/70 hover:text-foreground hover:shadow-glow sm:px-3.5 sm:text-xs !text-white"
      >
        <svg viewBox="0 0 16 16" aria-hidden className="size-4 fill-current">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        <span className="hidden sm:inline">GitHub</span>
      </a>
    </header>
  );
}
