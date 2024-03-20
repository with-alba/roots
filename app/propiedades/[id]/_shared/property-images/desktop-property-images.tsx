"use client";

import { ScrollArea } from "~/components/ui";
import { cn } from "~/lib/utils";

interface DesktopPropertyImagesProps {
  propertyImages: string[];
}

export function DesktopPropertyImages({
  propertyImages,
}: DesktopPropertyImagesProps) {
  const handleImageClick = (index: number) => {
    // Using the browser's native API to update the URL instantly
    window.history.pushState({}, "", `?image=${index}`);
  };
  return (
    <ScrollArea.Root className="flex-1 max-xl:hidden">
      <ScrollArea.Viewport>
        <div className="grid grid-cols-1 gap-4 p-4 2xl:grid-cols-2">
          {propertyImages.map((image, index) => {
            return (
              <button
                className={cn(
                  "relative block h-full w-full overflow-hidden rounded-md transition-all hover:brightness-75",
                  {
                    "[grid-column:1_/_-1]": !index,
                  },
                )}
                key={image}
                onClick={() => {
                  handleImageClick(index);
                }}
                type="button"
              >
                <img
                  alt="Thumbnail"
                  className="block h-full w-full object-cover object-center"
                  src={image}
                />
              </button>
            );
          })}
        </div>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
