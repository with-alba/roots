import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

const badgeVariants = tv({
  variants: {
    size: {
      sm: "h-[25px] gap-1 px-[5px] text-[13px]",
      md: "h-[36px] gap-2 px-2 text-sm",
    },
    variant: {
      dashed: "border border-dashed border-zinc-200 text-secondary",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "dashed",
  },
  base: "inline-flex items-center justify-center rounded-md",
});

type BadgeProps = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className, variant, size, ...rest } = props;
  return (
    <span
      className={badgeVariants({ className, variant, size })}
      {...rest}
      ref={ref}
    />
  );
});

Badge.displayName = "Badge";
