import { useState, type FormEvent } from "react";
import { AlertCircle, Loader2, Plus, Trash2, Webhook as WebhookIcon } from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import {
  useWebhooks,
  useCreateWebhook,
  useDeleteWebhook,
} from "../../hooks/useWebhooks";
import { WEBHOOK_EVENTS, type WebhookEvent } from "../../types/dashboard";
import { formatDateTime } from "../../lib/format";

const eventLabelKeys: Record<WebhookEvent, string> = {
  "mobile_money_deposit.completed": "eventDepositCompleted",
  "mobile_money_deposit.failed": "eventDepositFailed",
  "mobile_money_payout.completed": "eventPayoutCompleted",
  "mobile_money_payout.failed": "eventPayoutFailed",
};

export function WebhooksPage() {
  const { t } = useTranslation();
  const webhooks = useWebhooks();
  const create = useCreateWebhook();
  const del = useDeleteWebhook();
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<WebhookEvent[]>([]);

  const toggleEvent = (event: WebhookEvent) => {
    setEvents((es) => (es.includes(event) ? es.filter((e) => e !== event) : [...es, event]));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate(
      { url, events },
      { onSuccess: () => { setUrl(""); setEvents([]); } },
    );
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">{t("dashboard.webhooks.title")}</h1>
      <p className="mt-1 text-muted">
        {t("dashboard.webhooks.subtitle")}
      </p>

      {create.isSuccess && create.data && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-800">
            {t("dashboard.webhooks.secretNotice")}
          </p>
          <code className="mt-3 block truncate rounded border border-amber-200 bg-white px-3.5 py-2.5 text-sm text-ink">
            {create.data.secret}
          </code>
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-surface-2 bg-white p-6">
        <h2 className="font-display font-semibold text-ink">{t("dashboard.webhooks.addWebhook")}</h2>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink" htmlFor="webhook-url">
            {t("dashboard.webhooks.url")}
          </label>
          <input
            id="webhook-url"
            type="url"
            required
            value={url}
            onInput={(e) => setUrl(e.currentTarget.value)}
            placeholder="https://maboutique.com/webhooks/Reemite"
            className="w-full rounded border border-surface-2 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand-light"
          />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">{t("dashboard.webhooks.events")}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {WEBHOOK_EVENTS.map((event) => (
              <label
                key={event}
                className="flex items-center gap-2 rounded border border-surface-2 px-3 py-2 text-sm text-ink"
              >
                <input
                  type="checkbox"
                  checked={events.includes(event)}
                  onChange={() => toggleEvent(event)}
                  className="h-4 w-4 rounded border-surface-2 text-brand focus:ring-brand-light"
                />
                {t(`dashboard.webhooks.${eventLabelKeys[event]}`)}
              </label>
            ))}
          </div>
        </div>

        {create.isError && (
          <p className="flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle size={15} /> {t("dashboard.webhooks.createError")}
          </p>
        )}

        <button
          type="submit"
          disabled={create.isPending || events.length === 0}
          aria-busy={create.isPending || undefined}
          className="inline-flex items-center gap-2 rounded bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {create.isPending ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Plus size={16} />
          )}
          {t("dashboard.webhooks.create")}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-surface-2 bg-white">
        {webhooks.isLoading ? (
          <LoadingSpinner label={t("dashboard.webhooks.loading")} />
        ) : webhooks.isError ? (
          <p className="flex items-center gap-1.5 px-5 py-8 text-sm text-red-600">
            <AlertCircle size={15} /> {t("dashboard.webhooks.error")}
          </p>
        ) : webhooks.data && webhooks.data.length > 0 ? (
          <ul className="divide-y divide-surface-2">
            {webhooks.data.map((w) => (
              <li key={w.id} className="flex items-start gap-4 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                  <WebhookIcon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{w.url}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {w.events.map((e) => t(`dashboard.webhooks.${eventLabelKeys[e]}`)).join(", ")}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {t("dashboard.webhooks.createdOn", { date: formatDateTime(w.created_at) })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    w.active ? "bg-accent-light text-accent" : "bg-surface text-muted-2"
                  }`}
                >
                  {w.active ? t("dashboard.webhooks.active") : t("dashboard.webhooks.inactive")}
                </span>
                <button
                  onClick={() => del.mutate(w.id)}
                  disabled={del.isPending}
                  aria-busy={(del.isPending && del.variables === w.id) || undefined}
                  aria-label={t("dashboard.webhooks.delete")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  {del.isPending && del.variables === w.id ? (
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-sm text-muted">{t("dashboard.webhooks.none")}</p>
        )}
      </div>
    </div>
  );
}
