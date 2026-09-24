import { useEffect, useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Home,
  IdCard,
  Loader2,
  Lock,
  RotateCw,
  Rocket,
  ScanFace,
  ShieldCheck,
  UploadCloud,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { ButtonSpinner } from "../../components/LoadingSpinner";
import { AuthField } from "../../components/auth/AuthField";
import { useTranslation } from "react-i18next";
import { useKycStatus, useSubmitKyc } from "../../hooks/useKyc";
import { ApiError } from "../../lib/api";
import { formatDateTime } from "../../lib/format";
import type { KycBusinessType, KycDocumentField, KycVerificationType } from "../../types/dashboard";
import "../../styles/geist.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

// Anneau de focus clavier commun à tous les contrôles de la page.
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
// Variante pour les <label> qui enveloppent un input masqué (radios, fichier).
const focusWithinRing =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand";

// Le KYC du dashboard se limite à une pièce d'identité. Chaque choix correspond à une combinaison
// acceptée par l'API pour verification_type "identity" (app/services/security/kyc_requirements.ts).
const VERIFICATION_TYPE: KycVerificationType = "identity";

const IDENTITY_METHODS = ["passport", "id_card", "driver_license", "representative_id"] as const;
type IdentityMethod = (typeof IDENTITY_METHODS)[number];

const IDENTITY_METHOD_FIELDS: Record<IdentityMethod, KycDocumentField[]> = {
  passport: ["passport"],
  id_card: ["id_card_front", "id_card_back"],
  driver_license: ["driver_license_front", "driver_license_back"],
  representative_id: ["representative_id_front", "representative_id_back"],
};

const STATUS_VISUAL: Record<string, { icon: LucideIcon; box: string; iconBox: string }> = {
  pending: { icon: Clock3, box: "border-amber-200 bg-amber-50", iconBox: "bg-amber-100 text-amber-700" },
  approved: { icon: CheckCircle2, box: "border-emerald-200 bg-emerald-50", iconBox: "bg-emerald-100 text-emerald-700" },
  rejected: { icon: XCircle, box: "border-red-200 bg-red-50", iconBox: "bg-red-100 text-red-700" },
};

// Icône représentative par type de document, plutôt qu'un pictogramme
// générique répété pour chaque pièce.
function documentIcon(doc: string) {
  if (doc === "selfie") return ScanFace;
  if (doc === "proof_of_address") return Home;
  if (doc === "business_registration_certificate" || doc === "tax_identification_certificate") return Building2;
  if (
    doc.startsWith("id_card") ||
    doc === "passport" ||
    doc.startsWith("driver_license") ||
    doc.startsWith("representative_id")
  ) {
    return IdCard;
  }
  return FileText;
}

const BUSINESS_TYPES: readonly KycBusinessType[] = ["company", "startup"];

// Pièce exigée en plus de l'identité, selon le type d'entreprise — même règle que
// REQUIRED_BUSINESS_DOCUMENTS côté API (business_dashboard/kyc_controller.ts).
const BUSINESS_DOCUMENT: Record<KycBusinessType, KycDocumentField> = {
  company: "business_registration_certificate",
  startup: "proof_of_address",
};

const BUSINESS_TYPE_ICON: Record<KycBusinessType, LucideIcon> = {
  company: Building2,
  startup: Rocket,
};

type FormState = {
  businessName: string;
  businessType: KycBusinessType | null;
  identityMethod: IdentityMethod;
  files: Partial<Record<KycDocumentField, File>>;
};

// Documents facultatifs proposés selon le type : une startup déjà immatriculée
// peut aussi joindre son RCCM.
function optionalBusinessFields(form: FormState): KycDocumentField[] {
  return form.businessType === "startup" ? ["business_registration_certificate"] : [];
}

function validateFile(file: File): string | null {
  const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!ACCEPTED_EXTENSIONS.includes(ext)) return "invalidType";
  if (file.size > MAX_FILE_SIZE) return "tooLarge";
  return null;
}

function formatSize(bytes: number, locale: string) {
  const mb = bytes >= 1024 * 1024;
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: mb ? "megabyte" : "kilobyte",
    unitDisplay: "short",
    maximumFractionDigits: mb ? 1 : 0,
  }).format(mb ? bytes / 1024 / 1024 : Math.max(1, bytes / 1024));
}

