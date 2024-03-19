import { forwardRef } from "react";
import { cn } from "~/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
}
export const Loader = forwardRef<SVGSVGElement, LoaderProps>((props, ref) => {
  const { size = 36, className, ...rest } = props;
  return (
    <svg
      className={cn("text-zinc-600 *:animate-loader", className)}
      color="currentColor"
      height={size}
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle
        className="![animation-delay:0.5s]"
        cx="4"
        cy="12"
        fill="currentColor"
        r="3"
      />
      <circle
        className="![animation-delay:0.65s]"
        cx="12"
        cy="12"
        fill="currentColor"
        r="3"
      />
      <circle cx="20" cy="12" fill="currentColor" r="3" />
    </svg>
  );
});

Loader.displayName = "Loader";
