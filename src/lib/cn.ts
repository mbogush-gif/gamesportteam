import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Слияние классов Tailwind с дедупликацией конфликтов.
 * Используй везде вместо ручной конкатенации строк.
 *
 * cn("px-2 py-1", isActive && "bg-accent text-accent-fg")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
