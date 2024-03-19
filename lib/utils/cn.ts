import type { ClassValue } from "clsx";
import { default as clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge the classNames that overlap each other
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
