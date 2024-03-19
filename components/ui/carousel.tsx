"use client";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button } from "~/components/ui";
import { cn } from "~/lib/utils";

/* ---------- DotContainer ---------- */

const range = (start: number, end: number) => {
  if (start === 0 && end === 0) return [0];

  return Array(end - start + 1)
    .fill("")
    .map((_, idx) => start + idx);
};

const dotMargin = 3;
const dotSize = 8;
const visible = 5;

function DotContainer({
  totalCount,
  selectedIndex,
}: {
  totalCount: number;
  selectedIndex: number;
}) {
  let _visible = visible;
  if (totalCount < visible) {
    _visible = totalCount;
  }
  const center = Math.round(_visible / 2);
  const dotFullWidth = dotSize + dotMargin * 2;
  const centerIndex = Math.floor(_visible / 2);

  const translate = useMemo(() => {
    if (selectedIndex < centerIndex) {
      return 0;
    }

    if (totalCount - center < selectedIndex) {
      return (totalCount - _visible) * dotFullWidth;
    }

    return (selectedIndex - centerIndex) * dotFullWidth;
  }, [selectedIndex, center, centerIndex, dotFullWidth, totalCount, _visible]);

  const visibleDots = useMemo(() => {
    if (selectedIndex < centerIndex) {
      return range(0, _visible - 1);
    }

    if (totalCount - center < selectedIndex) {
      return range(totalCount - _visible, totalCount - 1);
    }

    return range(selectedIndex - centerIndex, selectedIndex + centerIndex);
  }, [selectedIndex, center, centerIndex, totalCount, _visible]);

  const mediumDots = useMemo(() => {
    if (selectedIndex < center && _visible === visible) {
      return range(0, _visible);
    }

    if (selectedIndex < center) {
      return range(0, centerIndex * 2 + 1);
    }

    if (totalCount - center - 1 < selectedIndex && _visible === visible) {
      return range(totalCount - _visible, totalCount - 1);
    }

    if (totalCount - center - 1 < selectedIndex) {
      return range(totalCount - centerIndex * 2, totalCount - 1);
    }

    if (_visible === visible) {
      return range(selectedIndex - 1, selectedIndex + 1);
    }

    return range(selectedIndex - 2, selectedIndex + 2);
  }, [_visible, center, centerIndex, selectedIndex, totalCount]);

  const bigDots = useMemo(() => {
    if (selectedIndex < center) {
      return range(0, centerIndex);
    }

    if (totalCount - center - 1 < selectedIndex) {
      return range(totalCount - center, totalCount - 1);
    }

    if (_visible === visible) {
      return [selectedIndex];
    }

    return range(selectedIndex - 1, selectedIndex + 1);
  }, [_visible, center, centerIndex, selectedIndex, totalCount]);

  const containerWidth = _visible * dotFullWidth;

  const dots = range(0, totalCount - 1);

  return (
    <div className="absolute bottom-4 flex w-full flex-col items-center justify-center">
      <div
        className="flex h-2 items-center overflow-hidden transition-all duration-500"
        style={{
          width: containerWidth,
        }}
      >
        {dots.map((dot) => {
          const isSmall = !mediumDots.includes(dot);
          const isMedium = mediumDots.includes(dot);
          const isBig =
            bigDots.includes(dot) || totalCount === visible || totalCount <= 3;
          const isActive = selectedIndex === dot;
          const isVisible = visibleDots.includes(dot);

          return (
            <div
              className="mx-[3px] h-2 w-2 shrink-0 transition-all duration-500"
              key={dot}
              style={{
                transform: `translateX(-${translate}px)`,
              }}
            >
              <div
                className={cn(
                  "h-full w-full shrink-0 rounded-full bg-white/50 opacity-0 transition-all duration-500",
                  { "bg-white": isActive },
                  { "opacity-1": isVisible },
                  { "scale-[60%]": isSmall },
                  { "scale-75": isMedium },
                  { "!scale-100": isBig },
                )}
                data-active={isActive || undefined}
                data-visible={isVisible || undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CarouselRoot ---------- */

type CarouselRootProps = ComponentPropsWithoutRef<"div">;
type CarouselApi = UseEmblaCarouselType[1];

const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>((props) => {
  const { children, ...rest } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalCount = emblaApi?.slideNodes().length || 0;

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setSelectedIndex(api.selectedScrollSnap());

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

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

  const handlePrevious = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    emblaApi?.scrollPrev();
  };

  const handleNext = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    emblaApi?.scrollNext();
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      ref={emblaRef}
      {...rest}
    >
      <div className="flex h-full w-full">{children}</div>

      <Button
        className="absolute left-4 top-1/2 hidden !size-8 -translate-y-1/2 place-content-center p-0 opacity-0 disabled:!opacity-0 group-hover/image:opacity-100 sm:grid"
        disabled={!canScrollPrev}
        onClick={handlePrevious}
        tabIndex={-1}
        variant="secondary"
      >
        <ChevronLeftIcon className="size-5" />
      </Button>

      <Button
        className="absolute right-4 top-1/2 hidden !size-8 -translate-y-1/2 place-content-center p-0 opacity-0 disabled:!opacity-0 group-hover/image:opacity-100 sm:grid"
        disabled={!canScrollNext}
        onClick={handleNext}
        tabIndex={-1}
        variant="secondary"
      >
        <ChevronRightIcon className="size-5" />
      </Button>

      <DotContainer selectedIndex={selectedIndex} totalCount={totalCount} />
    </div>
  );
});

CarouselRoot.displayName = "Carousel";

/* ---------- CarouselItem ---------- */
type CarouselItemProps = ComponentPropsWithoutRef<"img">;
const CarouselItem = forwardRef<HTMLImageElement, CarouselItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <img
        alt={rest.alt}
        className={cn("flex-[0_0_100%]", className)}
        loading="lazy"
        ref={ref}
        {...rest}
      />
    );
  },
);

CarouselItem.displayName = "CarouselItem";

export { CarouselRoot as Root, CarouselItem as Item };
