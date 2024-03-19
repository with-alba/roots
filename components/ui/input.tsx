import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  variants: {
    size: {
      md: "h-[32px] px-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
  base: "bg-form-element focus:bg-form-element-active hover:bg-form-element-hover placeholder:text-placeholder appearance-none rounded-md text-base font-medium text-primary outline-none transition-all sm:text-[15px]",
});

type InputProps = ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, ...rest } = props;

  return (
    <input className={inputVariants({ size, className })} ref={ref} {...rest} />
  );
});

Input.displayName = "Input";
