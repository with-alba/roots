"use client";

import { HomeIcon } from "@heroicons/react/20/solid";
import { BathroomSolid, RulerCombine } from "iconoir-react";
import Link from "next/link";
import { useCallback, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { Badge, Carousel } from "~/components/ui";
import { api } from "~/lib/trpc/react";
import type { InferRouterOutputs } from "~/lib/trpc/shared";

type Property = NonNullable<
  InferRouterOutputs["properties"]["getProperties"]["results"][number]
>;

// Map the attributes to the icon and label
export const ATTR_MAP: Record<
  Property["mainAttributes"][number]["name"],
  { icon: ReactNode; label: string }
> = {
  ROOMS: {
    icon: <HomeIcon className="mb-0.5 h-3 w-3" />,
    label: "ambientes",
  },
  BATHROOMS: {
    icon: <BathroomSolid className="h-3 w-3" />,
    label: "baños",
  },
  COVERED_AREA: {
    icon: <RulerCombine className="h-3 w-3" />,
    label: "",
  },
};

interface PropertyItemProps {
  property: Property;
}

export function PropertyItem({ property }: PropertyItemProps) {
  // Fetch the property details when the item is in view and not fetched. Enabled is set to false to avoid fetching the property details when the page loads
  const { data, refetch, isFetched } = api.properties.byId.useQuery(
    { id: property.id },
    {
      enabled: false,
    },
  );

  // Use the inView hook to fetch the property details when the item is in view
  const [ref] = useInView({
    onChange: (inView) => {
      if (!isFetched && inView) {
        void refetch();
      }
    },
  });

  // Get the pictures
  const thumbnails = [property.thumbnail, ...(data?.pictures || [])];

  // When the mouse enters the item, set the marker as active
  const handleMouseEnter = useCallback(() => {
    const marker = document.querySelector(`[data-item-id="${property.id}"]`);
    if (marker) {
      marker.setAttribute("data-active", "true");
    }
  }, [property.id]);

  // When the mouse leaves the item, remove the active attribute from the marker
  const handleMouseLeave = useCallback(() => {
    const marker = document.querySelector(`[data-item-id="${property.id}"]`);

    if (marker) {
      marker.removeAttribute("data-active");
    }
  }, [property.id]);

  return (
    <Link
      className="space-y-2.5"
      href={`/propiedades/${property.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      prefetch={false}
      ref={ref}
      target="_blank"
    >
      <div className="group/image relative aspect-[1.1] overflow-hidden rounded-md">
        <Carousel.Root>
          {thumbnails.map((pic) => {
            return (
              <Carousel.Item
                alt="thumbnail"
                className="aspect-[1.1] h-full w-full object-cover object-center"
                key={pic}
                src={pic}
              />
            );
          })}
        </Carousel.Root>
      </div>
      <div className="space-y-1">
        <p className="line-clamp-2 text-[15px] font-medium">
          {property.propertyType} en {property.location.address}
        </p>
        <div className="flex items-center gap-1">
          {property.mainAttributes
            .sort((a, b) => b.name.localeCompare(a.name))
            .map((attr) => {
              const { icon, label } = ATTR_MAP[attr.id];

              return (
                <Badge key={attr.name} size="sm">
                  {icon}
                  <span>
                    {attr.value} {label}
                  </span>
                </Badge>
              );
            })}
        </div>
        <p className="text-sm font-medium">
          {property.price.currency} {property.price.amount.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
