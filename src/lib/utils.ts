import { clsx, type ClassValue } from "clsx";

export function cn(...args: ClassValue[]) {
  return clsx(args);
}

export function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}
