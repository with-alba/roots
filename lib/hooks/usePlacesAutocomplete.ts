import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDebouncedValue } from "./useDebouncedValue";

/**
 * Hook to fetch places predictions and handle the query select event.
 * @returns - An object containing the data, isLoading, query, handleQueryChange and handleQuerySelect
 */
export const usePlacesAutocomplete = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the map instance, if any
  const map = useMap();
  // Get the places and geocoding libraries
  const places = useMapsLibrary("places");
  const geocoder = useMapsLibrary("geocoding");
  // Store the autocomplete service, geocoding service and session token
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>();
  const geocodingService = useRef<google.maps.Geocoder | null>();
  const sessionToken =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Get the debounced value and the function to set the debounced value
  const [query, setQuery] = useDebouncedValue("", 250);

  // Use the useQuery hook to fetch the data
  const { data, isLoading } = useQuery({
    queryKey: ["places", query],
    queryFn: async () => {
      // If the autocomplete service or session token are not initialized, initialize them
      if (!autocompleteService.current || !sessionToken.current) {
        autocompleteService.current = new places!.AutocompleteService();
        sessionToken.current = new places!.AutocompleteSessionToken();
      }

      // Fetch the predictions
      const response = await autocompleteService.current.getPlacePredictions({
        input: query,
        sessionToken: sessionToken.current,
        language: "es",
        componentRestrictions: {
          country: ["ar"],
        },
      });

      // Return the predictions
      return response.predictions;
    },
    // Enable the query when the query is not empty
    enabled: Boolean(query),
  });

  // Get the geometry of a place based on its placeId
  const getPlaceGeometry = async (placeId: string) => {
    // If the geocoding service is not initialized, initialize it
    if (!geocodingService.current) {
      geocodingService.current = new geocoder!.Geocoder();
    }

    // Fetch the response
    const response = await geocodingService.current.geocode({
      placeId,
    });

    // Return the first result's geometry bounds
    const bounds = response.results[0].geometry.bounds;
    return bounds;
  };

  // Handle the query select event
  const handleQuerySelect = async ({
    placeId,
    operation,
  }: {
    placeId: string;
    operation: string;
  }) => {
    // Clear the query
    setQuery("");
    // Create a new session token
    sessionToken.current = new places!.AutocompleteSessionToken();
    // Show a loading toast while fetching the place geometry
    const toastId = toast.loading("Buscando ubicación...");
    // Fetch the place geometry
    const geometry = await getPlaceGeometry(placeId);
    // Dismiss the loading toast
    toast.dismiss(toastId);

    // If the geometry is not available, return undefined
    if (!geometry) {
      return;
    }

    // Get the bounds of the geometry
    const bounds = geometry.toJSON();

    const lat = `lat:${bounds.south}_${bounds.north}`;
    const lon = `lon:${bounds.west}_${bounds.east}`;

    const itemLocation = `${lat},${lon}`;

    // Set the search params
    const params = new URLSearchParams(searchParams.toString());

    params.set("item_location", itemLocation);
    params.set("OPERATION", JSON.stringify([operation]));
    params.set("page", "1");

    // Push the new search params to the router. A timeout is needed since both router.push and map.fitBounds are sync operations and the map may not be ready yet
    setTimeout(() => {
      router.push(`/search?${params.toString()}`);
    }, 50);

    if (map) {
      map.fitBounds(geometry);
    }
  };

  return {
    data: data || [],
    isLoading,
    query,
    handleQueryChange: setQuery,
    handleQuerySelect,
  };
};
