import { marqueeTerms } from "@/lib/content/home";

export function ServicesMarquee() {
  const track = [...marqueeTerms, ...marqueeTerms];

  return (
    <div className="relative border-y border-brand-primary/10 bg-white/40 py-5">
      <p className="sr-only">{marqueeTerms.join(", ")}</p>
      <div className="group mask-fade-x relative flex select-none overflow-hidden">
        <ul
          className="flex min-w-max animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          aria-hidden="true"
        >
          {track.map((term, index) => (
            <li
              key={`${term}-${index}`}
              className="flex items-center gap-12 font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary/45"
            >
              {term}
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-yellow" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
