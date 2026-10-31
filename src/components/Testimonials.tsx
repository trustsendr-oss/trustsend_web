import { useState } from "react";
import type { CSSProperties } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";

type Testimonial = ReturnType<typeof useContent>["testimonials"][number];
type Direction = "up" | "down";

function TestimonialColumn({
  items,
  direction,
  duration,
}: {
  items: Testimonial[];
  direction: Direction;
  duration: number;
}) {
  const renderCards = () => (
    <ul className="testimonial-card-list">
      {items.map((testimonial) => (
        <li key={testimonial.name}>
          <article className="testimonial-card">
            <Quote className="testimonial-quote-mark" size={23} strokeWidth={2} aria-hidden="true" />
            <blockquote className="testimonial-quote">
              “{testimonial.quote}”
            </blockquote>
            <div className="testimonial-author">
              <span className="testimonial-avatar" aria-hidden="true">
                {testimonial.name.slice(0, 1)}
              </span>
              <span className="testimonial-author-copy">
                <span className="testimonial-author-name">{testimonial.name}</span>
                <span className="testimonial-author-role">
                  {testimonial.title} · {testimonial.company}
                </span>
              </span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="testimonial-column"
      style={{ "--testimonial-duration": `${duration}s` } as CSSProperties}
    >
      <div className={`testimonial-track testimonial-track--${direction}`}>
        {renderCards()}
        <div className="testimonial-duplicate" aria-hidden="true">
          {renderCards()}
        </div>
      </div>
    </div>
  );
}

function splitTestimonials(items: Testimonial[], columns: number, column: number) {
  return items.filter((_, index) => index % columns === column);
}

export function Testimonials() {
  const { t } = useTranslation();
  const { testimonials } = useContent();
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="temoignages"
      data-paused={paused}
      className="testimonial-section relative scroll-mt-16 overflow-hidden py-16 sm:py-20 lg:scroll-mt-20 lg:py-24"
    >
      <div className="testimonial-heading relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
        <h2 className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-balance text-ink sm:text-3xl lg:text-4xl">
          {t("testimonials.title")}
        </h2>
        <p className="mt-3 text-sm text-muted sm:text-base">
          {t("testimonials.subtitle")}
        </p>
        <p className="mt-2 text-xs font-medium text-muted">
          {t("testimonials.note")}
        </p>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? t("testimonials.resumeMotion") : t("testimonials.pauseMotion")}
          className="testimonial-motion-button mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-surface-2 bg-white px-4 py-2 text-sm font-medium text-muted-2 transition-colors hover:border-brand/25 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          <span>{paused ? t("testimonials.resumeMotion") : t("testimonials.pauseMotion")}</span>
        </button>
      </div>

      <div className="testimonial-gallery relative mx-auto mt-8 grid h-[440px] max-w-7xl grid-cols-1 gap-5 px-5 sm:mt-10 sm:h-[480px] sm:px-6 lg:mt-12 lg:h-[520px] lg:grid-cols-3 lg:gap-6 lg:px-8">
        <div className="testimonial-mobile-column sm:hidden">
          <TestimonialColumn items={testimonials} direction="up" duration={38} />
        </div>

        <div className="testimonial-breakpoint-columns hidden grid-cols-2 gap-5 sm:grid lg:hidden">
          <TestimonialColumn
            items={splitTestimonials(testimonials, 2, 0)}
            direction="up"
            duration={39}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 2, 1)}
            direction="down"
            duration={45}
          />
        </div>

        <div className="testimonial-breakpoint-columns hidden grid-cols-3 gap-6 lg:grid">
          <TestimonialColumn
            items={splitTestimonials(testimonials, 3, 0)}
            direction="up"
            duration={42}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 3, 1)}
            direction="down"
            duration={48}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 3, 2)}
            direction="up"
            duration={44}
          />
        </div>
      </div>
    </section>
  );
}
