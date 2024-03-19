import * as Popover from "@radix-ui/react-popover";
import type {
  AdvancedMarkerProps,
  AdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useMediaQuery, useToggle } from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { forwardRef, type RefObject } from "react";
import { useInView } from "react-intersection-observer";
import * as Portal from "@radix-ui/react-portal";
import { Badge, Button, Carousel } from "~/components/ui";
import { api } from "~/lib/trpc/react";
import type { InferRouterOutputs } from "~/lib/trpc/shared";
import { ATTR_MAP } from "../properties-list/property-item";

interface MarkerProps extends AdvancedMarkerProps {
  boundaryElement: RefObject<HTMLDivElement>;
  property: InferRouterOutputs["properties"]["getProperties"]["results"][number];
}

export const Marker = forwardRef<AdvancedMarkerRef, MarkerProps>(
  (props, ref) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    const { boundaryElement, property, ...markerProps } = props;
    const { data, refetch, isFetched } = api.properties.byId.useQuery(
      { id: property.id },
      {
        enabled: false,
      },
    );
    const [imageRef] = useInView({
      onChange: (inView) => {
        if (!isFetched && inView) {
          void refetch();
        }
      },
    });
    const thumbnails = [property.thumbnail, ...(data?.pictures || [])];

    const [open, toggle] = useToggle();

    const position = property.geoLocation;

    return (
      <Popover.Root onOpenChange={toggle} open={open}>
        <AdvancedMarker
          className="!pointer-events-auto"
          onClick={toggle}
          position={position}
          ref={ref}
          {...markerProps}
        >
          <Popover.Trigger asChild>
            <Button
              className="h-4 rounded px-1 text-[12px] hover:z-10 hover:scale-110 data-[active]:z-10 data-[state=open]:z-10 data-[state=open]:scale-110 data-[active]:bg-zinc-900 data-[state=open]:bg-zinc-900 data-[active]:text-white data-[state=open]:text-white sm:h-6 sm:text-sm"
              data-item-id={property.id}
              type="button"
              variant="secondary"
            >
              {property.price.currency} {property.price.amount.toLocaleString()}
            </Button>
          </Popover.Trigger>
          {isMobile ? (
            <Portal.Root>
              <Popover.Anchor className="absolute bottom-3 left-0 w-full" />
            </Portal.Root>
          ) : null}
        </AdvancedMarker>
        <Popover.Portal>
          <Popover.Content
            asChild
            collisionBoundary={boundaryElement.current}
            collisionPadding={8}
            side="top"
            sideOffset={8}
          >
            <Link
              className="relative isolate flex w-[var(--radix-popper-available-width)] flex-col overflow-hidden rounded-lg bg-white shadow-[0px_4px_12px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(39,_40,_44,_0.07),_0px_0px_0px_1px_rgba(32,_33,_37,_0.06)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-[320px]"
              href={`/propiedades/${property.id}`}
              prefetch={false}
              ref={imageRef}
              target="_blank"
            >
              <Button
                className="absolute right-2 top-2 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle();
                }}
                onlyIcon
                size="sm"
                variant="secondary"
              >
                <XMarkIcon className="size-4" />
              </Button>
              <div className="group/image relative">
                <Carousel.Root>
                  {thumbnails.map((pic) => {
                    return (
                      <Carousel.Item
                        alt="thumbnail"
                        className="aspect-[1.6] object-cover object-center max-sm:max-h-[300px]"
                        key={pic}
                        src={pic}
                      />
                    );
                  })}
                </Carousel.Root>
              </div>

              <div className="space-y-1 p-4">
                <p className="line-clamp-2  text-[15px] font-medium">
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
                  {property.price.currency}{" "}
                  {property.price.amount.toLocaleString()}
                </p>
              </div>
            </Link>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

Marker.displayName = "Marker";
