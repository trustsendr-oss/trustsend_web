import { Navigate, Route, Routes, useHref, useLocation } from "react-router-dom";
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
import { MerchantPaymentsPage } from "./pages/dashboard/MerchantPaymentsPage";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { NotificationsPage } from "./pages/dashboard/NotificationsPage";
import { KycPage } from "./pages/dashboard/KycPage";
import { Legal } from "./pages/Legal";
import { InstallApp } from "./components/InstallApp";
import { Contact } from "./pages/Contact";
import { Seo } from "./components/Seo";
import { ScrollManager } from "./components/ScrollManager";
import { languageFromPath } from "./lib/languageRoutes";
import {
  BUSINESS_ORIGIN,
  MARKETING_ORIGIN,
  showBusinessRoutes,
  showMarketingRoutes,
} from "./lib/domains";

function App() {
  const location = useLocation();
  // Le basename du routeur porte la langue de l'URL : "/en" pour l'anglais
  const urlLanguage = languageFromPath(useHref("/"));

  return (
    <>
      <Seo pathname={location.pathname} lang={urlLanguage} />
      <ScrollManager />

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
              <Route path="merchant-payments" element={<MerchantPaymentsPage />} />
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
