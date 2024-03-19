"use client";

import { useCallback } from "react";
import { SegmentedControl } from "~/components/ui";
import { useSearchPageSearchParams } from "./context";

export function ViewTabs() {
  // Grab the search params from the context
  const [searchParams, setSearchParams] = useSearchPageSearchParams();
  // Get the view from the search params. Defaults to list view
  const view = searchParams.view || "list";

  // Handle the view change. Keep the previous search params and change the view.
  const handleViewChange = useCallback(
    (newView: "list" | "map") => {
      setSearchParams((prev) => ({
        ...prev,
        view: newView,
      }));
    },
    [setSearchParams],
  );

  return (
    <SegmentedControl.Root defaultValue={view}>
      <SegmentedControl.List>
        <SegmentedControl.Trigger
          onClick={() => {
            handleViewChange("list");
          }}
          value="list"
        >
          Listado
        </SegmentedControl.Trigger>
        <SegmentedControl.Trigger
          onClick={() => {
            handleViewChange("map");
          }}
          value="map"
        >
          Mapa
        </SegmentedControl.Trigger>
      </SegmentedControl.List>
    </SegmentedControl.Root>
  );
}
