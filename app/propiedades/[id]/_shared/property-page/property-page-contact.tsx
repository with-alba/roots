import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "~/components/ui";
import type { InferRouterOutputs } from "~/lib/trpc/shared";

interface PropertyPageContactProps {
  property: InferRouterOutputs["properties"]["byId"];
}

export function PropertyPageContact({ property }: PropertyPageContactProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="size-11 rounded-md bg-zinc-100" />
        <div>
          <p className="text-[13px] text-secondary">Publicado por</p>
          <p className="text-sm font-medium">{property.seller.nickname}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button disabled onlyIcon variant="secondary">
          <PhoneIcon />
        </Button>
        <Button disabled onlyIcon variant="secondary">
          <EnvelopeIcon />
        </Button>
      </div>
    </div>
  );
}
