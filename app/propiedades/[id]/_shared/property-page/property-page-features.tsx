import type { InferRouterOutputs } from "~/lib/trpc/shared";
import { PropertyAttributesModal } from "../property-attributes-modal/property-attributes-modal";

interface PropertyPageFeaturesProps {
  property: InferRouterOutputs["properties"]["byId"];
}

export function PropertyPageFeatures({ property }: PropertyPageFeaturesProps) {
  const slicedAttributes = property.attributes.slice(0, 5);
  return (
    <div className="space-y-2">
      <p className="font-medium">Caracteristicas</p>
      <div className="rounded-md bg-zinc-50">
        {slicedAttributes.map((attr) => {
          return (
            <div
              className="flex w-full justify-between border-zinc-600/5 p-2 text-sm font-medium [&:not(:last-child)]:border-b"
              key={attr.id}
            >
              <p className="text-secondary">{attr.name}</p>
              <p>{attr.value}</p>
            </div>
          );
        })}
      </div>
      <PropertyAttributesModal attributes={property.attributes} />
    </div>
  );
}
