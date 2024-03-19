"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as Popover from "@radix-ui/react-popover";
import {
  ComboboxProvider as AriaComboboxProvider,
  Combobox,
  ComboboxItem as AriaComboboxItem,
  ComboboxList,
} from "@ariakit/react";
import type { ElementRef, ComponentPropsWithoutRef } from "react";
import { forwardRef, useRef } from "react";
import { cn, createContext } from "~/lib/utils";

interface ComboboxContextValue {
  comboboxRef: React.RefObject<HTMLInputElement>;
  listboxRef: React.RefObject<HTMLDivElement>;
  inputValue: string | undefined;
  setInputValue: (value: string) => void;
}

const [ComboboxProvider, useComboboxProvider] =
  createContext<ComboboxContextValue>("ComboboxProvider");

/* ------- ComboboxRoot ------- */

interface ComboboxRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;

  inputValue?: string;
  onInputValueChange?: (inputValue: string) => void;
  defaultInputValue?: string;

  onSelect?: (value: string) => void;

  children: React.ReactNode;
}

function ComboboxRoot(props: ComboboxRootProps) {
  const {
    open,
    onOpenChange,
    defaultOpen,
    inputValue: inputValueProp,
    defaultInputValue,
    onInputValueChange,
    onSelect,
    children,
  } = props;

  const comboboxRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const [inputValue, setInputValue] = useControllableState({
    prop: inputValueProp,
    defaultProp: defaultInputValue,
    onChange: onInputValueChange,
  });

  const isComboboxOpen = isOpen && Boolean(inputValue);

  return (
    <ComboboxProvider
      value={{
        comboboxRef,
        listboxRef,
        inputValue,
        setInputValue,
      }}
    >
      <Popover.Root onOpenChange={setIsOpen} open={isComboboxOpen}>
        <AriaComboboxProvider
          open={isComboboxOpen}
          setOpen={setIsOpen}
          setSelectedValue={(val) => {
            setInputValue("");
            onSelect?.(val.toString());
          }}
        >
          {children}
        </AriaComboboxProvider>
      </Popover.Root>
    </ComboboxProvider>
  );
}

/* ------- ComboboxAnchor ------- */
type ComboboxAnchorProps = Popover.PopperAnchorProps;
const ComboboxAnchor = forwardRef<
  ElementRef<typeof Popover.Anchor>,
  ComboboxAnchorProps
>((props, ref) => {
  return <Popover.Anchor asChild ref={ref} {...props} />;
});

ComboboxAnchor.displayName = "ComboboxAnchor";

/* ------- ComboboxField ------- */

type ComboboxFieldProps = ComponentPropsWithoutRef<typeof Combobox>;
const ComboboxField = forwardRef<HTMLInputElement, ComboboxFieldProps>(
  (props, forwardedRef) => {
    const { inputValue, setInputValue, comboboxRef } = useComboboxProvider();
    const ref = useComposedRefs(comboboxRef, forwardedRef);

    return (
      <Combobox
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        ref={ref}
        value={inputValue}
        {...props}
      />
    );
  },
);

ComboboxField.displayName = "ComboboxField";

/* ------- ComboboxContent ------- */
type ComboboxContentProps = Popover.PopoverContentProps;
const ComboboxContent = forwardRef<
  ElementRef<typeof Popover.Content>,
  ComboboxContentProps
>((props, ref) => {
  const { className, children, ...rest } = props;
  const { comboboxRef, listboxRef } = useComboboxProvider();

  return (
    <Popover.Portal>
      <Popover.Content
        asChild
        className={cn(
          "w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-md bg-white shadow-[0px_3px_12px_rgba(15,_23,_42,_0.12),_0px_0px_0px_1px_rgba(15,_23,_42,_0.06)]",
          className,
        )}
        onInteractOutside={(event) => {
          const target = event.target as Element | null;
          const isCombobox = target === comboboxRef.current;
          const inListbox = target && listboxRef.current?.contains(target);
          if (isCombobox || inListbox) {
            event.preventDefault();
          }
        }}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        ref={ref}
        sideOffset={4}
        {...rest}
      >
        <ComboboxList ref={listboxRef}>{children}</ComboboxList>
      </Popover.Content>
    </Popover.Portal>
  );
});

ComboboxContent.displayName = "ComboboxContent";

/* ------- ComboboxItem ------- */
type ComboboxItemProps = ComponentPropsWithoutRef<typeof AriaComboboxItem>;
const ComboboxItem = forwardRef<
  ElementRef<typeof AriaComboboxItem>,
  ComboboxItemProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AriaComboboxItem
      className={cn(
        "group flex cursor-pointer items-center justify-between border-zinc-100 p-2 text-sm transition-colors hover:bg-zinc-50 data-[active-item]:bg-zinc-50 [&:not(:last-child)]:border-b",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

ComboboxItem.displayName = "ComboboxItem";

export {
  ComboboxRoot as Root,
  ComboboxAnchor as Anchor,
  ComboboxField as Field,
  ComboboxContent as Content,
  ComboboxItem as Item,
};

export type {
  ComboboxRootProps as RootProps,
  ComboboxAnchorProps as AnchorProps,
  ComboboxFieldProps as FieldProps,
  ComboboxContentProps as ContentProps,
  ComboboxItemProps as ItemProps,
};
