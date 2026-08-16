import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PaanRain } from "@/components/PaanRain";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "डीलक्स पानवाला — Old Hindi Songs, All Night" },
      {
        name: "description",
        content:
          "A nostalgic corner paan shop on the internet: warm lamplight, drifting smoke and 50 classic old Hindi songs playing on loop.",
      },
      { property: "og:title", content: "डीलक्स पानवाला — Old Hindi Songs, All Night" },
      {
        property: "og:description",
        content:
          "Warm lamplight, drifting smoke and 50 classic old Hindi songs playing on loop at the internet's paan shop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="scene absolute inset-0" aria-hidden />

      <TopBar />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex -translate-y-8 flex-col items-center sm:translate-y-0">
          <p className="text-vintage-shadow mb-5 font-mono text-[10px] tracking-[0.4em] text-cream uppercase sm:text-xl">
            गली नंबर ७ · खुला है
          </p>
          <h1 className="paan-title text-5xl leading-[1.15] font-bold sm:text-7xl md:text-8xl">
            डीलक्स पानवाला
          </h1>
        </div>

        <div className="mt-6 flex w-full items-center justify-center gap-3 sm:mt-7" aria-hidden>
          <span className="h-px w-16 rounded-full bg-ember/35 sm:w-24" />
          <svg viewBox="0 0 100 100" className="size-4 text-ember/70" aria-hidden>
            <path
              d="M50 6c18 14 34 30 34 50 0 19-15 32-34 38C31 88 16 75 16 56 16 36 32 20 50 6Z"
              fill="currentColor"
            />
            <path
              d="M50 12v78M50 40c-9-6-17-9-26-11M50 40c9-6 17-9 26-11M50 62c-8-5-15-8-23-10M50 62c8-5 15-8 23-10"
              stroke="oklch(0.82 0.09 40 / 40%)"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span className="h-px w-16 rounded-full bg-ember/35 sm:w-24" />
        </div>
      </section>

      <PaanRain />
      <MusicPlayer />
    </main>
  );
}
