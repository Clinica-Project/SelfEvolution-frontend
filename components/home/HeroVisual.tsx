export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-[26rem]">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        fill="none"
        className="absolute inset-0 h-full w-full text-brand-primary/20"
      >
        <circle cx="200" cy="200" r="188" stroke="currentColor" strokeWidth="0.8" />
        <circle
          cx="200"
          cy="200"
          r="132"
          stroke="currentColor"
          strokeDasharray="2 10"
          className="origin-center animate-[spin_80s_linear_infinite] motion-reduce:animate-none"
        />
        <circle cx="200" cy="12" r="3" fill="currentColor" className="text-brand-primary" />
      </svg>

      <div className="absolute inset-[22%] overflow-hidden rounded-full border border-brand-primary/15 bg-surface-card/50">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[18%] h-[58%] w-[58%] -translate-x-1/2 rounded-full bg-brand-primary/25"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-[12%] left-[8%] h-[46%] w-[46%] rounded-full bg-brand-primary/12"
        />
      </div>

      <p className="absolute inset-x-0 bottom-[18%] text-center text-[10px] font-medium uppercase tracking-[0.22em] text-brand-primary">
        cuidado integrado
      </p>
    </div>
  );
}