// URL d'aperçu pour les images, révoquée dès que le fichier change.
function useImagePreview(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return url;
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

function Step({
  n,
  id,
  title,
  done = false,
  aside,
  description,
  children,
}: {
  n: number;
  id: string;
  title: string;
  done?: boolean;
  aside?: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-x-10 gap-y-5 px-6 py-8 sm:px-10 min-[52rem]:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
    >
      <div className="min-w-0">
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            done ? "bg-accent text-white" : "bg-brand-light text-brand"
          }`}
        >
          {done ? <Check size={15} strokeWidth={3} /> : n}
        </span>
        <h3 id={id} className="mt-3 font-display text-lg leading-snug text-ink">
          {title}
        </h3>
        {description && <p className="mt-1.5 text-sm leading-relaxed text-muted-2">{description}</p>}
        {aside && <div className="mt-3">{aside}</div>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function FileDrop({
  field,
  label,
  file,
  error,
  hint,
  optional = false,
  onChange,
}: {
  field: KycDocumentField;
  label: string;
  hint?: string;
  optional?: boolean;
  file: File | null;
  error: string | null;
  onChange: (file: File | null) => void;
}) {
  const { t, i18n } = useTranslation();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const refocusInput = useRef(false);
  const preview = useImagePreview(file);
  const Icon = documentIcon(field);

  const id = `kyc-${field}`;
  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;

  // Après suppression, le bouton « retirer » disparaît : on rend le focus à
  // la zone d'upload pour ne pas perdre l'utilisateur clavier.
  useEffect(() => {
    if (!file && refocusInput.current) {
      refocusInput.current = false;
      inputRef.current?.focus();
    }
  }, [file]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onChange(dropped);
  };

  return (
    <div>
      <div className="mb-2">
        <p id={labelId} className="flex items-baseline justify-between gap-2 text-sm font-medium text-ink">
          {label}
          {optional && <span className="text-xs font-normal text-muted">{t("dashboard.kyc.optional")}</span>}
        </p>
        {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      </div>

      {file ? (
        <div className="flex items-center gap-3 rounded border border-accent/60 bg-accent-light/20 p-3">
          {preview ? (
            <img src={preview} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover ring-1 ring-black/5" />
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
              <Icon size={18} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink" title={file.name}>
              {file.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
              <CheckCircle2 size={12} className="shrink-0 text-emerald-600" />
              {formatSize(file.size, i18n.language)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              refocusInput.current = true;
              onChange(null);
            }}
            aria-label={`${t("dashboard.kyc.removeFile")} — ${label}`}
            className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-surface-2 hover:text-ink ${focusRing}`}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            // Ignore les dragleave émis en survolant les enfants de la zone.
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
          }}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded border border-dashed px-4 py-7 text-center transition-colors ${focusWithinRing} ${
            error
              ? "border-red-400 bg-red-50"
              : dragging
                ? "border-accent bg-accent-light/40"
                : "border-black/25 bg-white hover:border-black/50 hover:bg-surface"
          }`}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={ACCEPTED_EXTENSIONS.join(",")}
            className="sr-only"
            aria-labelledby={labelId}
            aria-describedby={hintId}
            aria-invalid={error ? true : undefined}
            onChange={(e) => {
              onChange(e.target.files?.[0] ?? null);
              e.target.value = "";
            }}
          />
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform ${
              dragging ? "scale-110" : ""
            } ${error ? "bg-red-100 text-red-600" : "bg-white text-brand shadow-card"}`}
          >
            <UploadCloud size={20} />
          </span>
          <span className="mt-3 text-sm font-medium text-ink">{t("dashboard.kyc.clickToUpload")}</span>
          <span id={hintId} className="mt-1 text-xs text-muted">
            {error ? (
              <span role="alert" className="inline-flex items-center gap-1.5 font-medium text-red-700">
                <AlertCircle size={13} className="shrink-0" />
                {t(`dashboard.kyc.fileError.${error}`)}
              </span>
            ) : (
              t("dashboard.kyc.fileFormats")
            )}
          </span>
        </label>
      )}
    </div>
  );
}

