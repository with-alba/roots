import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import type { InferRouterOutputs } from "~/lib/trpc/shared";

interface PropertyPageExternalMarketplaceProps {
  property: InferRouterOutputs["properties"]["byId"];
}

export function PropertyPageExternalMarketplace({
  property,
}: PropertyPageExternalMarketplaceProps) {
  return (
    <a
      className="flex h-7 w-full items-center justify-between rounded-lg border border-black/[7%] bg-yellow-50 px-2 text-[13px] font-medium text-yellow-600 shadow-[inset_0px_-1px_1px_rgba(49,_50,_0,_0.07)] hover:underline min-[420px]:text-sm"
      href={property.permalink}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex items-center gap-1">
        <InformationCircleIcon className="size-[13px] min-[420px]:size-4" />
        Publicado originalmente en{" "}
        <div className="ml-0.5 flex items-center gap-0.5">
          <img
            alt="MercadoLibre logo"
            className="inline-block size-4"
            src="/MELI.svg"
          />
          MercadoLibre
        </div>
      </div>
      <ArrowTopRightOnSquareIcon className="size-[13px] min-[420px]:size-4" />
    </a>
  );
}
