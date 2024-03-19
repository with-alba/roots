import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import type { api } from "~/lib/trpc/server";
import { Button, Pagination } from "~/components/ui";
import { getPagesToShow } from "~/components/ui/pagination";
import { useSearchPageSearchParams } from "../context";
import { PropertyItem } from "./property-item";
import { PropertySkeleton } from "./property-skeleton";

interface PropertiesListProps {
  data:
    | Awaited<ReturnType<typeof api.properties.getProperties>>["results"]
    | undefined;
  totalCount: number | undefined;
  isLoading: boolean;
}

export function PropertiesList({
  data,
  isLoading,
  totalCount,
}: PropertiesListProps) {
  const [searchParams, setSearchParams, stringifiedSearchParams] =
    useSearchPageSearchParams();

  if (isLoading) {
    return (
      <div className="h-full w-full space-y-6 px-6 py-6">
        <div className="h-5 w-full max-w-sm animate-pulse rounded bg-zinc-100" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 10 }, (_, i) => {
            return <PropertySkeleton key={i} />;
          })}
        </div>
      </div>
    );
  }

  if (!totalCount) {
    return (
      <div className="h-full w-full p-1">
        <div className="grid h-full w-full place-content-center space-y-4 rounded-b-[10px] bg-zinc-50">
          <FaceFrownIcon className="mx-auto size-14 text-placeholder" />
          <p className="max-w-sm text-pretty text-center font-medium text-secondary">
            No se encontraron propiedades con los filtros seleccionados.
          </p>
          <Button
            className="mx-auto max-w-fit"
            onClick={() => {
              setSearchParams((prev) => ({
                item_location: prev.item_location,
                view: prev.view,
                page: 1,
                OPERATION: prev.OPERATION,
              }));
            }}
            variant="secondary"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    );
  }

  const pages = getPagesToShow({
    page: searchParams.page || 1,
    totalCount: totalCount || 0,
    pageSize: 30,
  });

  return (
    <div className="h-full w-full space-y-6 px-6 py-6">
      <p className="text-sm font-medium">
        Mas de {totalCount} propiedades en venta en la zona
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
        {data!.map((property) => {
          return <PropertyItem key={property.id} property={property} />;
        })}
      </div>
      <div className="flex w-full justify-center">
        <Pagination.Root>
          <Pagination.Item>
            <Pagination.Previous
              onClick={() => {
                setSearchParams((prev) => ({
                  ...prev,
                  page: Number(searchParams.page) - 1,
                }));
              }}
            />
          </Pagination.Item>
          <Pagination.Content>
            {pages.map((page, index) => {
              if (page === "ellipsis") {
                return <Pagination.Ellipsis key={index} />;
              }

              return (
                <Pagination.Item
                  asChild
                  isActive={Number(searchParams.page) === page}
                  key={index}
                  onClick={() => {
                    // Reset the scroll position of the property list
                    const propertyList = document.querySelector(
                      "[data-radix-scroll-area-viewport]",
                    );

                    if (propertyList) {
                      propertyList.scrollTop = 0;
                    }
                  }}
                >
                  <Link
                    href={{
                      query: {
                        ...stringifiedSearchParams(),
                        page,
                      },
                    }}
                  >
                    {page}
                  </Link>
                </Pagination.Item>
              );
            })}
          </Pagination.Content>
          <Pagination.Item>
            <Pagination.Next
              onClick={() => {
                setSearchParams((prev) => ({
                  ...prev,
                  page: Number(searchParams.page) + 1,
                }));
              }}
            />
          </Pagination.Item>
        </Pagination.Root>
      </div>
    </div>
  );
}
