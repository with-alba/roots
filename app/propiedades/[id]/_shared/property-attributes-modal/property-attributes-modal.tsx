import {
  Button,
  Dialog,
  DialogDesktop,
  DialogMobile,
  ScrollArea,
} from "~/components/ui";
import type { Property } from "~/types/property";
import { PropertyAttributesModalContent } from "./property-attributes-modal-content";

interface PropertyAttributesModalProps {
  attributes: Property["attributes"];
}

export function PropertyAttributesModal({
  attributes,
}: PropertyAttributesModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          className="w-full items-center justify-center"
          variant="secondary"
        >
          Ver todas las características
        </Button>
      </Dialog.Trigger>
      <DialogDesktop.Content className="w-full max-w-xl">
        <DialogDesktop.Title>
          Características de la propiedad
        </DialogDesktop.Title>
        <ScrollArea.Root className="flex flex-col">
          <ScrollArea.Viewport>
            <div className="space-y-3 p-4">
              <PropertyAttributesModalContent attributes={attributes} />
            </div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </DialogDesktop.Content>
      <DialogMobile.Content>
        <div className="space-y-3 px-4 pb-4">
          <PropertyAttributesModalContent attributes={attributes} />
        </div>
      </DialogMobile.Content>
    </Dialog.Root>
  );
}
