type Currency = "ARS" | "USD";
type ExternalMarketplace = "MercadoLibre";
type PropertyType =
  | "Semi piso"
  | "Tríplex"
  | "Loft"
  | "Penthouse"
  | "Departamento"
  | "Dúplex"
  | "Monoambiente"
  | "Ph"
  | "Piso";

export type MainAttribute = "ROOMS" | "BATHROOMS" | "COVERED_AREA";

interface Attribute {
  id: string | number;
  name: string;
  value: string;
  group: string;
}

interface Seller {
  id: string | number;
  nickname: string;
  permalink: string;
}

export interface Property {
  id: string;
  external_marketplace: ExternalMarketplace | undefined;
  title: string;
  propertyType: PropertyType;
  thumbnail: string;
  permalink: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  geoLocation: {
    lat: number;
    lng: number;
  };
  price: {
    currency: Currency;
    amount: number;
  };
  mainAttributes: {
    id: MainAttribute;
    value: string;
    name: string;
  }[];
  attributes: Attribute[];
}

export interface ExtendedProperty extends Property {
  pictures: string[];
  description: string;
  seller: Seller;
}

export interface PropertiesResponse {
  totalCount: number;
  results: Property[];
}
