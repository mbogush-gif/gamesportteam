import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Стандартный контейнер с центрированием и максимальной шириной.
 */
export function Container({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container", className)} {...rest} />;
}
