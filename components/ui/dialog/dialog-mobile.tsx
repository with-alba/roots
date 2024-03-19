"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { Drawer } from "vaul";
import { tv } from "tailwind-variants";
import { useMediaQuery } from "~/lib/hooks";

/* ---------- DialogMobileRoot ---------- */
type DialogMobileRootProps = ComponentProps<typeof Drawer.Root>;
const DialogMobileRoot = Drawer.Root;

/* ---------- DialogMobileTrigger ---------- */
type DialogMobileTriggerProps = ComponentProps<typeof Drawer.Trigger>;
const DialogMobileTrigger = Drawer.Trigger;

/* ---------- DialogMobileContent ---------- */
const dialogMobileContentVariants = tv({
  slots: {
    overlay:
      "fixed inset-0 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    content:
      "fixed bottom-0 left-0 right-0 flex max-h-[80vh] flex-col rounded-t-[10px] bg-white outline-none",
  },
});

const { overlay, content } = dialogMobileContentVariants();

type DialogMobileContentProps = ComponentProps<typeof Drawer.Content> & {
  responsiveAt?: number;
};
const DialogMobileContent = forwardRef<
  HTMLDivElement,
  DialogMobileContentProps
>((props, ref) => {
  const { className, children, responsiveAt = 640, ...rest } = props;
  const isMobile = useMediaQuery(`(max-width: ${responsiveAt}px)`);

  if (!isMobile) return null;
  return (
    <Drawer.Portal>
      <Drawer.Overlay className={overlay()} />
      <Drawer.Content className={content({ className })} {...rest} ref={ref}>
        <div className="mx-auto mb-8 mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
});

DialogMobileContent.displayName = "DialogMobileContent";

/* ---------- DialogMobileTitle ---------- */
const dialogMobileTitleVariants = tv({
  base: "text-[15px] font-medium text-zinc-500",
});

type DialogMobileTitleProps = ComponentProps<typeof Drawer.Title>;
const DialogMobileTitle = forwardRef<HTMLDivElement, DialogMobileTitleProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <Drawer.Title
        className={dialogMobileTitleVariants({ className })}
        ref={ref}
        {...rest}
      >
        {children}
      </Drawer.Title>
    );
  },
);

DialogMobileTitle.displayName = "DialogMobileTitle";

/* ---------- DialogMobileClose ---------- */
type DialogMobileCloseProps = ComponentProps<typeof Drawer.Close>;
const DialogMobileClose = Drawer.Close;

export {
  DialogMobileRoot as Root,
  DialogMobileTrigger as Trigger,
  DialogMobileContent as Content,
  DialogMobileTitle as Title,
  DialogMobileClose as Close,
};

export type {
  DialogMobileRootProps as RootProps,
  DialogMobileTriggerProps as TriggerProps,
  DialogMobileContentProps as ContentProps,
  DialogMobileTitleProps as TitleProps,
  DialogMobileCloseProps as CloseProps,
};
