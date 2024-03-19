"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { useMediaQuery } from "~/lib/hooks";
import * as DialogDesktop from "./dialog-desktop";
import * as DialogMobile from "./dialog-mobile";

/* ---------- DialogRoot ---------- */
type DialogRootProps = Pick<
  DialogDesktop.RootProps,
  "open" | "defaultOpen" | "onOpenChange" | "children"
>;
function DialogRoot(props: DialogRootProps) {
  const { open, defaultOpen, onOpenChange, children } = props;
  const [isOpen, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile) {
    return (
      <DialogMobile.Root onOpenChange={setIsOpen} open={isOpen}>
        {children}
      </DialogMobile.Root>
    );
  }

  return (
    <DialogDesktop.Root onOpenChange={setIsOpen} open={isOpen}>
      {children}
    </DialogDesktop.Root>
  );
}

/* ---------- DialogTrigger ---------- */
interface DialogTriggerProps {
  children: ReactNode;
}
const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, ref) => {
    const isMobile = useMediaQuery("(max-width: 640px)");

    if (isMobile) {
      return <DialogMobile.Trigger asChild {...props} ref={ref} />;
    }

    return <DialogDesktop.Trigger asChild {...props} ref={ref} />;
  },
);

DialogTrigger.displayName = "DialogTrigger";

export { DialogRoot as Root, DialogTrigger as Trigger };

export type {
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
};
