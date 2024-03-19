"use client";

import { CheckIcon } from "@heroicons/react/16/solid";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import * as RadixSelect from "@radix-ui/react-select";
import type { ElementRef } from "react";
import { forwardRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

/* ------- SelectRoot ------- */
type SelectRootProps = RadixSelect.SelectProps;
const SelectRoot = RadixSelect.Root;

/* ------- SelectTrigger ------- */
const selectTriggerVariants = tv({
  variants: {
    size: {
      md: {
        trigger: "h-[32px] px-2",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
  slots: {
    trigger:
      "bg-form-element [:is(:focus,[data-state=open])]:bg-form-element-active hover:bg-form-element-hover data-placeholder:text-placeholder inline-flex items-center gap-4 rounded-md pt-px font-medium outline-none transition-all sm:text-[15px]",
    chevron: "text-placeholder ml-auto size-4",
  },
});

const { trigger, chevron } = selectTriggerVariants();

type SelectTriggerProps = Omit<RadixSelect.SelectTriggerProps, "children"> &
  VariantProps<typeof selectTriggerVariants> & {
    placeholder?: string;
  };
const SelectTrigger = forwardRef<
  ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>((props, ref) => {
  const { className, size, placeholder, ...rest } = props;

  return (
    <RadixSelect.Trigger
      className={trigger({ className, size })}
      ref={ref}
      {...rest}
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon asChild className={chevron()}>
        <ChevronUpDownIcon />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
});

SelectTrigger.displayName = "SelectTrigger";

/* ------- SelectContent ------- */
const selectContentVariants = tv({
  base: "max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md bg-overlay shadow-lg backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
});
type SelectContentProps = RadixSelect.SelectContentProps;
const SelectContent = forwardRef<
  ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={selectContentVariants({ className })}
        ref={ref}
        {...rest}
      >
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});

SelectContent.displayName = "SelectContent";

/* ------- SelectItem ------- */
const selectItemVariants = tv({
  slots: {
    item: "flex cursor-pointer items-center gap-2 p-2 text-[15px] font-medium text-white outline-none transition-all hover:bg-white/10",
    indicator: "ml-auto size-4 text-white",
  },
});
const { item, indicator } = selectItemVariants();
type SelectItemProps = RadixSelect.SelectItemProps;
const SelectItem = forwardRef<
  ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <RadixSelect.Item className={item({ className })} ref={ref} {...rest}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator asChild className={indicator()}>
        <CheckIcon className={indicator()} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = "SelectItem";

/* ------- Exports ------- */

export {
  SelectRoot as Root,
  SelectTrigger as Trigger,
  SelectContent as Content,
  SelectItem as Item,
};

export type {
  SelectRootProps as RootProps,
  SelectTriggerProps as TriggerProps,
  SelectContentProps as ContentProps,
  SelectItemProps as ItemProps,
};
