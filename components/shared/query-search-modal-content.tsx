import { Icon, Trigger, Value } from "@radix-ui/react-select";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { usePlacesAutocomplete } from "~/lib/hooks";
import { attributes } from "~/lib/mappings/attributes";
import { cn } from "~/lib/utils";
import { DialogMobile, ScrollArea, Select, Spinner } from "../ui";

export function QuerySearchModalContent() {
  const [operation, setOperation] = useState<string>("242073");
  const { data, handleQueryChange, isLoading, handleQuerySelect } =
    usePlacesAutocomplete();

  return (
    <DialogMobile.Content className="flex h-[50dvh] flex-col bg-zinc-50 px-4 pb-4">
      <div className="relative flex h-[44px] flex-col overflow-hidden rounded-lg bg-button-secondary shadow-button-secondary transition-all has-[input:focus]:h-full">
        <input
          className="h-[44px] w-full flex-shrink-0 px-3 font-medium outline-none placeholder:text-placeholder focus:border-b"
          onChange={(e) => {
            handleQueryChange(e.target.value);
          }}
          placeholder="Buscar una propiedad en..."
        />
        <span
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 transition-opacity",
            { "opacity-100": isLoading },
          )}
        >
          <Spinner />
        </span>

        <ScrollArea.Root>
          <ScrollArea.Viewport className="flex h-full flex-col">
            {data.map((prediction) => {
              return (
                <DialogMobile.Close asChild key={prediction.place_id}>
                  <button
                    className="w-full border-zinc-100 p-2.5 text-left text-sm font-medium [&:not(:last-child)]:border-b"
                    onClick={() => {
                      void handleQuerySelect({
                        placeId: prediction.place_id,
                        operation,
                      });
                    }}
                    type="button"
                  >
                    {prediction.description}
                  </button>
                </DialogMobile.Close>
              );
            })}
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </div>
      <div className="mt-3 flex h-[44px] flex-shrink-0 items-center justify-between rounded-lg bg-button-secondary px-3 shadow-button-secondary">
        <label className="font-medium text-secondary" htmlFor="operation">
          Operación
        </label>
        <Select.Root onValueChange={setOperation} value={operation}>
          <Trigger
            className="flex items-center gap-1 font-medium"
            id="operation"
          >
            <Value />
            <Icon asChild>
              <ChevronDownIcon className="size-5" />
            </Icon>
          </Trigger>
          <Select.Content>
            {attributes.OPERATION.values?.map((value) => {
              return (
                <Select.Item key={value.id} value={value.id}>
                  {value.name}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>
      </div>
    </DialogMobile.Content>
  );
}
