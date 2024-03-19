import type { z } from "zod";
import { omit } from "remeda";
import type {
  PropertiesResponse,
  Property,
  ExtendedProperty,
  MainAttribute,
} from "~/types/property";
import { attributes as attributesMap } from "~/lib/mappings/attributes";
import { coordinates } from "~/lib/utils/coordinates";
import type { Range } from "~/lib/utils/range";
import { isRange } from "~/lib/utils/range";
import type { propertiesFilters } from "../../schema";
import type { PropertiesResponse as MELIResponse } from "./types/properties";
import type { PropertyResponse } from "./types/property";

/* ---------------- Endpoints ---------------- */

const propertiesAPIEndpoint = `${process.env.NEXT_PUBLIC_ML_API_URL}/sites/MLA/search?category=MLA1459&limit=30`;
const propertyAPIEndpoint = `${process.env.NEXT_PUBLIC_ML_API_URL}/items`;
const usersAPIEndpoint = `${process.env.NEXT_PUBLIC_ML_API_URL}/users`;

/* ---------------- Input Parser ---------------- */

/**
 * A function that parses a range to the format that MercadoLibre expects
 * @param range - The range to be parsed
 * @param unit - The unit of the range
 * @returns The range parsed to the format that MercadoLibre expects
 */
const parseRange = (range: Range, unit: string | undefined) => {
  const _unit = unit || "";
  if (!range.from && range.to) {
    return `(*-${range.to}${_unit}]`;
  }

  if (range.from && !range.to) {
    return `[${range.from}${_unit}-*)`;
  }

  return `[${range.from}${_unit}-${range.to}${_unit}]`;
};

/**
 * A function that parses a boolean to the format that MercadoLibre expects
 * @param value - The boolean to be parsed
 * @returns The boolean parsed to the format that MercadoLibre expects
 */
const parseBoolean = (value: boolean) => {
  if (!value) return "242084";

  return "242085";
};

/**
 *
 * @param input - The input to be parsed
 * @returns The input parsed to the format that MercadoLibre expects
 */
const mercadoLibreInputParser = (input: z.infer<typeof propertiesFilters>) => {
  return Object.entries(input).reduce<Record<string, string | number>>(
    (acc, [key, value]) => {
      if (isRange(value)) {
        const attr = attributesMap[key];
        acc[key] = parseRange(
          value,
          attr.type === "range" ? attr.unit?.id : "",
        );
        return acc;
      }

      if (typeof value === "boolean") {
        acc[key] = parseBoolean(value);
        return acc;
      }

      if (Array.isArray(value)) {
        acc[key] = value.join(",");
        return acc;
      }

      acc[key] = value;

      return acc;
    },
    {},
  );
};

/* ---------------- Properties Parser ---------------- */

interface MercadoLibrePropertiesParserArgs {
  input: z.infer<typeof propertiesFilters>;
}

/**
 * A function that gets properties from MercadoLibre
 * @param input - The input to be used to get the properties
 */
export const mercadoLibrePropertiesParser = async ({
  input,
}: MercadoLibrePropertiesParserArgs): Promise<PropertiesResponse> => {
  // Create the URL
  const url: URL = new URL(propertiesAPIEndpoint);

  // Parse the input
  const parsedInput = mercadoLibreInputParser(input);

  // Set the search params
  for (const [key, value] of Object.entries(parsedInput)) {
    url.searchParams.set(key, value.toString());
  }

  // Fetch the data and get the JSON
  const response = await fetch(url.toString());
  const json = (await response.json()) as MELIResponse;

  // Loop through the results and map them to the format that we want
  const properties: Property[] = json.results.map((property) => {
    const geoLocation: Property["geoLocation"] = {
      lat: property.location.latitude,
      lng: property.location.longitude,
    };

    // Encode the coordinates to use them along with the property id as the property id.
    // This is because MercadoLibre doesn't provide the geolocation when fetching a single property.
    const encodedCoords = coordinates.encode(geoLocation);
    const id = `${property.id}-${encodedCoords}`;

    // Get the property type
    const propertyType = property.attributes.find(
      (attr) => attr.id === "PROPERTY_TYPE",
    )?.value_name as Property["propertyType"];

    // Get the thumbnail
    const thumbnail = `https://http2.mlstatic.com/D_NQ_NP_${property.thumbnail_id}-O.webp`;

    // Get the attributes
    const attributes: Property["attributes"] = property.attributes.flatMap(
      (attr) => {
        if (!(attr.id in attributesMap)) return [];

        return {
          id: attr.id,
          name: attr.name,
          value: attr.value_name,
          group: attr.attribute_group_name,
        };
      },
    );

    // Get the location
    const location: Property["location"] = {
      address: property.location.address_line,
      city: property.location.city.name!,
      state: property.location.state.name!,
    };

    // Get the price
    const price: Property["price"] = {
      currency: property.currency_id,
      amount: property.price,
    };

    // Get the main attributes
    const mainAttrFilter = [
      "ROOMS",
      "BATHROOMS",
      "FULL_BATHROOMS",
      "COVERED_AREA",
      "MAX_ROOMS",
      "MAX_BATHROOMS",
      "MAX_COVERED_AREA",
    ];
    const mainAttributes = property.attributes.reduce<
      Property["mainAttributes"]
    >((acc, curr) => {
      if (mainAttrFilter.includes(curr.id)) {
        const baseName = curr.id.replace("MAX_", "").replace("FULL_", "");
        if (!acc.some((attr) => attr.id === baseName)) {
          acc.push({
            id: baseName as MainAttribute,
            value: curr.value_name,
            name: curr.name,
          });
        }
      }
      return acc;
    }, []);

    return {
      id,
      external_marketplace: "MercadoLibre",
      title: property.title,
      permalink: property.permalink,
      propertyType,
      thumbnail,
      attributes,
      location,
      geoLocation,
      price,
      mainAttributes,
    };
  });

  // MercadoLibre doesn't take into account those filters that were
  // not available when the request was made, so you need to manually
  // check if the filter is present in the response. If not, it means
  // no results were found for that filter, so we should return an empty array.
  const meliFilters = json.filters.map((filter) => filter.id);
  const inputFilters = Object.keys(omit(input, ["offset"]));
  const isFilterNotPresent = inputFilters.some(
    (key) => !meliFilters.includes(key),
  );
  if (isFilterNotPresent) {
    return {
      totalCount: 0,
      results: [],
    };
  }

  const totalCount = json.paging.total;

  return {
    totalCount,
    results: properties,
  };
};

