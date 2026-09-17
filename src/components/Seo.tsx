import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  keywords: string;
  image: string;
  robots: string;
  pathname: string;
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

export function Seo({ title, description, keywords, image, robots, pathname }: SeoProps) {
  useEffect(() => {
    document.title = title;

    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    setMetaTag('meta[name="robots"]', "name", "robots", robots);
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:image"]', "property", "og:image", image);
    setMetaTag('meta[property="og:url"]', "property", "og:url", `https://trustsend.africa${pathname}`);
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", image);

    setCanonicalLink(`https://trustsend.africa${pathname}`);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "TrustSend",
      url: "https://trustsend.africa",
      logo: "https://trustsend.africa/favicon.svg",
      description,
      areaServed: "Africa and international markets",
      sameAs: [
        "https://www.linkedin.com",
        "https://www.x.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        areaServed: "Worldwide",
      },
    };

    addJsonLd(schema);
  }, [title, description, keywords, image, robots, pathname]);

  return null;
}
