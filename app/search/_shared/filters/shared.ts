import { match } from "ts-pattern";
import { attributes } from "~/lib/mappings/attributes";
import type { Range } from "~/lib/utils/range";
import { isRange, parseRangeToLabel } from "~/lib/utils/range";
import type { PropertiesFilters } from "~/server/api/routers/properties/schema";

// Get the attributes that are filterable
export type FilterableAttributes = Omit<
  PropertiesFilters,
  "item_location" | "offset"
>;

// Get the initial values for the filters
export const initialValues = Object.values(
  attributes,
).reduce<FilterableAttributes>((acc, attr) => {
  if (attr.id === "item_location" || attr.id === "offset") return acc;

  const id = attr.id as keyof FilterableAttributes;
  match(attr)
    .with({ type: "boolean" }, () => {
      //@ts-expect-error -- Typescript doesn't understand the exhaustive check
      acc[id] = false;
    })
    .with({ type: "list" }, () => {
      //@ts-expect-error -- Typescript doesn't understand the exhaustive check
      acc[id] = [];
    })
    .with({ type: "range" }, () => {
      //@ts-expect-error -- Typescript doesn't understand the exhaustive check
      acc[id] = { from: "", to: "" };
    })
    .with({ type: "number" }, () => {
      //@ts-expect-error -- Typescript doesn't understand the exhaustive check
      acc[id] = "";
    })
    .exhaustive();

  return acc;
}, {});

/**
 *
 * @param key -- The key of the attribute
 * @param value -- The value of the attribute
 * @returns Filters as human readable labels
 */
export const parseFilterValueToLabel = (
  key: string,
  value: string | number | string[] | Range | boolean,
) => {
  // Get the attribute
  const attr = attributes[key];

  // If the value is an array, get the name of the first value
  if (Array.isArray(value)) {
    const valueName = attr.values?.find((item) => item.id === value[0])?.name;
    return {
      attr,
      label: valueName,
    };
  }

  // If the value is a range, parse it to a label
  if (isRange(value)) {
    return {
      attr,
      label: parseRangeToLabel({
        ...value,
        // Need to check the type here because the type of the range is not the same as the type of the attribute
        unit: attr.type === "range" ? attr.unit?.name : "",
      }),
    };
  }

  // If the value is a boolean, return "Sí" or "No"
  if (typeof value === "boolean") {
    return {
      attr,
      label: value ? "Sí" : "No",
    };
  }

  // Otherwise return the value
  return {
    attr,
    label: value,
  };
};

/**
 * @param filters - The filters to parse
 * @returns Valid form values
 */
export const parseFiltersValues = (filters: FilterableAttributes) => {
  return Object.entries(filters).reduce<Partial<FilterableAttributes>>(
    (acc, [key, value]) => {
      // Check if the value is a range
      const hasRange = isRange(value);
      // Check if it's a range and whether one of its fields is empty
      const isRangeEmpty = hasRange && !value.from && !value.to;
      // Check if it's a range and whether its value is invalid
      const isRangeInvalidValue =
        hasRange && Boolean(value.to) && value.from! > value.to!;

      const isRangeInvalid = isRangeEmpty || isRangeInvalidValue;
      const isArrayInvalid = Array.isArray(value) && !value.length;
      const isValueInvalid = !value;

      const isInvalid = isRangeInvalid || isArrayInvalid || isValueInvalid;

      // If the value is invalid, return undefined
      if (isInvalid)
        return {
          ...acc,
          [key]: undefined,
        };

      // Otherwise, just return the value
      return {
        ...acc,
        [key]: value,
      };
    },
    {},
  );
};