/* ---------------- Property Parser ---------------- */
interface MercadoLibrePropertyParserArgs {
  input: { id: string };
}

export const mercadoLibrePropertyParser = async ({
  input,
}: MercadoLibrePropertyParserArgs): Promise<ExtendedProperty> => {
  const [id, encodedCoordinates] = input.id.split("-");
  const response = await fetch(`${propertyAPIEndpoint}/${id}`);
  const property = (await response.json()) as PropertyResponse;

  const propertyType = property.attributes.find(
    (attr) => attr.id === "PROPERTY_TYPE",
  )?.value_name as Property["propertyType"];

  const thumbnail = `https://http2.mlstatic.com/D_NQ_NP_${property.thumbnail_id}-O.webp`;

  const attributes: Property["attributes"] = property.attributes.flatMap(
    (attr) => {
      if (!(attr.id in attributesMap)) return [];

      const attrId = attr.id;

      return {
        id: attrId,
        name: attr.name,
        value: attr.value_name,
        group: attributesMap[attrId].group,
      };
    },
  );

  const location: Property["location"] = {
    address: property.location.address_line,
    city: property.location.city.name,
    state: property.location.state.name,
  };

  const geoLocation: Property["geoLocation"] =
    coordinates.decode(encodedCoordinates);

  const price: Property["price"] = {
    currency: property.currency_id as Property["price"]["currency"],
    amount: property.price,
  };

  const pictures = property.pictures.map((picture) => {
    return `https://http2.mlstatic.com/D_NQ_NP_${picture.id}-F.jpg`;
  });

  const mainAttrFilter = [
    "ROOMS",
    "BATHROOMS",
    "COVERED_AREA",
    "MAX_ROOMS",
    "MAX_BATHROOMS",
    "MAX_COVERED_AREA",
  ];

  const mainAttributes = property.attributes.reduce<Property["mainAttributes"]>(
    (acc, curr) => {
      if (mainAttrFilter.includes(curr.id)) {
        const baseName = curr.id.replace("MAX_", "");
        if (!acc.some((attr) => attr.id === baseName)) {
          acc.push({
            id: baseName as MainAttribute,
            value: curr.value_name,
            name: curr.name,
          });
        }
      }
      return acc;
    },
    [],
  );

  // Description
  const descriptionRes = await fetch(
    `${propertyAPIEndpoint}/${property.id}/description`,
  );
  const description = (await descriptionRes.json()).plain_text;

  // Seller
  const sellerRes = await fetch(`${usersAPIEndpoint}/${property.seller_id}`);
  const sellerJson = await sellerRes.json();

  const seller = {
    id: property.seller_id,
    nickname: sellerJson.nickname as string,
    permalink: sellerJson.permalink as string,
  };

  return {
    id: input.id,
    external_marketplace: "MercadoLibre",
    title: property.title,
    permalink: property.permalink,
    mainAttributes,
    propertyType,
    thumbnail,
    attributes,
    location,
    geoLocation,
    price,
    description,
    pictures,
    seller,
  };
};
