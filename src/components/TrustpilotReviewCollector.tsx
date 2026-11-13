import { useEffect, useRef } from "react";

type TrustpilotWindow = Window & {
  Trustpilot?: {
    loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
  };
};

const TRUSTPILOT_SCRIPT_ID = "trustpilot-widget-bootstrap";

export function TrustpilotReviewCollector() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const loadWidget = () => {
      if (widget.querySelector("iframe")) return;

      const trustpilot = (window as TrustpilotWindow).Trustpilot;
      if (typeof trustpilot?.loadFromElement === "function") {
        trustpilot.loadFromElement(widget, true);
      }
    };

    const script = document.getElementById(TRUSTPILOT_SCRIPT_ID);
    if (!script) {
      throw new Error("Trustpilot bootstrap script is missing from the document head.");
    }

    let timerId: number | undefined;
    const scheduleWidgetLoad = () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
      timerId = window.setTimeout(loadWidget, 100);
    };

    script.addEventListener("load", scheduleWidgetLoad);
    window.addEventListener("load", scheduleWidgetLoad, { once: true });

    if (document.readyState === "complete") scheduleWidgetLoad();

    return () => {
      script.removeEventListener("load", scheduleWidgetLoad);
      window.removeEventListener("load", scheduleWidgetLoad);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      className="trustpilot-widget mx-auto mt-6 max-w-lg"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6af65cab9898c9d06ed3f90b"
      data-style-height="52px"
      data-style-width="100%"
    >
      <a
        href="https://www.trustpilot.com/review/reemite.com"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
}
