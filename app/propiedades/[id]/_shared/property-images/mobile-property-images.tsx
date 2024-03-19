"use client";

import { useRouter } from "next/navigation";
import { Carousel } from "~/components/ui";

interface MobilePropertyImagesProps {
  propertyImages: string[];
}

export function MobilePropertyImages({
  propertyImages,
}: MobilePropertyImagesProps) {
  const router = useRouter();

  const handleImageClick = (index: number) => {
    router.push(`?image=${index}`);
  };

  return (
    <div className="group/image relative aspect-[1.1] rounded-md bg-zinc-50  xl:hidden">
      <Carousel.Root>
        {propertyImages.map((image, index) => {
          return (
            <button
              className="flex-[0_0_100%] transition-all hover:brightness-75"
              key={image}
              onClick={() => {
                handleImageClick(index);
              }}
              type="button"
            >
              <Carousel.Item className="object-contain" src={image} />
            </button>
          );
        })}
      </Carousel.Root>
    </div>
  );
}
