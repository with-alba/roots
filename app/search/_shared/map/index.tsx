"use client";

import { useCallback, useRef, useState } from "react";
import type {
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
import type { InferRouterOutputs } from "~/lib/trpc/shared";
import { ErrorBoundary } from "~/components/ui/error-boudary";
import { useSearchPageSearchParams } from "../context";
import { MapErrorState, PropertiesMap } from "./map";

interface ClientMapProps {
  data:
    | InferRouterOutputs["properties"]["getProperties"]["results"]
    | undefined;
  isLoading: boolean;
}

export function ClientMap({ data, isLoading }: ClientMapProps) {
  const isFirstRender = useRef(true);
  const [searchParams, setSearchParams] = useSearchPageSearchParams();

  const [lat, lon] = searchParams.item_location.split(",").map((item) => {
    return item.split(":")[1];
  });

  const [south, north] = lat.split("_").map((item) => Number(item));
  const [west, east] = lon.split("_").map((item) => Number(item));

  //@ts-expect-error -- This is needed in order to use default bounds in the map
  const [camera, setCamera] = useState<MapCameraProps>({});
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCamera(ev.detail);
  }, []);

  const handleBoundsChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      // Workaround to avoid the first call of the event
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // Reset the scroll position of the property list
      const propertyList = document.querySelector(
        "[data-radix-scroll-area-viewport]",
      );

      if (propertyList) {
        propertyList.scrollTop = 0;
      }

      // Update the search params and reset the page
      setSearchParams((prev) => ({
        ...prev,
        page: 1,
        item_location: `lat:${ev.detail.bounds.south}_${ev.detail.bounds.north},lon:${ev.detail.bounds.west}_${ev.detail.bounds.east}`,
      }));
    },
    [setSearchParams],
  );
  return (
    <ErrorBoundary fallback={<MapErrorState />}>
      <PropertiesMap
        bounds={{ south, north, west, east }}
        camera={camera}
        data={data}
        isLoading={isLoading}
        onBoundsChange={handleBoundsChange}
        onCameraChange={handleCameraChange}
        onZoomIn={() => {
          setCamera((prev) => ({ ...prev, zoom: prev.zoom + 1 }));
        }}
        onZoomOut={() => {
          setCamera((prev) => ({ ...prev, zoom: prev.zoom - 1 }));
        }}
      />
    </ErrorBoundary>
  );
}
