export interface PropertyResponse {
  accepts_mercadopago: boolean;
  attributes: Attribute[];
  automatic_relist: boolean;
  base_price: number;
  buying_mode: string;
  catalog_listing: boolean;
  catalog_product_id: null;
  category_id: string;
  condition: string;
  coverage_areas: any[];
  currency_id: string;
  date_created: Date;
  deal_ids: any[];
  descriptions: any[];
  domain_id: string;
  health: number;
  id: string;
  initial_quantity: number;
  international_delivery_mode: string;
  last_updated: Date;
  listing_source: string;
  listing_type_id: string;
  location: Location;
  non_mercado_pago_payment_methods: any[];
  official_store_id: number;
  original_price: null;
  parent_item_id: null;
  permalink: string;
  pictures: Picture[];
  price: number;
  sale_terms: SaleTerm[];
  seller_address: SellerAddress;
  seller_contact: SellerContact;
  seller_id: number;
  shipping: Shipping;
  site_id: string;
  status: string;
  sub_status: string[];
  tags: any[];
  thumbnail: string;
  thumbnail_id: string;
  title: string;
  variations: any[];
  video_id: string;
  warranty: null;
}

export interface Attribute {
  id: string;
  name: string;
  value_id: null | string;
  value_name: string;
  value_type: string;
  values: Value[];
}

export interface Value {
  id: null | string;
  name: string;
  struct: Struct | null;
}

export interface Struct {
  number: number;
  unit: string;
}

export interface Location {
  address_line: string;
  city: City;
  country: City;
  neighborhood: City;
  state: City;
  zip_code: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Picture {
  id: string;
  max_size: string;
  quality: string;
  secure_url: string;
  size: Size;
  url: string;
}

export enum Size {
  The500X323 = "500x323",
  The500X328 = "500x328",
  The500X333 = "500x333",
  The500X354 = "500x354",
  The500X374 = "500x374",
}

export interface SaleTerm {
  id: string;
  name: string;
  value_id: string;
  value_name: string;
  value_struct: null;
  value_type: string;
  values: Value[];
}

export interface SellerAddress {
  city: City;
  country: City;
  id: number;
  search_location: SearchLocation;
  state: City;
}

export interface SearchLocation {
  city: City;
  neighborhood: City;
  state: City;
}

export interface SellerContact {
  area_code: string;
  area_code2: string;
  contact: string;
  country_code: string;
  country_code2: string;
  email: string;
  other_info: string;
  phone: string;
  phone2: string;
  webpage: string;
}

export interface Shipping {
  dimensions: null;
  free_shipping: boolean;
  local_pick_up: boolean;
  logistic_type: null;
  methods: any[];
  mode: string;
  store_pick_up: boolean;
  tags: any[];
}
