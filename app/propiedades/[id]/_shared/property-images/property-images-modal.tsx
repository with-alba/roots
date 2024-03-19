"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ImagesDialog } from "~/components/ui";

interface PropertyImagesModal {
  images: string[];
}

export function PropertyImagesModal({ images }: PropertyImagesModal) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the selected image index from the search params
  const selectedIndex = searchParams.get("image");
  // If the selected index is not null, the modal is open
  const isOpen = selectedIndex !== null;

  // When closing the modal, remove the selected index from the search params
  const handleOpenChange = () => {
    router.push(window.location.pathname);
  };

  return (
    <ImagesDialog.Root onOpenChange={handleOpenChange} open={isOpen}>
      <ImagesDialog.Content defaultSelectedIndex={Number(selectedIndex || 0)}>
        {images.map((img) => {
          return <ImagesDialog.Item key={img} src={img} />;
        })}
      </ImagesDialog.Content>
    </ImagesDialog.Root>
  );
}
