import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

/**
 * Базовая карточка. Если interactive — реагирует на hover.
 */
export function Card({ interactive, className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 shadow-soft",
        interactive &&
          "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-ring",
        className,
      )}
      {...rest}
    />
  );
}
