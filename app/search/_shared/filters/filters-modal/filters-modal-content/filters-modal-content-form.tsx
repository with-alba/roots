"use client";

import { useFormikContext } from "formik";
import { match } from "ts-pattern";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { Checkbox, Input, Select } from "~/components/ui";
import type { Attribute } from "~/lib/mappings/attributes";
import { attributes } from "~/lib/mappings/attributes";
import { cn } from "~/lib/utils";
import type { Range } from "~/lib/utils/range";
import type { initialValues } from "../../shared";

// Group attributes by their group
const groupedAttributes = Object.values(attributes).reduce<
  Record<string, Attribute[]>
>((acc, attribute) => {
  // Ignore list attributes that are not the operation. MercadoLibre's API doesn't support filtering by other list attributes
  if (attribute.type === "list" && attribute.id !== "OPERATION") return acc;

  // If the attribute's group is not in the accumulator, add it
  if (!(attribute.group in acc)) {
    acc[attribute.group] = [];
  }

  // Add the attribute to the group
  acc[attribute.group].push(attribute);
  return acc;
}, {});

export function FiltersModalContentForm() {
  // Grab the formik context
  const { values, setFieldValue } = useFormikContext<typeof initialValues>();

  return Object.entries(groupedAttributes).map(([group, attrbutes]) => {
    return (
      <div className="space-y-2" key={group}>
        <p className="font-medium">{group}</p>
        <ul>
          {attrbutes.map((attr) => {
            const id = attr.id as keyof typeof values;
            return (
              <li
                className={cn(
                  "flex min-h-[49px] flex-wrap items-center justify-between gap-2 border-zinc-100 py-2 text-[15px] font-medium [&:not(:last-child)]:border-b",
                  {
                    "flex-col": attr.type === "range",
                  },
                )}
                key={attr.id}
              >
                <label
                  className={cn("text-secondary", {
                    "self-start": attr.type === "range",
                  })}
                  htmlFor={attr.id}
                >
                  {attr.name}
                </label>
                {/* See https://github.com/gvergnaud/ts-pattern for reference. It's a pattern matching library that makes your life easier. */}

                {/* Render the input based on the attribute's type */}
                {match(attr)
                  .with({ type: "boolean" }, () => (
                    <Checkbox
                      checked={values[id] as boolean}
                      id={attr.id}
                      onCheckedChange={(checked) => {
                        void setFieldValue(id, checked);
                      }}
                    />
                  ))
                  .with({ type: "list" }, (content) => {
                    const val = values[id] as string[];

                    return (
                      <Select.Root
                        onValueChange={(value) => {
                          if (val.includes(value)) {
                            void setFieldValue(
                              id,
                              val.filter((v) => v !== value),
                            );
                            return;
                          }
                          void setFieldValue(id, [value]);
                        }}
                        value={val[0]}
                      >
                        <Select.Trigger
                          id={attr.id}
                          placeholder="Seleccionar"
                        />
                        <Select.Content>
                          {content.values.map((value) => {
                            return (
                              <Select.Item key={value.id} value={value.id}>
                                {value.name}
                              </Select.Item>
                            );
                          })}
                        </Select.Content>
                      </Select.Root>
                    );
                  })
                  .with({ type: "number" }, () => {
                    return (
                      <Input
                        className="w-16"
                        id={attr.id}
                        min={0}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (Number(value) < 0) {
                            return;
                          }
                          void setFieldValue(id, value);
                        }}
                        placeholder="0"
                        type="number"
                        value={values[id] as string}
                      />
                    );
                  })
                  .with({ type: "range" }, (data) => {
                    const range = values[id] as Range;

                    return (
                      <div className="w-full">
                        {data.id === "price" ? (
                          <span className="mb-2 flex items-start gap-2 space-y-1 rounded-l-sm border-l-2 border-orange-500 bg-orange-600/[4%] p-2 text-sm font-medium text-orange-950">
                            <ExclamationCircleIcon className="size-4 translate-y-[5px]" />

                            <p>
                              Por el momento, solo aceptamos búsquedas con
                              precios expresados en pesos argentinos.
                            </p>
                          </span>
                        ) : null}
                        <div className="flex w-full flex-wrap items-center gap-2">
                          <Input
                            className="flex-1"
                            id={attr.id}
                            min={0}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (Number(value) < 0) {
                                return;
                              }
                              void setFieldValue(`${id}.from`, value);
                            }}
                            placeholder="Desde"
                            type="number"
                            value={range.from}
                          />
                          <Input
                            className="flex-1"
                            min={0}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (Number(value) < 0) {
                                return;
                              }
                              void setFieldValue(`${id}.to`, value);
                            }}
                            placeholder="Hasta"
                            type="number"
                            value={range.to}
                          />
                        </div>
                      </div>
                    );
                  })
                  .exhaustive()}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
}
