"use client";

import { FaceFrownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { buttonVariants } from "~/components/ui";

export default function Error() {
  return (
    <div className="h-full w-full p-1">
      <div className="grid h-full w-full place-content-center space-y-4 rounded-b-[10px] bg-zinc-50">
        <FaceFrownIcon className="mx-auto size-14 text-placeholder" />
        <p className="max-w-sm text-pretty text-center font-medium text-secondary">
          La propiedad que buscas no existe.
        </p>
        <Link
          className={buttonVariants().base({
            variant: "secondary",
            className: "mx-auto max-w-fit",
          })}
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
