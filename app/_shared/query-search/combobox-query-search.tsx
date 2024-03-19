"use client";

import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Combobox } from "~/components/ui";
import { usePlacesAutocomplete } from "~/lib/hooks";

interface QuerySearchComboboxBag {
  operation: string;
  setOperation: (value: string) => void;
}

interface QuerySearchComboboxProps {
  children: (bag: QuerySearchComboboxBag) => React.ReactNode;
}

export function QuerySearchCombobox({ children }: QuerySearchComboboxProps) {
  const [operation, setOperation] = useState<string>("242073");
  const [inputValue, setInputValue] = useState("");

  const { data, handleQueryChange, handleQuerySelect } =
    usePlacesAutocomplete();

  const predictions = data.map((prediction) => {
    return {
      id: prediction.place_id,
      text: prediction.description,
    };
  });

  return (
    <Combobox.Root
      inputValue={inputValue}
      onInputValueChange={(value) => {
        setInputValue(value);
        handleQueryChange(value);
      }}
      onSelect={(placeId) => {
        setInputValue("");
        void handleQuerySelect({ placeId, operation });
      }}
    >
      <Combobox.Anchor className="max-sm:hidden">
        {children({ operation, setOperation })}
      </Combobox.Anchor>

      <Combobox.Content>
        {predictions.map((prediction) => {
          return (
            <Combobox.Item key={prediction.id} value={prediction.id}>
              {prediction.text}
              <ArrowLongRightIcon className="size-5 flex-shrink-0 text-placeholder transition-colors group-hover:text-primary group-data-[active-item]:text-primary" />
            </Combobox.Item>
          );
        })}
      </Combobox.Content>
    </Combobox.Root>
  );
}
