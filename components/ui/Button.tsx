import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  tone?: "brand" | "neutral" | "light";
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "circle" | "square";
  /** When used like a toggle, this styles the pressed state and sets aria-pressed */
  selected?: boolean;
};

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** Fixed class maps (no string interpolation = Tailwind will generate everything) */
const toneMap = {
  brand: {
    solid:
      "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600",
    outline:
      "bg-transparent border border-brand-500 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-600",
    ghost:
      "bg-transparent border border-brand-500 text-brand-700/80 hover:bg-brand-500/10 hover:text-brand-700 focus-visible:ring-brand-600 dark:text-brand-300/80 dark:hover:bg-brand-500/10",
    selected:
      "border border-brand-600 bg-brand-600 text-white hover:bg-brand-700",
  },
  neutral: {
    solid:
      "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-brand-600",
    outline:
      "bg-transparent border border-secondary-300 text-secondary-700 hover:bg-secondary-50 focus-visible:ring-brand-600",
    ghost:
      "bg-transparent border border-secondary-400 text-secondary-700/80 hover:bg-secondary-50 focus-visible:ring-brand-600",
    selected:
      "border border-secondary-600 bg-secondary-600 text-white hover:bg-secondary-700",
  },
  light: {
    solid:
      "bg-white/90 text-foreground hover:bg-white shadow focus-visible:ring-brand-600",
    outline:
      "bg-transparent border border-white/70 text-white hover:bg-white/10 focus-visible:ring-brand-600",
    ghost:
      "bg-transparent border border-white/50 text-white/80 hover:bg-white/10 focus-visible:ring-brand-600",
    selected: "border bg-white text-foreground",
  },
} as const;

const sizeMap = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
} as const;

const shapeMap = {
  pill: "rounded-full",
  circle: "rounded-full aspect-square p-2", // works with size paddings; tweak if you prefer fixed h/w
  square: "rounded-xl",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "outline",
    tone = "neutral",
    size = "md",
    shape = "square",
    selected = false,
    className,
    type = "button",
    children,
    ...props
  },
  ref
) {
  // Base includes ring offset using your CSS var-backed color "background"
  const base =
    "inline-flex items-center justify-center font-medium transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:opacity-50 disabled:pointer-events-none " +
    "border border-transparent";

  const variantClasses = selected ? toneMap[tone].selected : toneMap[tone][variant];

  const styles = cn(base, sizeMap[size], shapeMap[shape], variantClasses, className);

  return (
    <button
      ref={ref}
      type={type}
      className={styles}
      aria-pressed={selected || undefined}
      {...props}
    >
      {children}
    </button>
  );
});
