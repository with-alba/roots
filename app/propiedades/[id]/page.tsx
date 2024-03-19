import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { api } from "~/lib/trpc/server";
import { PropertyPage } from "./_shared/property-page";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

// Cache the property details
const getProperty = unstable_cache(async (id: string) => {
  return api.properties.byId({ id });
});

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const id = params.id;

  const property = await getProperty(id);
  const title = `${property.propertyType} en ${property.location.address} | Artifact`;
  const thumbnail = property.thumbnail;
  const description = property.description;

  return {
    title,
    description,
    openGraph: {
      images: thumbnail,
      description,
    },
    twitter: {
      card: "summary_large_image",
      images: thumbnail,
      description,
    },
  };
}

async function Page(props: PropertyPageProps) {
  // Get the property id from the params
  const id = props.params.id;
  // Fetch the property details
  const data = await getProperty(id);

  return <PropertyPage property={data} />;
}

export default Page;
