import { useEffect } from "react";
import { CANONICAL_ORIGIN } from "../lib/domains";
import { buildSchema, resolveSeo } from "../seo";
import type { UrlLanguage } from "../lib/languageRoutes";

type SeoProps = {
  /** Chemin sans préfixe de langue ("/pricing"). */
  pathname: string;
  lang: UrlLanguage;
};

function setMetaTag(selector: string, attribute: "name" | "property", value: string, content: string) {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonicalLink(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

// Versions linguistiques de la page : remplacées à chaque navigation
function setAlternateLinks(alternates: { lang: string; url: string }[], xDefault: string) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
  const links = alternates.length ? [...alternates, { lang: "x-default", url: xDefault }] : [];
  for (const { lang, url } of links) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  }
}

function addJsonLd(data: Record<string, unknown>) {
  let script = document.head.querySelector('script[data-seo="organization"]') as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "organization";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function Seo({ pathname, lang }: SeoProps) {
  useEffect(() => {
    const { title, description, image, robots, url, alternates, xDefault } = resolveSeo(pathname, lang);
    const imageUrl = image.startsWith("http") ? image : `${CANONICAL_ORIGIN}${image}`;

    document.title = title;

    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[name="robots"]', "name", "robots", robots);
    setMetaTag('meta[property="og:locale"]', "property", "og:locale", lang === "en" ? "en_US" : "fr_FR");
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMetaTag('meta[property="og:url"]', "property", "og:url", url);
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    setCanonicalLink(url);
    setAlternateLinks(alternates, xDefault);
    addJsonLd(buildSchema(pathname, lang));
  }, [pathname, lang]);

  return null;
}
