import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { Agents } from "./pages/Agents";
import { InternationalTransfer } from "./pages/InternationalTransfer";
import { VirtualCards } from "./pages/VirtualCards";
import { Crypto } from "./pages/Crypto";
import { Merchant } from "./pages/Merchant";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RequireAuth } from "./components/RequireAuth";
import { ExternalRedirect } from "./components/ExternalRedirect";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Overview } from "./pages/dashboard/Overview";
import { TransactionsPage } from "./pages/dashboard/TransactionsPage";
import { WalletPage } from "./pages/dashboard/WalletPage";
import { AddWalletPage } from "./pages/dashboard/AddWalletPage";
import { DepositPage } from "./pages/dashboard/DepositPage";
import { WithdrawPage } from "./pages/dashboard/WithdrawPage";
import { SwapPage } from "./pages/dashboard/SwapPage";
import { ApiKeysPage } from "./pages/dashboard/ApiKeysPage";
import { CardsPage } from "./pages/dashboard/CardsPage";
import { CreateCardPage } from "./pages/dashboard/CreateCardPage";
import { CardDetailPage } from "./pages/dashboard/CardDetailPage";
import { WebhooksPage } from "./pages/dashboard/WebhooksPage";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { NotificationsPage } from "./pages/dashboard/NotificationsPage";
import { KycPage } from "./pages/dashboard/KycPage";
import { Legal } from "./pages/Legal";
import { InstallApp } from "./components/InstallApp";
import { Contact } from "./pages/Contact";
import { Seo } from "./components/Seo";
import {
  BUSINESS_ORIGIN,
  MARKETING_ORIGIN,
  showBusinessRoutes,
  showMarketingRoutes,
} from "./lib/domains";

const seoConfig: Record<string, { title: string; description: string; keywords: string; image?: string; robots?: string }> = {
  "/": {
    title: "TrustSend | Paiements, transferts et payroll pour les entreprises",
    description:
      "TrustSend aide les entreprises à gérer les paiements, les transferts internationaux, les cartes virtuelles et le payroll en Afrique et à l'international.",
    keywords:
      "paiements entreprises, payroll, transferts internationaux, cartes virtuelles, API de paiement, fintech Afrique",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/pricing": {
    title: "Tarifs TrustSend | Paiements et fintech pour entreprises",
    description:
      "Découvrez les tarifs TrustSend pour les paiements, les transferts, le payroll et les solutions de fintech adaptées aux entreprises.",
    keywords: "tarifs fintech, prix paiement entreprise, payroll pricing, transferts prix, carte virtuelle prix",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/privacy": {
    title: "Politique de confidentialité | TrustSend",
    description: "Consultez la politique de confidentialité de TrustSend.",
    keywords: "confidentialité TrustSend, données personnelles, privacy policy",
    robots: "index,follow",
  },
  "/terms": {
    title: "Conditions d’utilisation | TrustSend",
    description: "Consultez les conditions d’utilisation des services TrustSend.",
    keywords: "conditions TrustSend, termes utilisation, conditions fintech",
    robots: "index,follow",
  },
  "/contact": {
    title: "Support et contact | TrustSend",
    description: "Créez un ticket et contactez l’équipe Support TrustSend.",
    keywords: "support TrustSend, contact TrustSend, ticket paiement, assistance fintech",
    robots: "index,follow",
  },
  "/agents": {
    title: "Agents TrustSend | Solutions de paiement et d'intégration",
    description:
      "Des solutions de paiement, d'intégration et d'automatisation pour les agents, partenaires et entreprises qui veulent croître plus vite.",
    keywords: "agents fintech, partenaires paiement, intégration API, solutions fintech, business growth",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/transferts-internationaux": {
    title: "Transferts internationaux | TrustSend",
    description:
      "Envoyez et recevez de l'argent à travers les frontières avec des transferts internationaux rapides, moins chers et sécurisés.",
    keywords: "transferts internationaux, envoi d'argent, mobile money, transfer Afrique, paiement global",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/cartes-virtuelles": {
    title: "Cartes virtuelles | TrustSend",
    description:
      "Créez et gérez des cartes virtuelles pour vos achats, abonnements et dépenses professionnelles en toute sécurité.",
    keywords: "cartes virtuelles, paiement digital, carte entreprise, carte de dépenses, cartes VCC",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/cryptomonnaies": {
    title: "Crypto & paiements numériques | TrustSend",
    description:
      "Accédez aux paiements crypto, aux stablecoins et aux flux financiers numériques via une solution fintech moderne.",
    keywords: "cryptomonnaies, paiements crypto, stablecoins, fintech crypto, blockchain entreprise",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/paiement-marchand": {
    title: "Paiement marchand | TrustSend",
    description:
      "Offrez à vos clients une expérience de paiement sécurisée, rapide et adaptée à votre activité en ligne ou hors ligne.",
    keywords: "paiement marchand, checkout entreprise, acceptation de paiement, ecommerce Africa, paiement en ligne",
    image: "/assets/images/crypto-hero.avif",
    robots: "index,follow",
  },
  "/login": {
    title: "Connexion TrustSend",
    description: "Connectez-vous à votre espace TrustSend pour gérer vos paiements, comptes et dashboard.",
    keywords: "connexion TrustSend, espace client, dashboard paiement",
    robots: "noindex,nofollow",
  },
  "/signup": {
    title: "Créer un compte TrustSend",
    description: "Ouvrez votre compte TrustSend pour accéder aux paiements, transferts et outils de gestion d'entreprise.",
    keywords: "inscription TrustSend, créer un compte fintech, signup entreprise",
    robots: "noindex,nofollow",
  },
};

