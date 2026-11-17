import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import { TrustpilotReviewCollector } from "./TrustpilotReviewCollector";
// import loopPattern from "assets/images/figure-get-card.webp";

type Testimonial = ReturnType<typeof useContent>["testimonials"][number];

export function Testimonials() {
  const { t } = useTranslation();
  const { testimonials } = useContent();
  const testimonialColumns = Array.from({ length: 4 }, (_, columnIndex) =>
    testimonials.filter((_, testimonialIndex) => testimonialIndex % 4 === columnIndex),
  );
  const maxColumnLength = Math.max(
    1,
    ...testimonialColumns.map((column) => column.length),
  );

  return (
    <section
      id="temoignages"
      className="relative scroll-mt-16 overflow-hidden bg-brand-light/40 py-16 sm:py-20 lg:scroll-mt-20 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display font-bold text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl text-ink">
            {t("testimonials.title")}
          </h2>
          <p className="mt-2 text-muted">
            {t("testimonials.subtitle")}
          </p>
          <TrustpilotReviewCollector />
        </Reveal>

        <div
          className="testimonial-marquee-grid mt-10 hidden grid-cols-4 gap-4 text-left sm:mt-12 xl:grid"
          style={{ height: `${maxColumnLength * 252}px` }}
        >
          {testimonialColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="testimonial-marquee">
              <div
                className={`testimonial-marquee-track ${
                  columnIndex % 2 === 0
                    ? "testimonial-marquee-track-up"
                    : "testimonial-marquee-track-down"
                }`}
                style={{
                  animationDuration: `${32 + columnIndex * 2}s`,
                  animationDelay: `${-columnIndex * 4}s`,
                }}
              >
                {[0, 1].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    className="testimonial-marquee-group"
                    aria-hidden={copyIndex > 0}
                  >
                    {column.map((testimonial) => (
                      <TestimonialCard
                        key={testimonial.name}
                        testimonial={testimonial}
                        marquee
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:mt-12 sm:grid-cols-2 xl:hidden">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  marquee = false,
}: {
  testimonial: Testimonial;
  marquee?: boolean;
}) {
  const initials = testimonial.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <article
      className={`flex flex-col rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-7 ${
        marquee ? "testimonial-marquee-card" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white"
        >
          {testimonial.company.charAt(0)}
        </span>
        <span className="font-semibold text-ink">{testimonial.company}</span>
      </div>

      <p
        className={`mt-6 flex-1 text-base leading-relaxed text-ink sm:text-lg ${
          marquee ? "testimonial-marquee-quote" : ""
        }`}
      >
        “{testimonial.quote}”
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-5">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{testimonial.name}</p>
          <p className="text-sm text-muted">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}
