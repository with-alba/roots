import "server-only";
import { supabaseClient } from "../supabase/supabaseClient";

interface GenerateStatisMapArgs {
  geoLocation: {
    lat: number;
    lng: number;
  };
}

const endpoint = `https://maps.googleapis.com/maps/api/staticmap?size=820x350&map_id=1863503eaad3288b&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&zoom=14&scale=2`;

/**
 * A function to generate a static map for a property.
 * @param param0 - The property's geolocation
 * @returns
 */
export const generateStaticMap = async ({
  geoLocation,
}: GenerateStatisMapArgs) => {
  const url = new URL(endpoint);
  url.searchParams.set(
    "markers",
    `icon:https://i.imgur.com/QNscVaF.png|scale:2|${geoLocation.lat},${geoLocation.lng}`,
  );

  // Fetch the static map
  const res = await fetch(url.toString(), {
    cache: "no-store",
  });
  // Get the blob
  const blob = await res.blob();

  return blob;
};

interface GenerateStaticMapArgs {
  propertyId: string | number;
  geoLocation: {
    lat: number;
    lng: number;
  };
}

/**
 * A function to get a static map.
 * @param param0 - The property's id and geolocation
 * @returns The static map' URL
 */
export const getStaticMap = async ({
  propertyId,
  geoLocation,
}: GenerateStaticMapArgs) => {
  // Check if the static map already exists
  const { data } = await supabaseClient
    .from("static-maps")
    .select("*")
    .eq("property_id", propertyId)
    .single();

  // If the static map exists, return the URL
  if (data) {
    return data.url as string;
  }

  // If the static map doesn't exist, generate it
  const blob = await generateStaticMap({ geoLocation });

  // Upload the static map
  const { data: uploadData } = await supabaseClient.storage
    .from("static-maps")
    .upload(`static-maps/${propertyId}.png`, blob);

  // If the upload fails, throw an error
  if (!uploadData) {
    throw new Error("Error uploading static map");
  }

  // Insert the static map into the database
  const path = uploadData.path;
  const url = `https://hnurenvmdqesbvadclkf.supabase.co/storage/v1/object/public/static-maps/${path}`;

  await supabaseClient
    .from("static-maps")
    .insert({ property_id: propertyId, url })
    .select();

  // Return the URL
  return url;
};