function App() {
  const location = useLocation();
  const currentSeo = seoConfig[location.pathname] ?? seoConfig["/"];

  return (
    <>
      <Seo
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        image={currentSeo.image ?? "/assets/images/crypto-hero.avif"}
        robots={currentSeo.robots ?? "index,follow"}
        pathname={location.pathname}
      />

      <Routes>
        {/* ---------- Site vitrine (www) ---------- */}
        {showMarketingRoutes ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/transferts-internationaux" element={<InternationalTransfer />} />
            <Route path="/cartes-virtuelles" element={<VirtualCards />} />
            <Route path="/cryptomonnaies" element={<Crypto />} />
            <Route path="/paiement-marchand" element={<Merchant />} />
          </>
        ) : (
          // Sur l'espace client, la racine mène au dashboard et le reste repart vers la vitrine
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<ExternalRedirect to={MARKETING_ORIGIN} />} />
          </>
        )}

        {/* ---------- Espace client (business) ---------- */}
        {showBusinessRoutes ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Overview />} />
              <Route path="transactions" element={<TransactionsPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="wallet/new" element={<AddWalletPage />} />
              <Route path="deposit" element={<DepositPage />} />
              <Route path="withdraw" element={<WithdrawPage />} />
              <Route path="swap" element={<SwapPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="cards/new" element={<CreateCardPage />} />
              <Route path="cards/:id" element={<CardDetailPage />} />
              <Route path="api-keys" element={<ApiKeysPage />} />
              <Route path="webhooks" element={<WebhooksPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="kyc" element={<KycPage />} />
            </Route>
          </>
        ) : (
          // Sur la vitrine, ces chemins ne sont pas montés : ils renvoient vers l'espace client
          <>
            <Route path="/login" element={<ExternalRedirect to={`${BUSINESS_ORIGIN}/login`} />} />
            <Route path="/signup" element={<ExternalRedirect to={`${BUSINESS_ORIGIN}/signup`} />} />
            <Route
              path="/dashboard/*"
              element={<ExternalRedirect to={`${BUSINESS_ORIGIN}/dashboard`} />}
            />
          </>
        )}
      </Routes>
      <InstallApp />
    </>
  );
}

export default App;
