"use client";

import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { ElementRef } from "react";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "~/lib/utils";

/* ---------- Variants ---------- */

const scrollAreaVariants = tv({
  slots: {
    root: "group h-full overflow-hidden rounded-[inherit]",
    track:
      "!right-0.5 flex touch-none select-none px-px opacity-0 transition-opacity group-hover:opacity-100 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:py-px data-[orientation=vertical]:px-px group-data-[hide-track]:hidden",
    thumb: "relative flex-1 rounded-[10px] bg-[rgba(0,0,0,0.14)]",
  },
});

const { root, track, thumb } = scrollAreaVariants();

/* ---------- ScrollAreaRoot ---------- */

interface ScrollAreaRootProps extends RadixScrollArea.ScrollAreaProps {
  hideTrack?: boolean;
  orientation?: "vertical" | "horizontal" | "auto";
}

const ScrollAreaRoot = forwardRef<
  ElementRef<typeof RadixScrollArea.Root>,
  ScrollAreaRootProps
>((props, ref) => {
  const {
    className,
    hideTrack,
    children,
    orientation = "auto",
    ...rest
  } = props;

  const isVertical = ["vertical", "auto"].includes(orientation);
  const isHorizontal = ["horizontal", "auto"].includes(orientation);

  return (
    <RadixScrollArea.Root
      className={root({ className })}
      data-hide-track={hideTrack || undefined}
      ref={ref}
      {...rest}
    >
      {children}
      {isVertical ? (
        <RadixScrollArea.Scrollbar
          className={track()}
          data-track
          forceMount
          orientation="vertical"
        >
          <RadixScrollArea.Thumb className={thumb()} />
        </RadixScrollArea.Scrollbar>
      ) : null}
      {isHorizontal ? (
        <RadixScrollArea.Scrollbar
          className={track()}
          data-track
          orientation="horizontal"
        >
          <RadixScrollArea.Thumb className={thumb()} />
        </RadixScrollArea.Scrollbar>
      ) : null}
    </RadixScrollArea.Root>
  );
});

ScrollAreaRoot.displayName = "ScrollArea";

/* ---------- ScrollAreaViewport ---------- */
type ScrollAreaViewportProps = RadixScrollArea.ScrollAreaViewportProps;
const ScrollAreaViewport = forwardRef<
  ElementRef<typeof RadixScrollArea.Viewport>,
  ScrollAreaViewportProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <RadixScrollArea.Viewport
      className={cn("h-full w-full", className)}
      data-viewport
      ref={ref}
      {...rest}
    />
  );
});

ScrollAreaViewport.displayName = "ScrollAreaViewport";

/* ---------- Exports ---------- */

export {
  ScrollAreaRoot as Root,
  ScrollAreaViewport as Viewport,
  scrollAreaVariants as variants,
};
export type {
  ScrollAreaRootProps as RootProps,
  ScrollAreaViewportProps as ViewportProps,
};
