import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface ImageOption {
  value: string;
  label: string;
  image: string;
}

export function ImageSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  bare,
}: {
  id?: string;
  options: ImageOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  /** Sans bordure ni placeholder : pour être placé dans un OutlinedField. */
  bare?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={
          bare
            ? "relative z-[1] flex h-14 w-full items-center justify-between gap-2 bg-transparent px-3.5 text-start text-[15px] text-ink outline-none disabled:cursor-not-allowed"
            : "flex w-full items-center justify-between gap-2 rounded-md border border-surface-2 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-shadow duration-150 focus:border-ink focus:ring-4 focus:ring-ink/[0.08] disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60"
        }
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {selected ? (
            <>
              <img
                src={selected.image}
                alt=""
                className="aspect-square h-5 w-5 shrink-0 rounded-full bg-white object-cover"
              />
              <span className="truncate">{selected.label}</span>
            </>
          ) : bare ? null : (
            <span className="truncate text-muted-2">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          className="absolute top-full z-30 mt-1.5 max-h-64 w-full overflow-y-auto rounded-lg border border-surface-2 bg-white py-1.5 shadow-pop"
        >
          {options.length === 0 && (
            <p className="px-3.5 py-2.5 text-sm text-muted">Aucune option</p>
          )}
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={o.value === value}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-surface ${
                o.value === value ? "bg-brand-light/50 font-medium text-ink" : "text-ink"
              }`}
            >
              <img
                src={o.image}
                alt=""
                className="aspect-square h-5 w-5 shrink-0 rounded-full bg-white object-cover"
              />
              <span className="min-w-0 flex-1 truncate">{o.label}</span>
              {o.value === value && <Check size={15} className="shrink-0 text-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
