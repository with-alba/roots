import { Suspense } from "react";
import type { InferRouterOutputs } from "~/lib/trpc/shared";
import { ScrollArea } from "~/components/ui";
import { ErrorBoundary } from "~/components/ui/error-boudary";
import { DesktopPropertyImages } from "../property-images/desktop-property-images";
import { MobilePropertyImages } from "../property-images/mobile-property-images";
import { PropertyImagesModal } from "../property-images/property-images-modal";
import {
  PropertyMap,
  PropertyMapError,
  PropertyMapFallback,
} from "./property-map";
import { PropertyPageHeader } from "./property-page-header";
import { PropertyPageExternalMarketplace } from "./property-page-external-marketplace";
import { PropertyPageFeatures } from "./property-page-features";
import { PropertyPageContact } from "./property-page-contact";
import { PropertyPageActions } from "./property-page-actions";

interface PropertyPageProps {
  property: InferRouterOutputs["properties"]["byId"];
}

export function PropertyPage({ property }: PropertyPageProps) {
  const images = property.pictures;

  return (
    <div className="flex h-full">
      <PropertyImagesModal images={images} />
      <DesktopPropertyImages propertyImages={images} />
      <ScrollArea.Root>
        <ScrollArea.Viewport className="flex group-has-[div[data-track]]:!items-start xl:items-center">
          <div>
            <MobilePropertyImages propertyImages={images} />
            <div className="w-full space-y-4 p-4 md:px-10 md:pt-12 xl:w-[900px]">
              <PropertyPageHeader property={property} />
              <PropertyPageExternalMarketplace property={property} />
              <hr className="h-px w-full bg-zinc-200" />
              <PropertyPageFeatures property={property} />
              <hr className="h-px w-full bg-zinc-200" />
              <PropertyPageContact property={property} />

              <ErrorBoundary fallback={<PropertyMapError />}>
                <Suspense fallback={<PropertyMapFallback />}>
                  <PropertyMap
                    geoLocation={property.geoLocation}
                    propertyId={property.id}
                  />
                </Suspense>
              </ErrorBoundary>

              <PropertyPageActions property={property} />
            </div>
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  );
}
