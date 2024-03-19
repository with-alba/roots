"use client";

import { Badge, Button, Dialog } from "~/components/ui";
import type { SearchPageSearchParams } from "../../context";
import { parseFilterValueToLabel } from "../shared";

interface FiltersModalTriggerProps {
  filters: Omit<SearchPageSearchParams, "page" | "view" | "item_location">;
}
export function FiltersModalTrigger({ filters }: FiltersModalTriggerProps) {
  const slicedFilters = Object.entries(filters).slice(0, 3);
  const hasMoreFilters = Object.entries(filters).length > 3;

  return (
    <div className="flex items-center gap-2">
      <Dialog.Trigger>
        <Button className="relative" variant="secondary">
          Filtros
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-content-center rounded-full bg-zinc-800 p-1 text-[10px] font-bold leading-none text-white">
            {Object.keys(filters).length}
          </span>
        </Button>
      </Dialog.Trigger>
      <div className="hidden gap-2 lg:flex">
        {slicedFilters.map(([key, value]) => {
          const { attr, label } = parseFilterValueToLabel(key, value);

          return (
            <Badge className="font-medium" key={label}>
              {attr.name}
              <span className="text-primary">{label}</span>
            </Badge>
          );
        })}
        {hasMoreFilters ? (
          <Badge className="font-medium">
            +{Object.keys(filters).length - 3}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
