"use client";

import { ShareIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { Button, buttonVariants } from "~/components/ui";
import type { InferRouterOutputs } from "~/lib/trpc/shared";

interface PropertyPageActionsProps {
  property: InferRouterOutputs["properties"]["byId"];
}

export function PropertyPageActions({ property }: PropertyPageActionsProps) {
  const handleShare = () => {
    const url = window.location.href;
    void navigator.clipboard.writeText(url);
    toast.success("Link copiado al portapapeles");
  };
  return (
    <>
      <div className="space-y-2 sm:hidden">
        <a
          className={buttonVariants().base({
            className: "w-full",
          })}
          href={property.permalink}
          rel="noopener"
          target="_blank"
        >
          Ir a la publicacion original
        </a>

        <div className="flex gap-2">
          <Button onClick={handleShare} onlyIcon variant="secondary">
            <ShareIcon />
          </Button>
          <a
            className={buttonVariants().base({
              className: "flex-1",
              variant: "secondary",
            })}
            href={property.seller.permalink}
            rel="noopener"
            target="_blank"
          >
            Ir al perfil del propietario
          </a>
        </div>
      </div>

      <div className="hidden flex-shrink-0 gap-2 sm:flex">
        <Button onClick={handleShare} onlyIcon variant="secondary">
          <ShareIcon />
        </Button>
        <a
          className={buttonVariants().base({
            className: "flex-1",
            variant: "secondary",
          })}
          href={property.seller.permalink}
          rel="noopener"
          target="_blank"
        >
          Ir al perfil del propietario
        </a>
        <a
          className={buttonVariants().base({
            className: "flex-1",
          })}
          href={property.permalink}
          rel="noopener"
          target="_blank"
        >
          Ir a la publicacion original
        </a>
      </div>
    </>
  );
}
