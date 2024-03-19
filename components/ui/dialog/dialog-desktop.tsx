"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from "~/lib/hooks";
import { Button } from "..";

/* ---------- DialogDesktopRoot ---------- */
type DialogDesktopRootProps = RadixDialog.DialogProps;
const DialogDesktopRoot = RadixDialog.Root;

/* ---------- DialogDesktopTrigger ---------- */
type DialogDesktopTriggerProps = RadixDialog.DialogTriggerProps;
const DialogDesktopTrigger = RadixDialog.Trigger;

/* ---------- DialogDesktopContent ---------- */
const dialogDesktopContentVariants = tv({
  slots: {
    overlay:
      "fixed inset-0 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    content:
      "fixed left-1/2 top-1/2 flex max-h-[calc(100%_-_64px)] max-w-[calc(100%_-_64px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_3px_10px_rgba(24,_24,_27,_0.04),_0px_0px_0px_1px_rgba(24,_24,_27,_0.03)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  },
});

const { overlay, content } = dialogDesktopContentVariants();

type DialogDesktopContentProps = RadixDialog.DialogContentProps;
const DialogDesktopContent = forwardRef<
  HTMLDivElement,
  DialogDesktopContentProps
>((props, ref) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) return null;

  const { className, children, ...rest } = props;
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={overlay()} />
      <RadixDialog.Content
        className={content({ className })}
        ref={ref}
        {...rest}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

DialogDesktopContent.displayName = "DialogDesktopContent";

/* ---------- DialogDesktopTitle ---------- */
const dialogDesktopTitleVariants = tv({
  slots: {
    title: "text-base font-medium text-zinc-800",
    base: "flex items-center justify-between border-b border-zinc-200 p-4",
  },
});

const { title, base } = dialogDesktopTitleVariants();

type DialogDesktopTitleProps = RadixDialog.DialogTitleProps;
const DialogDesktopTitle = forwardRef<HTMLDivElement, DialogDesktopTitleProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <div className={base({ className })} ref={ref} {...rest}>
        <RadixDialog.Title className={title()}>{children}</RadixDialog.Title>
        <RadixDialog.Close asChild>
          <Button onlyIcon size="sm" variant="secondary">
            <XMarkIcon className="size-4" />
          </Button>
        </RadixDialog.Close>
      </div>
    );
  },
);

DialogDesktopTitle.displayName = "DialogDesktopTitle";

/* ---------- DialogDesktopClose ---------- */
type DialogDesktopCloseProps = RadixDialog.DialogCloseProps;
const DialogDesktopClose = RadixDialog.Close;

/* ---------- Exports ---------- */
export {
  DialogDesktopRoot as Root,
  DialogDesktopTrigger as Trigger,
  DialogDesktopContent as Content,
  DialogDesktopTitle as Title,
  DialogDesktopClose as Close,
};

export type {
  DialogDesktopRootProps as RootProps,
  DialogDesktopTriggerProps as TriggerProps,
  DialogDesktopContentProps as ContentProps,
  DialogDesktopTitleProps as TitleProps,
  DialogDesktopCloseProps as CloseProps,
};
