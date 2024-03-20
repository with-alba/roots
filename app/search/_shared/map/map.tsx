"use client";
import { FaceFrownIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import type {
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
import { ControlPosition, Map, MapControl } from "@vis.gl/react-google-maps";
import { useRef } from "react";
import { Button, buttonVariants } from "~/components/ui";
import { usePrevious } from "~/lib/hooks";
import { Loader } from "~/components/ui/loader";
import type { InferRouterOutputs } from "~/lib/trpc/shared";
import { Marker } from "./marker";

export function MapErrorState() {
  return (
    <div className="grid h-full flex-1 place-content-center bg-zinc-50 p-4 max-lg:group-data-[view=list]:hidden">
      <div className="max-w-[530px] space-y-4">
        <div className="flex items-center gap-2">
          <FaceFrownIcon className="size-10 text-zinc-400" />
          <p className="font-medium">Servicio no disponible</p>
        </div>
        <p className="text-sm font-medium text-secondary">
          Actualmente, estamos enfrentando limitaciones de servicio debido al
          agotamiento de los recursos asignados para el mapa. Este proyecto se
          sostiene bajo un modelo de código abierto y es operado sin fines de
          lucro, dependiendo completamente del apoyo comunitario y las
          contribuciones voluntarias. Apreciamos tu paciencia y te invitamos a
          considerar el apoyo a nuestra iniciativa para restablecer y mejorar
          continuamente el servicio.
        </p>
        <div className="flex gap-3">
          <Button disabled>Contribuir</Button>
          <a
            className={buttonVariants().base({
              variant: "secondary",
            })}
            href="https://github.com/with-alba/roots"
          >
            <span className="px-1">Ver código</span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface PropertiesMapProps {
  data:
    | InferRouterOutputs["properties"]["getProperties"]["results"]
    | undefined;
  isLoading: boolean;

  bounds: {
    south: number;
    north: number;
    west: number;
    east: number;
  };
  onBoundsChange: (ev: MapCameraChangedEvent) => void;

  camera: MapCameraProps;
  onCameraChange: (ev: MapCameraChangedEvent) => void;

  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PropertiesMap({
  data,
  isLoading,
  bounds,
  onBoundsChange,
  camera,
  onCameraChange,
  onZoomIn,
  onZoomOut,
}: PropertiesMapProps) {
  const previousPoints = usePrevious(data);
  const points = data || previousPoints;

  const boundaryElement = useRef<HTMLDivElement>(null);

  return (
    <div
      className="isolate h-full flex-1 py-1 pr-1 group-data-[view=map]:px-1 max-lg:group-data-[view=list]:hidden"
      ref={boundaryElement}
    >
      <div className="relative h-full flex-1 overflow-hidden rounded-br-[10px] bg-zinc-50 group-data-[view=map]:rounded-b-[10px] [&>*]:!border-0 [&>.yNHHyP-marker-view]:hover:!z-[999]">
        <Map
          {...camera}
          clickableIcons={false}
          defaultBounds={bounds}
          fullscreenControl={false}
          mapId="1863503eaad3288b"
          mapTypeControl={false}
          onBoundsChanged={onBoundsChange}
          onCameraChanged={onCameraChange}
          rotateControl={false}
          scaleControl={false}
          streetViewControl={false}
          style={{ outline: "none" }}
          styles={[
            {
              featureType: "poi",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
          ]}
          zoomControl={false}
        >
          <MapControl position={ControlPosition.TOP_CENTER}>
            <div
              className="pointer-events-none mt-4 grid h-[36px] place-content-center rounded-lg bg-button-secondary px-4 shadow-button-secondary transition-transform data-[state=hidden]:-translate-y-[200%]"
              data-state={isLoading ? "shown" : "hidden"}
            >
              <Loader size={28} />
            </div>
          </MapControl>
          <MapControl position={ControlPosition.RIGHT_TOP}>
            <div className="grid gap-1 pr-2 pt-2">
              <Button
                className="h-[30px] w-[30px] items-center justify-center rounded-md px-0 py-0"
                onClick={onZoomIn}
                variant="secondary"
              >
                <PlusIcon className="h-5 w-5" />
              </Button>
              <Button
                className="h-[30px] w-[30px] items-center justify-center rounded-md px-0 py-0"
                onClick={onZoomOut}
                variant="secondary"
              >
                <MinusIcon className="h-5 w-5" />
              </Button>
            </div>
          </MapControl>
          {points?.map((property) => {
            return (
              <Marker
                boundaryElement={boundaryElement}
                key={property.id}
                property={property}
              />
            );
          })}
        </Map>
      </div>
    </div>
  );
}
