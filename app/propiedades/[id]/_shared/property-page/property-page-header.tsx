import { InformationCircleIcon } from "@heroicons/react/16/solid";
import type { InferRouterOutputs } from "~/lib/trpc/shared";
import { PropertyDescription } from "../property-description";

interface PropertyPageHeaderProps {
  property: InferRouterOutputs["properties"]["byId"];
}

export function PropertyPageHeader({ property }: PropertyPageHeaderProps) {
  const expensas = Number(
    property.attributes
      .find((attr) => attr.id === "MAINTENANCE_FEE")
      ?.value.split(" ")[0],
  );

  return (
    <div className="space-y-2">
      <p className="text-sm text-secondary sm:text-[15px]">
        {property.propertyType} en {property.location.address}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-2xl font-medium">
          {property.price.currency} {property.price.amount.toLocaleString()}
        </p>
        {expensas ? (
          <span className="flex h-[25px] items-center justify-center gap-1.5 rounded-md border border-black/[7%] bg-zinc-100 px-1.5 text-[13px] font-medium">
            <span>
              <span className="font-normal text-zinc-400">Exp</span> ARS{" "}
              {expensas.toLocaleString()} / mes
            </span>
            <InformationCircleIcon className="size-[13px] text-zinc-400" />
          </span>
        ) : null}
      </div>
      <PropertyDescription description={property.description} />
    </div>
  );
}
