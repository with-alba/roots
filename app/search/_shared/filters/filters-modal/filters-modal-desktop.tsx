import { useFormikContext } from "formik";
import { Button, DialogDesktop, ScrollArea } from "~/components/ui";
import { FiltersModalContent } from "./filters-modal-content";

export function FiltersModalDesktop() {
  const { handleSubmit } = useFormikContext();
  return (
    <DialogDesktop.Content className="w-full max-w-xl">
      <DialogDesktop.Title>Filtros</DialogDesktop.Title>
      <ScrollArea.Root className="flex flex-col">
        <ScrollArea.Viewport>
          <div className="space-y-3 p-4">
            <FiltersModalContent />
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>

      <div className="flex w-full justify-end gap-2 border-t border-zinc-100 bg-zinc-50 px-4 py-3">
        <DialogDesktop.Close asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogDesktop.Close>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
        >
          Aplicar
        </Button>
      </div>
    </DialogDesktop.Content>
  );
}
