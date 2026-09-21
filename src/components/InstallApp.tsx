import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

const copy = {
  fr: { title: "Installer TrustSend", body: "Accédez plus vite à TrustSend depuis votre appareil.", action: "Installer", close: "Fermer" },
  en: { title: "Install TrustSend", body: "Get faster access to TrustSend from your device.", action: "Install", close: "Close" },
  ln: { title: "Kotya TrustSend", body: "Kota na TrustSend noki na aparɛyi na yo.", action: "Kotya", close: "Kanga" },
  sw: { title: "Sakinisha TrustSend", body: "Fikia TrustSend kwa haraka kutoka kwenye kifaa chako.", action: "Sakinisha", close: "Funga" },
};

export function InstallApp() {
  const { i18n } = useTranslation();
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("trustsend-install-dismissed") === "1");
  const language = i18n.language.startsWith("en") ? "en" : i18n.language.startsWith("ln") ? "ln" : i18n.language.startsWith("sw") ? "sw" : "fr";
  const text = copy[language];

  useEffect(() => {
    const onBeforeInstall = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPromptEvent); };
    const onInstalled = () => setPrompt(null);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => { window.removeEventListener("beforeinstallprompt", onBeforeInstall); window.removeEventListener("appinstalled", onInstalled); };
  }, []);

  if (!prompt || dismissed) return null;
  const dismiss = () => { localStorage.setItem("trustsend-install-dismissed", "1"); setDismissed(true); };
  const install = async () => { await prompt.prompt(); if ((await prompt.userChoice).outcome !== "accepted") return; setPrompt(null); };

  return <aside className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-surface-2 bg-white p-4 shadow-pop" aria-label={text.title}><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-brand"><Download size={19} aria-hidden="true" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-ink">{text.title}</p><p className="mt-0.5 text-xs leading-5 text-muted">{text.body}</p></div><button type="button" onClick={install} className="rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark">{text.action}</button><button type="button" onClick={dismiss} aria-label={text.close} className="rounded-md p-1 text-muted transition-colors hover:bg-surface hover:text-ink"><X size={17} aria-hidden="true" /></button></aside>;
}
