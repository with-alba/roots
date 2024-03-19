import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";

interface SpinnerProps extends ComponentPropsWithoutRef<"span"> {
  size?: number;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (props, ref) => {
    const { className, size = 14, ...rest } = props;

    return (
      <span>
        <span
          {...rest}
          className={cn(
            "inline-grid grid-cols-3 gap-1 [&>span:nth-child(5)]:bg-transparent [&>span:nth-child(even)]:animate-loading",
            className,
          )}
          ref={ref}
        >
          <span
            className="rounded-full bg-zinc-200"
            style={{
              width: size,
              height: size,
            }}
          />
          <span
            className="rounded-full bg-zinc-200 [animation-delay:125ms!important]"
            style={{
              width: size,
              height: size,
            }}
          />
          <span
            className="rounded-full bg-zinc-200"
            style={{
              width: size,
              height: size,
            }}
          />
          <span
            className="rounded-full bg-zinc-200 [animation-delay:500ms!important]"
            style={{
              width: size,
              height: size,
            }}
          />
          <span className="rounded-full bg-zinc-200" />
          <span
            className="rounded-full bg-zinc-200 [animation-delay:250ms!important]"
            style={{
              width: size,
              height: size,
            }}
          />
          <span
            className="rounded-full bg-zinc-200"
            style={{
              width: size,
              height: size,
            }}
          />
          <span
            className="rounded-full bg-zinc-200 [animation-delay:375ms!important]"
            style={{
              width: size,
              height: size,
            }}
          />
          <span
            className="rounded-full bg-zinc-200"
            style={{
              width: size,
              height: size,
            }}
          />
        </span>
      </span>
    );
  },
);

Spinner.displayName = "Spinner";
