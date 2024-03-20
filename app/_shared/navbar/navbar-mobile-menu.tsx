import { Bars3Icon } from "@heroicons/react/20/solid";
import { Button, DialogMobile } from "~/components/ui";
import { BrandButton } from "../brand-button";

export function NavbarMobileMenu() {
  return (
    <DialogMobile.Root>
      <DialogMobile.Trigger asChild>
        <Button className="min-[960px]:hidden" onlyIcon variant="secondary">
          <Bars3Icon />
        </Button>
      </DialogMobile.Trigger>
      <DialogMobile.Content className="px-4 pb-4" responsiveAt={960}>
        <BrandButton className="w-full justify-center" />
        <a className="mt-4 py-2 hover:underline" href="/">
          Ver el código
        </a>
        <a className="py-2 hover:underline" href="/">
          Contribuir
        </a>
      </DialogMobile.Content>
    </DialogMobile.Root>
  );
}
