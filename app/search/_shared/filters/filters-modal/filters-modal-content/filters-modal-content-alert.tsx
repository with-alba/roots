import { InformationCircleIcon } from "@heroicons/react/16/solid";

// Separating this component from the form since it can be rendered from the server.
// This way we can just send the content as HTML from the server

export function FiltersModalContentAlert() {
  return (
    <span className="block space-y-1 rounded-l-sm border-l-2 border-blue-500 bg-blue-600/[4%] p-2 text-sm font-medium text-blue-950">
      <div className="flex items-center gap-1">
        <InformationCircleIcon className="size-4" />
        <p className="font-semibold">A tener en cuenta</p>
      </div>

      <p className="text-balance">
        La búsqueda con los filtros seleccionados puede no mostrar resultados.
        Esto no significa que no existan propiedades que cumplan con estos
        criterios, sino que los detalles no fueron especificados por el
        anunciante.
      </p>
    </span>
  );
}
