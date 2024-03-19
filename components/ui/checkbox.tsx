"use client";

import { tv } from "tailwind-variants";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import type { ElementRef } from "react";
import { forwardRef } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

const checkboxVariants = tv({
  base: "shadow-checkbox size-4 rounded bg-button-secondary text-white outline-none ring-blue-600/10 transition-all hover:bg-zinc-50 focus-visible:ring-4 data-[state=checked]:bg-blue-500 data-[state=checked]:shadow-[0_0_0_1px_theme(colors.blue.500)] data-[state=checked]:hover:bg-blue-600 data-[state=checked]:hover:shadow-[0_0_0_1px_theme(colors.blue.600)]",
});

export type CheckboxProps = RadixCheckbox.CheckboxProps;

export const Checkbox = forwardRef<
  ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixCheckbox.Root
      className={checkboxVariants({ className })}
      ref={ref}
      {...rest}
    >
      <RadixCheckbox.Indicator asChild className="shadow-md">
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});

Checkbox.displayName = "Checkbox";
