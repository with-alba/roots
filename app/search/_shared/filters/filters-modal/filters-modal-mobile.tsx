import { useFormikContext } from "formik";
import { Button, DialogMobile, ScrollArea } from "~/components/ui";
import { FiltersModalContent } from "./filters-modal-content";

export function FiltersModalMobile() {
  const { handleSubmit } = useFormikContext();
  return (
    <DialogMobile.Content>
      <ScrollArea.Root className="flex flex-col">
        <ScrollArea.Viewport>
          <div className="space-y-3 px-4 pb-4">
            <FiltersModalContent />
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
      <div className="flex w-full justify-end gap-2 border-t border-zinc-100 bg-zinc-50 px-4 py-3">
        <DialogMobile.Close asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogMobile.Close>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
        >
          Aplicar
        </Button>
      </div>
    </DialogMobile.Content>
  );
}
