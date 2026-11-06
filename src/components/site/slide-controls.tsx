"use client";

type Slide = { kicker: string; line: string };

export function SlideControls({
  slides,
  index,
  paused,
  userPaused,
  onGo,
  onPrev,
  onNext,
  onTogglePause,
  tone = "dark",
  durationMs = 7000,
}: {
  slides: readonly Slide[];
  index: number;
  paused: boolean;
  userPaused: boolean;
  onGo: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  tone?: "dark" | "light";
  durationMs?: number;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-wrap gap-3" role="group" aria-label="Slides">
        {slides.map((slide, slideIndex) => {
          const current = slideIndex === index;
          return (
            <button
              key={slide.kicker}
              type="button"
              className={`hero-tab ${tone === "light" ? "hero-tab-light" : ""}`}
              aria-current={current ? "true" : undefined}
              aria-label={`${slide.kicker}. ${slide.line}`}
              onClick={() => onGo(slideIndex)}
            >
              <span
                className="hero-tab-bar"
                data-run={current && !paused ? "1" : undefined}
                style={current && !paused ? { animationDuration: `${durationMs}ms` } : undefined}
              />
              <span className="mt-2 block text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
                {String(slideIndex + 1).padStart(2, "0")} {slide.kicker}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <button type="button" className={`hero-control ${tone === "light" ? "hero-control-light" : ""}`} onClick={onPrev}>
          Anterior
        </button>
        <button
          type="button"
          className={`hero-control ${tone === "light" ? "hero-control-light" : ""}`}
          aria-pressed={userPaused}
          onClick={onTogglePause}
        >
          {userPaused ? "Retomar" : "Pausar"}
        </button>
        <button type="button" className={`hero-control ${tone === "light" ? "hero-control-light" : ""}`} onClick={onNext}>
          Seguinte
        </button>
      </div>
    </div>
  );
}
