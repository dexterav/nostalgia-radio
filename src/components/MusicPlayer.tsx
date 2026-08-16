import { useCallback, useEffect, useRef, useState } from "react";
import { songs } from "@/data/songs";
import { isTypingTarget } from "@/lib/keyboard";

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${String(s).padStart(2, "0")}`;
}

function Vinyl({ spinning }: { spinning: boolean }) {
  return (
    <div
      className={`relative size-12 shrink-0 rounded-full bg-vinyl shadow-deep ring-1 ring-ember/30 sm:size-16 ${
        spinning ? "animate-vinyl" : ""
      }`}
    >
      <div className="absolute inset-1.5 rounded-full border border-foreground/10 sm:inset-2" />
      <div className="absolute inset-2.5 rounded-full border border-foreground/10 sm:inset-4" />
      <div className="absolute inset-0 m-auto size-4 rounded-full bg-ember shadow-glow sm:size-5" />
      <div className="absolute inset-0 m-auto size-1 rounded-full bg-background sm:size-1.5" />
    </div>
  );
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // When set, the next automatic play attempt (triggered by a track change) is
  // skipped so the keyboard arrows can switch songs while staying paused.
  const suppressAutoplayRef = useRef(false);

  const track = songs[index]!;

  const go = useCallback(
    (step: number, shouldPlay = playing) => {
      setIndex((current) => (current + step + songs.length) % songs.length);

      setCurrentTime(0);
      setDuration(0);
      setUnavailable(false);

      if (!shouldPlay) {
        setPlaying(false);
      }
    },
    [playing],
  );

  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setPlaying(true);
      setBlocked(false);
    } catch {
      setPlaying(false);
      setBlocked(true);
    }
  }, []);

  // Autoplay on load, with interaction fallback.
  useEffect(() => {
    if (suppressAutoplayRef.current) {
      suppressAutoplayRef.current = false;
      return;
    }

    void attemptPlay();
  }, [attemptPlay, index]);

  useEffect(() => {
    if (!blocked) return;

    const resume = () => void attemptPlay();

    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [blocked, attemptPlay]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void attemptPlay();
    }
  }, [attemptPlay, playing]);

  // Skip to the previous/next song while keeping the current playing state.
  const keyboardGo = useCallback(
    (step: number) => {
      suppressAutoplayRef.current = !playing;
      go(step, playing);
    },
    [go, playing],
  );

  // Keyboard shortcuts: Space toggles play/pause, ←/→ skip songs.
  // Ignored while typing in inputs or when combined with modifier keys.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.isComposing) {
        return;
      }

      if (isTypingTarget(event.target)) return;

      switch (event.key) {
        case " ":
          // Stop the browser from scrolling and from activating a focused button.
          event.preventDefault();
          toggle();
          break;
        case "ArrowRight":
          event.preventDefault();
          keyboardGo(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          keyboardGo(-1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardGo, toggle]);

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const value = Number(event.target.value);
    const newTime = (value / 100) * audio.duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const status = unavailable
    ? "Track file missing — add it to /public/music"
    : blocked
      ? "Tap anywhere to start the music"
      : track.artist;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;

          if (Number.isFinite(el.duration)) {
            setDuration(el.duration);
            setCurrentTime(el.currentTime);
          }
        }}
        onDurationChange={(e) => {
          const el = e.currentTarget;

          if (Number.isFinite(el.duration)) {
            setDuration(el.duration);
          }
        }}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;

          if (Number.isFinite(el.currentTime)) {
            setCurrentTime(el.currentTime);
          }

          if (Number.isFinite(el.duration) && el.duration > 0) {
            setDuration(el.duration);
          }
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          go(1, true);
        }}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />

      <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
        <p className="text-vintage-shadow pointer-events-none mx-auto mb-3 max-w-md text-center text-sm leading-relaxed text-cream sm:mb-4 sm:text-base">
          पुराने गाने, धीमी शाम और एक कोने की दुकान — बस बैठिए और सुनिए।
        </p>

        <div className="mx-auto flex max-w-3xl flex-col gap-2.5 rounded-3xl border border-glass-border bg-glass px-3 py-3 shadow-deep backdrop-blur-xl sm:flex-row sm:items-center sm:gap-5 sm:rounded-full sm:py-3 sm:pr-6 sm:pl-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <Vinyl spinning={playing} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium tracking-wide text-foreground sm:text-base">
                {track.title}
              </p>

              <p className="truncate text-xs text-muted-foreground">{status}</p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 sm:gap-3">
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {formatDuration(currentTime)}
            </span>

            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={seek}
              aria-label="Seek"
              className="progress-range h-1 w-full cursor-pointer appearance-none rounded-full"
              style={{ backgroundSize: `${progress}% 100%` }}
            />

            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {formatDuration(duration)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous song"
              className="player-btn"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="player-btn player-btn-primary"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <path d="M7 4l13 8-13 8z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next song"
              className="player-btn"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                <path d="M16 5h2v14h-2zM4 5l11 7-11 7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hints — purely visual, not interactive. */}
        <ul className="pointer-events-none mx-auto mt-2.5 hidden max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-1.5 sm:mt-3 sm:flex">
          <li className="flex items-center gap-2">
            <kbd className="flex h-5 items-center justify-center rounded-md border border-glass-border bg-glass px-2 font-mono text-[10px] leading-none text-ember">
              Space
            </kbd>
            <span className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Play / Pause
            </span>
          </li>

          <li className="flex items-center gap-2">
            <kbd className="flex h-5 w-6 items-center justify-center rounded-md border border-glass-border bg-glass font-mono text-[10px] leading-none text-ember">
              ←
            </kbd>
            <span className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Previous
            </span>
          </li>

          <li className="flex items-center gap-2">
            <kbd className="flex h-5 w-6 items-center justify-center rounded-md border border-glass-border bg-glass font-mono text-[10px] leading-none text-ember">
              →
            </kbd>
            <span className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Next
            </span>
          </li>

          <li className="flex items-center gap-2">
            <kbd className="flex h-5 w-6 items-center justify-center rounded-md border border-glass-border bg-glass font-mono text-[10px] leading-none text-ember">
              P
            </kbd>
            <span className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Paan Rain
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
