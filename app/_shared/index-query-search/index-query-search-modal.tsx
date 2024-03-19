"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { QuerySearchModalContent } from "~/components/shared/query-search-modal-content";
import { DialogMobile } from "~/components/ui";

export function IndexQuerySearchModal() {
  return (
    <DialogMobile.Root>
      <DialogMobile.Trigger className="flex h-12 w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg bg-button-secondary pl-2 pr-4 font-medium text-placeholder shadow-button-secondary transition-shadow has-[:focus-within,:hover]:shadow-button-secondary-hover sm:hidden">
        <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
        Buscar una propiedad en...
      </DialogMobile.Trigger>
      <QuerySearchModalContent />
    </DialogMobile.Root>
  );
}