function MethodPicker<T extends string>({
  name,
  label,
  options,
  value,
  onChange,
  labelFor,
}: {
  name: string;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labelFor: (option: T) => string;
}) {
  const labelId = `kyc-${name}-label`;
  return (
    <div>
      <p id={labelId} className="mb-2 text-sm font-medium text-ink">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <label
              key={option}
              className={`inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${focusWithinRing} ${
                active
                  ? "border-accent bg-accent-light/50 text-brand shadow-[inset_0_0_0_1px_var(--color-accent)]"
                  : "border-black/25 text-muted-2 hover:border-black/50 hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name={`kyc-${name}`}
                value={option}
                checked={active}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {active && <Check size={14} />}
              {labelFor(option)}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function KycSkeleton({ label }: { label: string }) {
  const block = "rounded-lg bg-surface-2 motion-safe:animate-pulse";
  return (
    <div className="mx-auto max-w-2xl" aria-busy="true">
      <span className="sr-only" role="status">
        {label}
      </span>
      <div className="flex items-start gap-4" aria-hidden="true">
        <div className={`h-12 w-12 rounded-2xl ${block}`} />
        <div className="flex-1 space-y-2 pt-1">
          <div className={`h-6 w-48 ${block}`} />
          <div className={`h-4 w-72 max-w-full ${block}`} />
        </div>
      </div>
      <div className="mt-6 space-y-5 rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-8" aria-hidden="true">
        <div className={`h-5 w-40 ${block}`} />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={`h-16 rounded-xl ${block}`} />
          ))}
        </div>
        <div className={`h-32 rounded-xl ${block}`} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

function BusinessTypePicker({
  value,
  onChange,
}: {
  value: KycBusinessType | null;
  onChange: (value: KycBusinessType) => void;
}) {
  const { t } = useTranslation();
  const labelId = "kyc-business-type-label";
  return (
    <div>
      <p id={labelId} className="mb-2 text-sm font-medium text-ink">
        {t("dashboard.kyc.businessTypeLabel")}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="grid gap-2.5 sm:grid-cols-2">
        {BUSINESS_TYPES.map((type) => {
          const active = value === type;
          const Icon = BUSINESS_TYPE_ICON[type];
          return (
            <label
              key={type}
              className={`relative flex cursor-pointer items-start gap-3 rounded border p-4 transition-[border-color,box-shadow,background-color] ${focusWithinRing} ${
                active
                  ? "border-accent bg-accent-light/30 shadow-[inset_0_0_0_1px_var(--color-accent)]"
                  : "border-black/25 hover:border-black/50"
              }`}
            >
              <input
                type="radio"
                name="kyc-business-type"
                value={type}
                checked={active}
                onChange={() => onChange(type)}
                className="sr-only"
              />
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  active ? "bg-accent text-white" : "bg-surface-2 text-muted-2"
                }`}
              >
                <Icon size={17} />
              </span>
              <span className="min-w-0 pe-5">
                <span className="block text-sm font-semibold text-ink">{t(`dashboard.kyc.businessType.${type}`)}</span>
                <span className="mt-0.5 block text-xs text-muted">{t(`dashboard.kyc.businessTypeDesc.${type}`)}</span>
              </span>
              {active && <CheckCircle2 size={16} className="absolute end-3 top-3 text-accent" />}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function RequirementTag({ required }: { required: boolean }) {
  const { t } = useTranslation();
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
        required ? "bg-brand-light text-brand" : "bg-surface-2 text-muted-2"
      }`}
    >
      {required ? t("dashboard.kyc.required") : t("dashboard.kyc.optional")}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function KycPage() {
  const { t } = useTranslation();
  const kyc = useKycStatus();
  const submitKyc = useSubmitKyc();
  const [form, setForm] = useState<FormState>({
    businessName: "",
    businessType: null,
    identityMethod: "passport",
    files: {},
  });
  const [fileErrors, setFileErrors] = useState<Partial<Record<KycDocumentField, string>>>({});

  // Une erreur d'envoi n'a plus de sens dès que l'utilisateur modifie le dossier.
  const clearSubmitError = () => {
    if (submitKyc.isError) submitKyc.reset();
  };

  const setFile = (field: KycDocumentField, file: File | null) => {
    clearSubmitError();
    if (file) {
      const error = validateFile(file);
      setFileErrors((e) => ({ ...e, [field]: error ?? undefined }));
      if (error) return;
    } else {
      setFileErrors((e) => ({ ...e, [field]: undefined }));
    }
    setForm((f) => {
      const files = { ...f.files };
      if (file) files[field] = file;
      else delete files[field];
      return { ...f, files };
    });
  };

  // Retire les fichiers qui ne sont plus demandés après un changement de choix,
  // sans toucher aux autres sections déjà remplies.
  const changeChoice = (patch: Partial<FormState>, staleFields: KycDocumentField[]) => {
    clearSubmitError();
    const strip = <T,>(record: Partial<Record<KycDocumentField, T>>) => {
      const next = { ...record };
      for (const field of staleFields) delete next[field];
      return next;
    };
    setFileErrors(strip);
    setForm((f) => ({ ...f, ...patch, files: strip(f.files) }));
  };

  const changeIdentityMethod = (identityMethod: IdentityMethod) =>
    changeChoice({ identityMethod }, IDENTITY_METHOD_FIELDS[form.identityMethod]);

  const changeBusinessType = (businessType: KycBusinessType) =>
    changeChoice({ businessType }, ["business_registration_certificate", "proof_of_address"]);

  const identityFields = IDENTITY_METHOD_FIELDS[form.identityMethod];
  const businessField = form.businessType ? BUSINESS_DOCUMENT[form.businessType] : null;
  const optionalFields = optionalBusinessFields(form);

  const businessInfoDone = form.businessName.trim().length >= 2 && form.businessType !== null;
  const identityDone = identityFields.every((field) => form.files[field]);
  const businessDocsDone = businessField !== null && !!form.files[businessField];
  const stepsDone = [businessInfoDone, identityDone, businessDocsDone].filter(Boolean).length;
  const hasFileErrors = Object.values(fileErrors).some(Boolean);
  const canSubmit = businessInfoDone && identityDone && businessDocsDone && !hasFileErrors;
  // On garde le bouton en chargement le temps que le nouveau statut soit rechargé,
  // pour éviter de réafficher brièvement le formulaire rempli.
  const submitting = submitKyc.isPending || (submitKyc.isSuccess && kyc.isFetching);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting || !form.businessType || !businessField) return;
    const documents: Partial<Record<KycDocumentField, File>> = {};
    for (const field of [...identityFields, businessField, ...optionalFields, "other" as const]) {
      if (form.files[field]) documents[field] = form.files[field]!;
    }
    submitKyc.mutate({
      verification_type: VERIFICATION_TYPE,
      business_name: form.businessName.trim(),
      business_type: form.businessType,
      documents,
    });
  };

  if (kyc.isLoading) return <KycSkeleton label={t("dashboard.loading")} />;

  if (kyc.isError || !kyc.data) {
    return (
      <div
        role="alert"
        className="font-geist mx-auto flex max-w-2xl items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5"
      >
        <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
        <div>
          <p className="text-sm font-medium text-red-700">{t("dashboard.kyc.error")}</p>
          <button
            type="button"
            onClick={() => kyc.refetch()}
            disabled={kyc.isFetching}
            className={`mt-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-red-200 bg-white px-4 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
          >
            {kyc.isFetching ? (
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            ) : (
              <RotateCw size={14} />
            )}
            {t("dashboard.kyc.retry")}
          </button>
        </div>
      </div>
    );
  }

  const record = kyc.data.status !== "not_started" ? kyc.data : null;
  const canSubmitNew = kyc.data.status === "not_started" || kyc.data.status === "rejected";
  const visual = record ? STATUS_VISUAL[record.status] : null;

  const renderFiles = (list: KycDocumentField[], labelFor?: (f: KycDocumentField) => string) => (
    <div className={list.length > 1 ? "grid gap-4 sm:grid-cols-2" : ""}>
      {list.map((field) => (
        <FileDrop
          key={field}
          field={field}
          label={labelFor?.(field) ?? t(`dashboard.kyc.document.${field}`)}
          file={form.files[field] ?? null}
          error={fileErrors[field] ?? null}
          onChange={(file) => setFile(field, file)}
        />
      ))}
    </div>
  );

  return (
    <div className="font-geist mx-auto max-w-5xl">
      {/* ---------- En-tête ---------- */}
      <header>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand">
          <ShieldCheck size={22} aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-[2rem] leading-tight text-balance text-ink">{t("dashboard.kyc.title")}</h1>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-2">{t("dashboard.kyc.subtitle")}</p>
      </header>

      {/* ---------- Statut ---------- */}
      {record && visual && (
        <section aria-labelledby="kyc-status-title" className={`mt-8 rounded-[28px] border p-6 sm:p-8 ${visual.box}`}>
          <div className="flex items-start gap-4">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${visual.iconBox}`}>
              <visual.icon size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 id="kyc-status-title" className="font-display text-base font-bold text-ink">
                  {t(`dashboard.kyc.status.${record.status}`)}
                </h2>
                <span className="text-xs text-muted-2 tabular-nums">
                  {t("dashboard.kyc.submittedOn", { date: formatDateTime(record.submitted_at) })}
                </span>
              </div>
              {record.business_name && (
                <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-muted-2">
                  <Briefcase size={13} className="shrink-0" />
                  <span className="font-medium text-ink">{record.business_name}</span>
                  {record.business_type && <span>· {t(`dashboard.kyc.businessType.${record.business_type}`)}</span>}
                </p>
              )}

              {record.status === "pending" && (
                <p className="mt-3 text-sm text-ink/80">{t("dashboard.kyc.pendingHint")}</p>
              )}
              {record.status === "approved" && record.decided_at && (
                <p className="mt-3 text-sm text-ink/80">
                  {t("dashboard.kyc.approvedOn", { date: formatDateTime(record.decided_at) })}
                </p>
              )}
              {record.status === "rejected" && (
                <>
                  {record.decision_reason && (
                    <div className="mt-3 rounded-xl border border-red-100 bg-white/80 px-4 py-3">
                      <p className="text-xs font-semibold text-red-700">{t("dashboard.kyc.rejectionReason")}</p>
                      <p className="mt-1 text-sm text-ink">{record.decision_reason}</p>
                    </div>
                  )}
                  <p className="mt-3 text-sm text-ink/80">{t("dashboard.kyc.rejectedHint")}</p>
                </>
              )}

              {record.documents.length > 0 && (
                <ul aria-label={t("dashboard.kyc.documentsTitle")} className="mt-4 flex flex-wrap gap-2">
                  {record.documents.map((doc) => {
                    const DocIcon = documentIcon(doc);
                    return (
                      <li
                        key={doc}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-ink"
                      >
                        <DocIcon size={14} className="shrink-0 text-muted-2" />
                        {t(`dashboard.kyc.document.${doc}`, { defaultValue: doc })}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Formulaire ---------- */}
      {canSubmitNew && (
        <form
          onSubmit={onSubmit}
          aria-labelledby="kyc-form-title"
          className="mt-8 overflow-hidden rounded-[28px] border border-black/[0.06] bg-white"
        >
          <div className="border-b border-black/[0.06] px-6 py-6 sm:px-10">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div className="min-w-0">
                <h2 id="kyc-form-title" className="font-display text-xl text-ink">
                  {record ? t("dashboard.kyc.resubmitTitle") : t("dashboard.kyc.submitTitle")}
                </h2>
                <p className="mt-0.5 text-sm text-muted">{t("dashboard.kyc.submitDesc")}</p>
              </div>
              <span aria-live="polite" className="shrink-0 pt-1 text-xs font-medium text-muted-2 tabular-nums">
                {t("dashboard.kyc.formProgress", { done: stepsDone, total: 3 })}
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${(stepsDone / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="divide-y divide-black/[0.06]">
            {/* 1. Entreprise */}
            <Step
              n={1}
              id="kyc-step-business"
              title={t("dashboard.kyc.businessStep")}
              description={t("dashboard.kyc.businessStepDesc")}
              done={businessInfoDone}
              aside={<RequirementTag required />}
            >
              <div className="space-y-5">
                <AuthField
                  id="kyc-business-name"
                  name="business_name"
                  type="text"
                  autoComplete="organization"
                  required
                  maxLength={255}
                  label={t("dashboard.kyc.businessNameLabel")}
                  placeholder={t("dashboard.kyc.businessNamePlaceholder")}
                  hint={t("dashboard.kyc.businessNameHint")}
                  value={form.businessName}
                  onChange={(e) => {
                    clearSubmitError();
                    setForm((f) => ({ ...f, businessName: e.target.value }));
                  }}
                />
                <BusinessTypePicker value={form.businessType} onChange={changeBusinessType} />
              </div>
            </Step>

            {/* 2. Identité du représentant */}
            <Step
              n={2}
              id="kyc-step-identity"
              title={t("dashboard.kyc.identityStep")}
              description={t("dashboard.kyc.identityStepDesc")}
              done={identityDone}
              aside={<RequirementTag required />}
            >
              <div className="space-y-5">
                <MethodPicker
                  name="identity-method"
                  label={t("dashboard.kyc.identityMethodLabel")}
                  options={IDENTITY_METHODS}
                  value={form.identityMethod}
                  onChange={changeIdentityMethod}
                  labelFor={(m) => t(`dashboard.kyc.identityMethod.${m}`)}
                />
                {renderFiles(identityFields)}
              </div>
            </Step>

            {/* 3. Documents de l'entreprise — dépend du type choisi */}
            <Step
              n={3}
              id="kyc-step-business-docs"
              title={t("dashboard.kyc.companyDocsStep")}
              description={t("dashboard.kyc.companyDocsStepDesc")}
              done={businessDocsDone}
              aside={<RequirementTag required />}
            >
              {businessField ? (
                <div className="space-y-5">
                  {businessField === "proof_of_address" ? (
                    <FileDrop
                      field="proof_of_address"
                      label={t("dashboard.kyc.proofOfAddress3m")}
                      hint={t("dashboard.kyc.proofOfAddressHint")}
                      file={form.files.proof_of_address ?? null}
                      error={fileErrors.proof_of_address ?? null}
                      onChange={(file) => setFile("proof_of_address", file)}
                    />
                  ) : (
                    renderFiles([businessField], () => t("dashboard.kyc.rccm"))
                  )}
                  {optionalFields.map((field) => (
                    <FileDrop
                      key={field}
                      field={field}
                      label={t("dashboard.kyc.rccm")}
                      hint={t("dashboard.kyc.rccmOptionalHint")}
                      optional
                      file={form.files[field] ?? null}
                      error={fileErrors[field] ?? null}
                      onChange={(file) => setFile(field, file)}
                    />
                  ))}
                </div>
              ) : (
                <p className="flex items-center gap-2 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
                  <Briefcase size={15} className="shrink-0" />
                  {t("dashboard.kyc.chooseBusinessTypeFirst")}
                </p>
              )}
            </Step>

            {/* 4. Documents complémentaires — facultatifs */}
            <Step
              n={4}
              id="kyc-step-extra"
              title={t("dashboard.kyc.extraDocsStep")}
              description={t("dashboard.kyc.extraDocsDesc")}
              aside={<RequirementTag required={false} />}
            >
              <FileDrop
                field="other"
                label={t("dashboard.kyc.document.other")}
                file={form.files.other ?? null}
                error={fileErrors.other ?? null}
                onChange={(file) => setFile("other", file)}
              />
            </Step>
          </div>

          {submitKyc.isError && (
            <p
              role="alert"
              className="mx-6 mb-6 flex items-start gap-2 text-sm leading-snug text-red-700 sm:mx-10"
            >
              <AlertCircle size={17} aria-hidden className="mt-px shrink-0" />
              {submitKyc.error instanceof ApiError ? submitKyc.error.message : t("dashboard.kyc.submitError")}
            </p>
          )}

          <div className="flex flex-col-reverse gap-4 border-t border-black/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-light/50 px-3 py-1.5 text-xs font-medium text-brand">
              <Lock size={13} aria-hidden className="shrink-0" />
              {t("dashboard.kyc.secureNote")}
            </p>
            <button
              type="submit"
              disabled={submitting || !canSubmit}
              aria-busy={submitting || undefined}
              className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <ButtonSpinner label={t("dashboard.kyc.submitting")} size={16} />
              ) : (
                t("dashboard.kyc.submit")
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
