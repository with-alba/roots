"use client";

import { omit } from "remeda";
import { ScrollArea } from "~/components/ui";
import { api } from "~/lib/trpc/react";
import { PropertiesList } from "./properties-list";
import { useSearchPageSearchParams } from "./context";
import { ClientMap } from "./map";

export function PropertiesSection() {
  // Grab the search params from the context
  const [searchParams] = useSearchPageSearchParams();
  // Remove the view and page from the search params since they are not used to fetch the properties
  const paramsObject = omit(searchParams, ["view", "page"]);
  // Get the view and page from the search params. Defaults to list view and page 1
  const view = searchParams.view || "list";
  const page = Number(searchParams.page || 1);

  // Calculate the offset
  const offset = (page - 1) * 30;

  // Fetch the properties
  const { data, isLoading } = api.properties.getProperties.useQuery(
    {
      offset,
      ...paramsObject,
    },
    {
      retry: false,
    },
  );

  const totalCount = data?.totalCount;

  return (
    <div className="group grid h-full overflow-hidden lg:flex" data-view={view}>
      {view === "list" ? (
        <ScrollArea.Root
          className="max-w-screen-xl pb-4 lg:w-[60%]"
          hideTrack
          orientation="vertical"
        >
          <ScrollArea.Viewport className="[&>div]:h-full">
            <PropertiesList
              data={data?.results}
              isLoading={isLoading}
              totalCount={totalCount}
            />
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      ) : null}

      <ClientMap data={data?.results} isLoading={isLoading} />
    </div>
  );
}
