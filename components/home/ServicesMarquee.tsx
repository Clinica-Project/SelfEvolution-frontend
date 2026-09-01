import { marqueeTerms } from "@/lib/content/home";

export function ServicesMarquee() {
  const track = [...marqueeTerms, ...marqueeTerms];

  return (
    <div className="relative py-3">
      <p className="sr-only">{marqueeTerms.join(", ")}</p>
      <div className="group mask-fade-x relative flex select-none overflow-hidden">
        <ul
          className="flex min-w-max animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          aria-hidden="true"
        >
          {track.map((term, index) => (
            <li
              key={`${term}-${index}`}
              className="flex items-center gap-10 font-display text-xs font-medium uppercase tracking-[0.22em] text-brand-primary/30"
            >
              {term}
              <span className="h-1 w-1 rounded-full bg-brand-accent-yellow/70" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
