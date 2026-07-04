import { clsx } from "clsx";

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("flex items-baseline gap-2 text-label uppercase text-fg-64", className)}>
      <span className="text-fg-32">{index} /</span>
      {children}
    </p>
  );
}
