"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { QuerySearchModalContent } from "~/components/shared/query-search-modal-content";
import { DialogMobile } from "~/components/ui";

export function QuerySearchModal() {
  return (
    <DialogMobile.Root>
      <DialogMobile.Trigger className="absolute left-1/2 flex h-[38px] -translate-x-1/2 items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg bg-button-secondary pl-2 pr-4 text-sm font-medium text-placeholder shadow-button-secondary transition-shadow has-[:focus-within,:hover]:shadow-button-secondary-hover sm:hidden">
        <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
        Buscar una propiedad en...
      </DialogMobile.Trigger>
      <QuerySearchModalContent />
    </DialogMobile.Root>
  );
}
