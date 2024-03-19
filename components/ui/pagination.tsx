import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { tv } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";

export interface GetPagesToShowArgs {
  totalCount: number;
  pageSize: number;
  page: number;
}
export const getPagesToShow = ({
  totalCount,
  pageSize,
  page,
}: GetPagesToShowArgs): ("ellipsis" | number)[] => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 8) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (page < totalPages - 2) {
    // show current page and one page on each side
    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  }

  return [
    1,
    "ellipsis",
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ];
};

/* ------- Variants ------- */
const paginationVariants = tv({
  slots: {
    base: "flex items-center gap-3",
    content: "flex items-center gap-2",
    item: "grid size-7 place-content-center rounded-md text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 aria-disabled:bg-transparent aria-disabled:text-zinc-500 data-[chevron]:size-5 data-[active]:bg-zinc-800 data-[active]:text-white",
    ellipsis: "grid size-7 place-content-center text-sm text-zinc-900",
  },
});

const { item, base, content } = paginationVariants();

/* ------- PaginationRoot ------- */
type PaginationRootProps = ComponentProps<"div">;
const PaginationRoot = forwardRef<HTMLDivElement, PaginationRootProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <div className={base({ className })} {...rest} ref={ref} />;
  },
);

PaginationRoot.displayName = "PaginationRoot";

/* ------- PaginationContent ------- */
type PaginationContentProps = ComponentProps<"div">;
const PaginationContent = forwardRef<HTMLDivElement, PaginationContentProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <div className={content({ className })} {...rest} ref={ref} />;
  },
);

PaginationContent.displayName = "PaginationContent";

/* ------- PaginationItem ------- */
interface PaginationItemProps extends ComponentPropsWithoutRef<"button"> {
  isDisabled?: boolean;
  asChild?: boolean;
  isActive?: boolean;
}
const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  (props, ref) => {
    const { asChild, isActive, className, isDisabled, ...rest } = props;

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        aria-disabled={isDisabled || undefined}
        className={item({ className })}
        data-active={isActive || undefined}
        disabled={isDisabled}
        ref={ref}
        {...rest}
      />
    );
  },
);

PaginationItem.displayName = "PaginationItem";

/* ------- PaginationPrevious ------- */
type PaginationPreviousProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};
const PaginationPrevious = forwardRef<
  HTMLButtonElement,
  PaginationPreviousProps
>((props, ref) => {
  const { className, asChild, ...rest } = props;

  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={item({ className })} {...rest} ref={ref}>
      <ChevronLeftIcon className="size-[18px]" data-chevron />
    </Comp>
  );
});

PaginationPrevious.displayName = "PaginationPrevious";

/* ------- PaginationNext ------- */
type PaginationNextProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};
const PaginationNext = forwardRef<HTMLButtonElement, PaginationNextProps>(
  (props, ref) => {
    const { className, asChild, ...rest } = props;

    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={item({ className })} {...rest} ref={ref}>
        <ChevronRightIcon className="size-[18px]" data-chevron />
      </Comp>
    );
  },
);
PaginationNext.displayName = "PaginationNext";

/* ------- PaginationEllipsis ------- */
type PaginationEllipsisProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
>;
const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <span className={item({ className })} {...rest} ref={ref}>
        <EllipsisHorizontalIcon className="size-[15px]" />
      </span>
    );
  },
);

PaginationEllipsis.displayName = "PaginationEllipsis";

/* ------- Export ------- */
export {
  PaginationRoot as Root,
  PaginationContent as Content,
  PaginationItem as Item,
  PaginationPrevious as Previous,
  PaginationNext as Next,
  PaginationEllipsis as Ellipsis,
};

export type {
  PaginationRootProps as RootProps,
  PaginationContentProps as ContentProps,
  PaginationItemProps as ItemProps,
  PaginationPreviousProps as PreviousProps,
  PaginationNextProps as NextProps,
  PaginationEllipsisProps as EllipsisProps,
};
