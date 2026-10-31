import type { CSSProperties } from "react";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";

type Testimonial = ReturnType<typeof useContent>["testimonials"][number];
type Direction = "up" | "down";

function TestimonialColumn({
  items,
  direction,
  duration,
  ratingLabel,
}: {
  items: Testimonial[];
  direction: Direction;
  duration: number;
  ratingLabel: string;
}) {
  const renderCards = () => (
    <ul className="testimonial-card-list">
      {items.map((testimonial) => (
        <li key={testimonial.name}>
          <article className="testimonial-card">
            <Quote className="testimonial-quote-mark" size={23} strokeWidth={2} aria-hidden="true" />
            <div
              className="testimonial-rating"
              role="img"
              aria-label={ratingLabel}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={17} strokeWidth={1.75} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="testimonial-quote">
              “{testimonial.quote}”
            </blockquote>
            <div className="testimonial-author">
              <img
                className="testimonial-avatar"
                src={testimonial.avatar}
                alt=""
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
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
  const ratingLabel = t("testimonials.rating", { rating: 5 });

  return (
    <section
      id="temoignages"
      className="testimonial-section relative scroll-mt-16 overflow-hidden lg:scroll-mt-20"
    >
      <div className="testimonial-heading relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
        <h2 className="font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
          {t("testimonials.title")}
        </h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          {t("testimonials.subtitle")}
        </p>
      </div>

      <div className="testimonial-gallery relative mx-auto mt-10 grid h-[520px] w-full max-w-[1600px] grid-cols-1 gap-5 px-5 sm:mt-12 sm:h-[620px] sm:px-8 lg:mt-14 lg:h-[680px] lg:grid-cols-3 lg:gap-7 lg:px-10 2xl:h-[720px] 2xl:grid-cols-4 2xl:gap-8">
        <div className="testimonial-mobile-column col-span-full sm:hidden">
          <TestimonialColumn
            items={testimonials}
            direction="up"
            duration={38}
            ratingLabel={ratingLabel}
          />
        </div>

        <div className="testimonial-breakpoint-columns col-span-full hidden grid-cols-2 gap-5 sm:grid lg:hidden">
          <TestimonialColumn
            items={splitTestimonials(testimonials, 2, 0)}
            direction="up"
            duration={39}
            ratingLabel={ratingLabel}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 2, 1)}
            direction="down"
            duration={45}
            ratingLabel={ratingLabel}
          />
        </div>

        <div className="testimonial-breakpoint-columns col-span-full hidden grid-cols-3 gap-7 lg:grid 2xl:hidden">
          <TestimonialColumn
            items={splitTestimonials(testimonials, 3, 0)}
            direction="up"
            duration={42}
            ratingLabel={ratingLabel}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 3, 1)}
            direction="down"
            duration={48}
            ratingLabel={ratingLabel}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 3, 2)}
            direction="up"
            duration={44}
            ratingLabel={ratingLabel}
          />
        </div>

        <div className="testimonial-breakpoint-columns col-span-full hidden grid-cols-4 gap-8 2xl:grid">
          <TestimonialColumn
            items={splitTestimonials(testimonials, 4, 0)}
            direction="up"
            duration={42}
            ratingLabel={ratingLabel}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 4, 1)}
            direction="down"
            duration={48}
            ratingLabel={ratingLabel}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 4, 2)}
            direction="up"
            duration={44}
            ratingLabel={ratingLabel}
          />
          <TestimonialColumn
            items={splitTestimonials(testimonials, 4, 3)}
            direction="down"
            duration={46}
            ratingLabel={ratingLabel}
          />
        </div>
      </div>
    </section>
  );
}
