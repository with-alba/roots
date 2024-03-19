import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

/* ---------- Variants ---------- */

const buttonVariants = tv({
  variants: {
    variant: {
      primary: {
        base: "bg-button-primary text-inverted hover:bg-button-primary-hover",
      },
      secondary: {
        base: "bg-button-secondary shadow-button-secondary hover:shadow-button-secondary-hover",
      },
      special: {
        base: "bg-button-special text-inverted shadow-button-special after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/[17%] after:to-transparent after:transition-colors after:content-[''] hover:after:from-white/25",
      },
    },
    onlyIcon: {
      true: {
        base: "inline-grid place-content-center",
      },
    },
    size: {
      md: "h-[34px] rounded-lg px-2 py-2.5 text-sm",
      sm: "h-[28px] rounded-md px-1.5 py-2 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
  compoundVariants: [
    {
      variant: "secondary",
      size: "md",
      className: "pt-[11px]",
    },
    {
      onlyIcon: true,
      size: "md",
      className: "size-[34px] p-0 [&>*>svg]:size-4",
    },
    {
      onlyIcon: true,
      size: "sm",
      className: "size-[28px] p-0 [&>*>svg]:size-4",
    },
  ],
  slots: {
    base: "relative isolate inline-flex select-none items-center justify-center gap-0.5 font-medium outline-none transition-all before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:ring-blue-600/10 before:transition-shadow focus:before:ring-4 disabled:border-zinc-400 disabled:bg-zinc-100 disabled:bg-zinc-50 disabled:text-secondary disabled:text-zinc-300 disabled:shadow-[0_0_0_1px_theme(colors.zinc.100)]",
  },
});

const { base } = buttonVariants();

/* ---------- Types ---------- */

interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "prefix">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  prefix?: React.ReactNode;
}

/* ---------- Components ---------- */

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    variant,
    size = "md",
    onlyIcon,
    prefix,
    ...rest
  } = props;

  return (
    <button
      className={base({ className, variant, size, onlyIcon })}
      ref={ref}
      type="button"
      {...rest}
    >
      {prefix}
      <span
        className="mx-auto grid w-full place-content-center px-1"
        data-label
      >
        {children}
      </span>
    </button>
  );
});

Button.displayName = "Button";

/* ---------- Exports ---------- */

export { Button, buttonVariants };
export type { ButtonProps };
