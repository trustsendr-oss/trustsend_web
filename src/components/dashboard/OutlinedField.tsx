import type { ReactNode } from "react";

/** Classes à appliquer au contrôle (input, select, bouton) placé dans un OutlinedField. */
export const outlinedControl =
  "peer relative z-[1] h-14 w-full appearance-none bg-transparent px-3.5 text-base text-ink outline-none placeholder:text-muted-2 placeholder:opacity-0 focus:placeholder:opacity-100 disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none";

/**
 * Champ « outlined » façon Material UI : label flottant qui remonte dans une encoche de la
 * bordure au focus ou dès qu'une valeur est saisie. Le contrôle est passé en enfant.
 *
 * L'état « focus » vient de :focus-within (CSS) plutôt que d'un état React : une option de
 * liste démontée après sélection ne déclenche pas toujours de blur, ce qui figeait le style.
 */
export function OutlinedField({
  label,
  htmlFor,
  filled,
  disabled,
  error,
  helper,
  start,
  end,
  children,
}: {
  label: string;
  htmlFor: string;
  filled: boolean;
  disabled?: boolean;
  error?: boolean;
  helper?: ReactNode;
  start?: ReactNode;
  end?: ReactNode;
  children: ReactNode;
}) {
  const shrink = filled || !!start;

  const labelPos = shrink
    ? "top-0 -translate-y-1/2 scale-75"
    : "top-1/2 -translate-y-1/2 group-focus-within:top-0 group-focus-within:scale-75";
  const labelTone = error ? "text-red-600" : "text-muted group-focus-within:text-brand";
  const border = error
    ? "border border-red-600 group-focus-within:border-2"
    : "border border-black/25 group-hover:border-ink group-focus-within:border-2 group-focus-within:border-brand";
  const legendWidth = shrink ? "max-w-full" : "max-w-[0.01px] group-focus-within:max-w-full";

  return (
    <div className={disabled ? "opacity-55" : ""}>
      <div className="group relative flex items-center">
        {start && <span className="relative z-[1] shrink-0 ps-3.5 text-muted">{start}</span>}
        <div className="relative min-w-0 flex-1">{children}</div>
        {end && <span className="relative z-[1] shrink-0 pe-3.5 text-sm font-medium text-muted-2">{end}</span>}

        <label
          htmlFor={htmlFor}
          className={`pointer-events-none absolute start-3.5 z-[2] max-w-[calc(100%-2rem)] origin-left truncate text-base transition-all duration-200 ease-out ${labelPos} ${labelTone}`}
        >
          {label}
        </label>

        <fieldset
          aria-hidden
          className={`pointer-events-none absolute inset-0 -top-[5px] m-0 min-w-0 rounded-lg px-2 transition-colors ${border}`}
        >
          <legend
            className={`invisible float-none h-[11px] whitespace-nowrap p-0 text-xs transition-[max-width] duration-100 ${legendWidth}`}
          >
            <span className="px-[5px]">{label}</span>
          </legend>
        </fieldset>
      </div>
      {helper && <div className="mx-3.5 mt-1 space-y-0.5 text-xs text-muted">{helper}</div>}
    </div>
  );
}
