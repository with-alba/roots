import { z } from "zod";

export const range = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export type Range = z.infer<typeof range>;

/**
 * Checks whether the value is a range.
 * @param value - The value to check.
 * @returns - Whether the value is a range.
 */
export const isRange = (value: unknown): value is Range => {
  if (typeof value !== "object" || !value) return false;

  return "from" in value && "to" in value;
};

/**
 * Parses a range to a human readable label.
 */
export function parseRangeToLabel({
  from,
  to,
  unit,
}: Range & {
  unit: string | undefined;
}) {
  const _unit = unit || "";
  if (from && to) {
    return `${from}${_unit} a ${to}${_unit}`;
  }

  if (from) {
    return `Desde ${from}${_unit}`;
  }

  if (to) {
    return `Hasta ${to}${_unit}`;
  }

  return "";
}
