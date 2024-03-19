"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { cn } from "~/lib/utils";
import { Button } from ".";

/* ------- ImagesDialogRoot ------- */
type ImagesDialogRootProps = RadixDialog.DialogProps;
export const ImagesDialogRoot = RadixDialog.Root;

/* ------- ImagesDialogTrigger ------- */
type ImagesDialogTriggerProps = RadixDialog.DialogTriggerProps;
export const ImagesDialogTrigger = RadixDialog.Trigger;

/* ------- ImagesDialogContent ------- */
const dialogDesktopContentVariants = tv({
  slots: {
    overlay:
      "fixed inset-0 bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:bg-overlay",
    content:
      "fixed left-1/2 top-1/2 flex h-full h-full w-full max-w-screen-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden bg-zinc-900/40 shadow-[0px_3px_10px_rgba(24,_24,_27,_0.04),_0px_0px_0px_1px_rgba(24,_24,_27,_0.03)] backdrop-blur data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:max-h-[760px] lg:rounded-2xl",
  },
});

const { overlay, content } = dialogDesktopContentVariants();
type ImagesDialogContentProps = RadixDialog.DialogContentProps & {
  defaultSelectedIndex?: number;
};
type CarouselApi = UseEmblaCarouselType[1];
export const ImagesDialogContent = forwardRef<
  HTMLDivElement,
  ImagesDialogContentProps
>((props, ref) => {
  const { className, children, defaultSelectedIndex, ...rest } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: defaultSelectedIndex,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex || 0);

  const totalCount = emblaApi?.slideNodes().length || 0;

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  const onSelect = useCallback(
    (api: CarouselApi) => {
      if (!api) {
        return;
      }

      setSelectedIndex(api.selectedScrollSnap());

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    },
    [setSelectedIndex],
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={overlay()} />
      <RadixDialog.Content
        className={content({ className })}
        ref={ref}
        {...rest}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- Needed for interactions */}
        <div
          className="relative h-full w-full"
          onKeyDown={handleKeyDown}
          ref={emblaRef}
        >
          <div className="flex h-full w-full">{children}</div>
          <div className="absolute top-4 flex w-full items-center justify-between px-4">
            <span className="rounded bg-zinc-900/60 px-2 py-1 text-sm font-medium text-white">
              {selectedIndex + 1} / {totalCount}
            </span>
            <RadixDialog.Close asChild>
              <Button onlyIcon size="sm" variant="secondary">
                <XMarkIcon className="size-5" />
              </Button>
            </RadixDialog.Close>
          </div>
          <button
            className="absolute left-4 top-1/2 size-12 -translate-y-1/2 rounded-lg bg-zinc-900/20 opacity-60 transition-opacity hover:opacity-100 disabled:opacity-0 max-md:hidden"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            type="button"
          >
            <ChevronLeftIcon className="size-full text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 size-12 -translate-y-1/2 rounded-lg bg-zinc-900/20 opacity-60 transition-opacity hover:opacity-100 disabled:opacity-0 max-md:hidden"
            disabled={!canScrollNext}
            onClick={scrollNext}
            type="button"
          >
            <ChevronRightIcon className="size-full text-white" />
          </button>
        </div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

ImagesDialogContent.displayName = "ImagesDialogContent";

/* ---------- CarouselItem ---------- */
type ImagesDialogContentItemProps = ComponentPropsWithoutRef<"img">;
const ImagesDialogContentItem = forwardRef<
  HTMLImageElement,
  ImagesDialogContentItemProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <img
      alt={rest.alt}
      className={cn("flex-[0_0_100%] object-contain", className)}
      loading="lazy"
      ref={ref}
      {...rest}
    />
  );
});

ImagesDialogContentItem.displayName = "ImageDialogContentItem";

export {
  ImagesDialogRoot as Root,
  ImagesDialogContent as Content,
  ImagesDialogContentItem as Item,
  ImagesDialogTrigger as Trigger,
};

export type {
  ImagesDialogRootProps as RootProps,
  ImagesDialogContentProps as ContentProps,
  ImagesDialogContentItemProps as ItemProps,
  ImagesDialogTriggerProps as TriggerProps,
};
