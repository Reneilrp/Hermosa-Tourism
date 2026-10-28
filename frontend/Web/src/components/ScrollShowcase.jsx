import React, { useRef } from 'react';
import { ArrowRight, ArrowDown, MapPin, CheckCircle2 } from 'lucide-react';

/**
 * ScrollShowcase
 * One place per screen. Scroll down and the next place slides up and covers
 * the current one (CSS sticky stacking, no scroll-hijacking, no autoplay,
 * no tabs to click).
 *
 * Props
 *  - landmarks: same array as your `showcaseLandmarks`
 *  - onViewRegistry(category): called by the "See all ..." button
 */

// Height of the sticky navbar (h-16 + 4px ribbon is ~68px; sm:h-18 is ~76px).
const HEADER_OFFSET = '4.75rem';

// Two alternating panel looks, so each place visibly "covers" the last one.
const THEMES = [
  {
    panel: 'bg-[#FFF0F8] dark:bg-[#1E162A] text-[#433458] dark:text-white',
    accent: 'text-[#BF1F46] dark:text-[#FECB00]',
    body: 'text-[#433458]/80 dark:text-slate-300',
    rule: 'border-[#433458]/15 dark:border-white/15',
    label: 'text-[#433458]/60 dark:text-slate-400',
    cta: 'bg-[#BF1F46] hover:bg-[#8E1632] text-white',
    barOn: 'bg-[#BF1F46] dark:bg-[#FECB00]',
    barOff: 'bg-[#433458]/20 dark:bg-white/20',
  },
  {
    panel: 'bg-[#433458] text-white',
    accent: 'text-[#FECB00]',
    body: 'text-slate-200',
    rule: 'border-white/20',
    label: 'text-slate-300',
    cta: 'bg-[#FECB00] hover:bg-[#E5B600] text-[#433458]',
    barOn: 'bg-[#FECB00]',
    barOff: 'bg-white/25',
  },
];

export default function ScrollShowcase({ landmarks = [], onViewRegistry }) {
  const stackRef = useRef(null);

  // Jump to place #i (used by the progress bars).
  const goTo = (i) => {
    const el = stackRef.current;
    if (!el) return;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const hdr = rem * 4.75;
    const panelH = window.innerHeight - hdr;
    const top = el.getBoundingClientRect().top + window.scrollY + i * panelH - hdr;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  if (!landmarks.length) return null;

  return (
    <section id="showcase" aria-label="Featured places">
      {/* Short intro. This is the only thing above the stack. */}
      <div className="bg-white dark:bg-[#1E162A] border-t border-[#FFDEF6] dark:border-[#433458]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#433458] dark:text-white max-w-3xl">
            Five places to start with
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#433458]/75 dark:text-slate-300 max-w-xl leading-relaxed">
            Mosques, a coral fort, a halal kitchen and a pink-sand island. Scroll down to move to the next place.
          </p>
        </div>
      </div>

      {/* The stack: every panel is sticky at the same offset, so the next one slides over the previous one. */}
      <div ref={stackRef} className="relative isolate">
        {landmarks.map((place, idx) => {
          const t = THEMES[idx % 2];
          const flipped = idx % 2 === 1;
          const total = landmarks.length;
          const next = landmarks[idx + 1];
          const shortName = place.name.split('(')[0].trim();
          const coords = place.stats.find((s) => s.label === 'Coordinates');
          const facts = place.stats.filter((s) => s.label !== 'Coordinates').slice(0, 3);
          const ctaLabel =
            place.category === 'worship'
              ? 'See all mosques'
              : place.category === 'dining'
              ? 'See all halal food'
              : 'See all places';

          return (
            <article
              key={place.id}
              className={`sticky overflow-hidden ${t.panel}`}
              style={{ top: HEADER_OFFSET, height: `calc(100svh - ${HEADER_OFFSET})` }}
              aria-label={`${idx + 1} of ${total}: ${shortName}`}
            >
              <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 grid grid-rows-[minmax(0,42%)_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-12 gap-4 lg:gap-14">
                {/* PHOTO */}
                <div
                  className={`relative min-h-0 overflow-hidden rounded-3xl bg-slate-900 lg:col-span-7 order-1 ${
                    flipped ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-[#433458] px-3 py-1 text-xs font-bold shadow">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6E4F]" />
                    {place.badge.replace('★ ', '')}
                  </span>

                  {coords && (
                    <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[11px] font-medium text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#FECB00]" />
                      {coords.value}
                    </span>
                  )}
                </div>

                {/* TEXT */}
                <div
                  className={`min-h-0 overflow-hidden flex flex-col justify-center lg:col-span-5 order-2 ${
                    flipped ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Progress: one bar per place, clickable */}
                  <div className="flex items-center gap-3 mb-3 sm:mb-5">
                    <div className="flex items-center gap-1.5" role="group" aria-label="Jump to place">
                      {landmarks.map((p, i) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => goTo(i)}
                          aria-label={`Go to ${p.name.split('(')[0].trim()}`}
                          aria-current={i === idx ? 'true' : undefined}
                          className="py-2 cursor-pointer"
                        >
                          <span
                            className={`block h-1 rounded-full transition-all ${
                              i === idx ? `w-10 ${t.barOn}` : `w-5 ${i < idx ? t.barOn + ' opacity-50' : t.barOff}`
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${t.label}`}>
                      {idx + 1} of {total}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm font-semibold ${t.accent}`}>{place.tag}</p>

                  <h3 className="mt-1.5 font-serif font-bold leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                    {shortName}
                  </h3>
                  <p className={`mt-2 text-sm sm:text-base font-medium ${t.accent}`}>{place.subtitle}</p>

                  <p className={`mt-3 sm:mt-4 text-sm lg:text-base leading-relaxed max-w-[52ch] line-clamp-4 lg:line-clamp-6 ${t.body}`}>
                    {place.description}
                  </p>

                  <dl className={`mt-4 sm:mt-6 hidden sm:grid grid-cols-3 gap-4 border-t pt-4 ${t.rule}`}>
                    {facts.map((f) => (
                      <div key={f.label} className="min-w-0">
                        <dt className={`text-[11px] font-medium ${t.label}`}>{f.label}</dt>
                        <dd className="mt-0.5 text-sm font-semibold leading-snug">{f.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <button
                      type="button"
                      onClick={() => onViewRegistry && onViewRegistry(place.category)}
                      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors cursor-pointer ${t.cta}`}
                    >
                      {ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {next && (
                      <button
                        type="button"
                        onClick={() => goTo(idx + 1)}
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer hover:underline ${t.label}`}
                      >
                        Next: {next.name.split('(')[0].trim()}
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
