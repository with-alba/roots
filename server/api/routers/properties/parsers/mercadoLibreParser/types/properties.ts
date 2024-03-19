/* eslint-disable @typescript-eslint/no-explicit-any -- Can be any, external API */
export interface PropertiesResponse {
  available_currencies: AvailableCurrencies;
  available_filters: AvailableFilter[];
  available_sorts: Sort[];
  country_default_time_zone: string;
  currency: Currency;
  filters: Filter[];
  paging: Paging;
  pdp_tracking: PDPTracking;
  results: Property[];
  site_id: SiteID;
  sort: Sort;
}

export interface AvailableCurrencies {
  conversions: Conversions;
  currencies: Currency[];
}

export interface Conversions {
  ars_usd: number;
  usd_ars: number;
}

export interface Currency {
  id: string;
  symbol: string;
}

export interface AvailableFilter {
  id: string;
  name: string;
  type: Type;
  values: AvailableFilterValue[];
}

export enum Type {
  Boolean = "boolean",
  Range = "range",
  String = "STRING",
  Text = "text",
}

export interface AvailableFilterValue {
  id: string;
  name: string;
  results: number;
}

export interface Sort {
  id?: string;
  name?: string;
}

export interface Filter {
  id: string;
  name: string;
  type: Type;
  values: FilterValue[];
}

export interface FilterValue {
  id: string;
  name: string;
  path_from_root: Sort[];
}

export interface Paging {
  limit: number;
  offset: number;
  primary_results: number;
  total: number;
}

export interface PDPTracking {
  group: boolean;
  product_info: any[];
}

export interface Property {
  accepts_mercadopago: boolean;
  attributes: Attribute[];
  available_quantity: number;
  buying_mode: BuyingMode;
  catalog_listing: boolean;
  catalog_product_id: null;
  category_id: CategoryID;
  condition: Condition;
  currency_id: CurrencyID;
  discounts: null;
  domain_id: DomainID;
  id: string;
  installments: null;
  inventory_id: null;
  listing_type_id: ListingTypeID;
  location: Location;
  official_store_id: number | null;
  official_store_name?: string;
  order_backend: number;
  original_price: null;
  permalink: string;
  price: number;
  promotions: any[];
  sale_price: null;
  seller: Seller;
  seller_contact: SellerContact;
  shipping: Shipping;
  site_id: SiteID;
  stop_time: Date;
  thumbnail: string;
  thumbnail_id: string;
  title: string;
  use_thumbnail_id: boolean;
  variation_filters?: VariationFilter[];
  winner_item_id: null;
}

export interface Attribute {
  attribute_group_id: AttributeGroupID;
  attribute_group_name: AttributeGroupName;
  id: string;
  name: string;
  source: number;
  value_id: null | string;
  value_name: string;
  value_struct: Struct | null;
  value_type: ValueType;
  values: AttributeValue[];
}

export enum AttributeGroupID {
  AdditionalCharacteristicsOfModel = "ADDITIONAL_CHARACTERISTICS_OF_MODEL",
  Comoyamen = "COMOYAMEN",
  Find = "FIND",
  Main = "MAIN",
  MainCharacteristicsOfDevelopment = "MAIN_CHARACTERISTICS_OF_DEVELOPMENT",
  Others = "OTHERS",
}

export enum AttributeGroupName {
  CaracterísticasAdicionalesDelModelo = "Características adicionales del modelo",
  CaracterísticasPrincipalesDelDesarrollo = "Características principales del desarrollo",
  ComodidadesYAmenities = "Comodidades y amenities",
  FichaTécnica = "Ficha técnica",
  Otros = "Otros",
  Principales = "Principales",
}

export interface Struct {
  number: number;
  unit: Unit;
}

export enum Unit {
  M = "m²",
}

export enum ValueType {
  Boolean = "boolean",
  List = "list",
  Number = "number",
  NumberUnit = "number_unit",
  String = "string",
}

export interface AttributeValue {
  id: null | string;
  name: string;
  source: number;
  struct: Struct | null;
}

export enum BuyingMode {
  Classified = "classified",
}

export enum CategoryID {
  Mla401685 = "MLA401685",
  Mla401806 = "MLA401806",
}

export enum Condition {
  New = "new",
  Used = "used",
}

export enum CurrencyID {
  Usd = "USD",
}

export enum DomainID {
  MlaDevelopmentApartmentsForSale = "MLA-DEVELOPMENT_APARTMENTS_FOR_SALE",
  MlaIndividualHousesForSale = "MLA-INDIVIDUAL_HOUSES_FOR_SALE",
}

export enum ListingTypeID {
  GoldPremium = "gold_premium",
}

export interface Location {
  address_line: string;
  city: Sort;
  country: Sort;
  latitude: number;
  longitude: number;
  neighborhood: Sort;
  state: Sort;
  subneighborhood: null;
  zip_code: string;
}

export interface Seller {
  id: number;
  nickname: string;
}

export interface SellerContact {
  area_code: string;
  area_code2: string;
  contact: string;
  email: string;
  other_info: OtherInfo;
  phone: string;
  phone2: string;
  webpage: string;
}

export enum OtherInfo {
  Asdasd223 = "asdasd223",
  Empty = "",
}

export interface Shipping {
  benefits: null;
  free_shipping: boolean;
  logistic_type: null;
  mode: Mode;
  promise: null;
  store_pick_up: boolean;
  tags: any[];
}

export enum Mode {
  NotSpecified = "not_specified",
}

export enum SiteID {
  Mla = "MLA",
}

export enum VariationFilter {
  Bedrooms = "BEDROOMS",
  CoveredArea = "COVERED_AREA",
  FullBathrooms = "FULL_BATHROOMS",
  ModelName = "MODEL_NAME",
  ParkingLots = "PARKING_LOTS",
  Rooms = "ROOMS",
  TotalArea = "TOTAL_AREA",
  UnitName = "UNIT_NAME",
}
