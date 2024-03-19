import { FaceFrownIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "~/components/ui";
import { getStaticMap } from "~/lib/utils/generateStaticMap";
import type { Property } from "~/types/property";

export function PropertyMapFallback() {
  return (
    <div className="grid aspect-[2.3] w-full animate-pulse place-content-center rounded-md bg-zinc-100">
      <MapPinIcon className="size-10 text-placeholder" />
    </div>
  );
}

export function PropertyMapError() {
  return (
    <div className="grid aspect-[2.3] h-full w-full place-content-center space-y-4 rounded-md bg-zinc-50">
      <FaceFrownIcon className="mx-auto size-14 text-placeholder" />
      <p className="max-w-sm text-pretty text-center font-medium text-secondary">
        No se pudo cargar el mapa.
      </p>
    </div>
  );
}

interface PropertyMapProps {
  propertyId: string | number;
  geoLocation: Property["geoLocation"];
}

export const PropertyMap = async ({
  propertyId,
  geoLocation,
}: PropertyMapProps) => {
  // Get the static map image

  const mapImage = await getStaticMap({
    propertyId,
    geoLocation,
  });

  const mapsUrl = `https://www.google.com/maps?q=${geoLocation.lat},${geoLocation.lng}`;
  return (
    <div className="relative aspect-[2.3]">
      <a
        className={buttonVariants().base({
          className: "absolute right-2 top-2",
          size: "sm",
          variant: "secondary",
        })}
        href={mapsUrl}
        rel="noopener"
        target="_blank"
      >
        <img
          alt="Google maps icon"
          className="h-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/418px-Google_Maps_icon_%282020%29.svg.png?20200218211225"
        />
        Ver en Google Maps
      </a>

      <img
        alt="Propiedad en mapa"
        className="min-h-[250px] w-full rounded-md object-cover"
        src={mapImage}
      />
    </div>
  );
};
