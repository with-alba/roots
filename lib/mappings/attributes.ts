type AttributeType = "boolean" | "range" | "list" | "number";

interface AttributeValue {
  id: string;
  name: string;
}

export type Attribute = {
  id: string;
  name: string;
  type: AttributeType;
  group: string;
} & (
  | { type: "list"; values: AttributeValue[]; allowedUnits?: never }
  | { type: "range"; unit?: AttributeValue; values?: never }
  | { type: "boolean"; values?: never; allowedUnits?: never }
  | { type: "number"; values?: never; allowedUnits?: never }
);

export const attributes: Record<string, Attribute> = {
  OPERATION: {
    id: "OPERATION",
    name: "Operación",
    type: "list",
    values: [
      { id: "242075", name: "Venta" },
      { id: "242073", name: "Alquiler" },
    ],
    group: "Principales",
  },
  PROPERTY_TYPE: {
    id: "PROPERTY_TYPE",
    name: "Inmueble",
    type: "list",
    values: [{ id: "242062", name: "Departamento" }],
    group: "Principales",
  },
  TOTAL_AREA: {
    id: "TOTAL_AREA",
    name: "Superficie total",
    type: "range",
    unit: { id: "m²", name: "m²" },

    group: "Ficha técnica",
  },
  COVERED_AREA: {
    id: "COVERED_AREA",
    name: "Superficie cubierta",
    type: "range",
    unit: { id: "m²", name: "m²" },

    group: "Ficha técnica",
  },
  BALCONY_AREA: {
    id: "BALCONY_AREA",
    name: "Superficie de balcón",
    type: "range",
    unit: { id: "m²", name: "m²" },
    group: "Otros",
  },
  ROOMS: {
    id: "ROOMS",
    name: "Ambientes",
    type: "range",
    group: "Ficha técnica",
  },
  BEDROOMS: {
    id: "BEDROOMS",
    name: "Dormitorios",
    type: "range",
    group: "Ficha técnica",
  },
  WHEELCHAIR_RAMP: {
    id: "WHEELCHAIR_RAMP",
    name: "Rampa para silla de ruedas",
    type: "boolean",
    group: "Otros",
  },
  TOWER_NUMBER: {
    id: "TOWER_NUMBER",
    name: "Número de torre",
    type: "number",
    group: "Otros",
  },
  FULL_BATHROOMS: {
    id: "FULL_BATHROOMS",
    name: "Baños",
    type: "range",
    group: "Ficha técnica",
  },
  PARKING_LOTS: {
    id: "PARKING_LOTS",
    name: "Cocheras",
    type: "range",
    group: "Ficha técnica",
  },
  FLOORS: {
    id: "FLOORS",
    name: "Cantidad de pisos",
    type: "range",
    group: "Ficha técnica",
  },
  UNIT_FLOOR: {
    id: "UNIT_FLOOR",
    name: "Número de piso de la unidad",
    type: "number",
    group: "Ficha técnica",
  },
  APARTMENT_PROPERTY_SUBTYPE: {
    id: "APARTMENT_PROPERTY_SUBTYPE",
    name: "Tipo de departamento",
    type: "list",
    values: [
      { id: "266324", name: "Semi piso" },
      { id: "266325", name: "Tríplex" },
      { id: "280798", name: "Loft" },
      { id: "280799", name: "Penthhouse" },
      { id: "266319", name: "Departamento" },
      { id: "266320", name: "Dúplex" },
      { id: "266321", name: "Monoambiente" },
      { id: "266322", name: "Ph" },
      { id: "266323", name: "Piso" },
    ],
    group: "Ficha técnica",
  },
  WITH_GATED_COMMUNITY: {
    id: "WITH_GATED_COMMUNITY",
    name: "Con barrio cerrado",
    type: "boolean",
    group: "Otros",
  },
  DISPOSITION: {
    id: "DISPOSITION",
    name: "Disposición",
    type: "list",
    values: [
      { id: "242076", name: "Contrafrente" },
      { id: "242077", name: "Frente" },
      { id: "242078", name: "Interno" },
      { id: "242079", name: "Lateral" },
    ],
    group: "Ficha técnica",
  },
  FACING: {
    id: "FACING",
    name: "Orientación",
    type: "list",
    values: [
      { id: "242328", name: "Sur" },
      { id: "242330", name: "Oeste" },
      { id: "242327", name: "Norte" },
      { id: "242329", name: "Este" },
    ],
    group: "Ficha técnica",
  },
  PROPERTY_AGE: {
    id: "PROPERTY_AGE",
    name: "Antigüedad",
    type: "range",
    unit: { id: "años", name: "años" },
    group: "Ficha técnica",
  },
  MAINTENANCE_FEE: {
    id: "MAINTENANCE_FEE",
    name: "Expensas",
    type: "range",
    unit: { id: "USD", name: "USD" },
    group: "Ficha técnica",
  },
  HAS_INTERNET_ACCESS: {
    id: "HAS_INTERNET_ACCESS",
    name: "Acceso a internet",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_TAP_WATER: {
    id: "HAS_TAP_WATER",
    name: "Agua corriente",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_AIR_CONDITIONING: {
    id: "HAS_AIR_CONDITIONING",
    name: "Aire acondicionado",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_BALCONY: {
    id: "HAS_BALCONY",
    name: "Balcón",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_BOILER: {
    id: "HAS_BOILER",
    name: "Caldera",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_HEATING: {
    id: "HAS_HEATING",
    name: "Calefacción",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_INDOOR_FIREPLACE: {
    id: "HAS_INDOOR_FIREPLACE",
    name: "Chimenea",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_CISTERN: {
    id: "HAS_CISTERN",
    name: "Cisterna",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_KITCHEN: {
    id: "HAS_KITCHEN",
    name: "Cocina",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_DINNING_ROOM: {
    id: "HAS_DINNING_ROOM",
    name: "Comedor",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_MAID_ROOM: {
    id: "HAS_MAID_ROOM",
    name: "Dependencia de servicio",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_BREAKFAST_BAR: {
    id: "HAS_BREAKFAST_BAR",
    name: "Desayunador",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_BEDROOM_SUITE: {
    id: "HAS_BEDROOM_SUITE",
    name: "Dormitorio en suite",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_STUDY: {
    id: "HAS_STUDY",
    name: "Estudio",
    type: "boolean",
    group: "Ambientes",
  },
  SECURITY_TYPE: {
    id: "SECURITY_TYPE",
    name: "Tipo de seguridad",
    type: "list",
    values: [
      { id: "13836687", name: "24 horas" },
      { id: "13836688", name: "Diurno" },
      { id: "13836689", name: "Nocturno" },
      { id: "13836690", name: "Virtual" },
    ],
    group: "Otros",
  },
  WITH_LAUNDRY_CONNECTION: {
    id: "WITH_LAUNDRY_CONNECTION",
    name: "Con conexión para lavarropas",
    type: "boolean",
    group: "Otros",
  },
  WITH_GREEN_AREA: {
    id: "WITH_GREEN_AREA",
    name: "Con área verde",
    type: "boolean",
    group: "Otros",
  },
  IS_SUITABLE_FOR_PETS: {
    id: "IS_SUITABLE_FOR_PETS",
    name: "Admite mascotas",
    type: "boolean",
    group: "Otros",
  },
  HAS_ELECTRIC_GENERATOR: {
    id: "HAS_ELECTRIC_GENERATOR",
    name: "Grupo electrógeno",
    type: "boolean",
    group: "Otros",
  },
  HAS_SAUNA: {
    id: "HAS_SAUNA",
    name: "Sauna",
    type: "boolean",
    group: "Otros",
  },
  HAS_FRIDGE: {
    id: "HAS_FRIDGE",
    name: "Heladera",
    type: "boolean",
    group: "Otros",
  },
  FURNISHED: {
    id: "FURNISHED",
    name: "Amoblado",
    type: "boolean",
    group: "Otros",
  },
  HAS_FRONT_DESK: {
    id: "HAS_FRONT_DESK",
    name: "Recepción",
    type: "boolean",
    group: "Otros",
  },
  HAS_NATURAL_GAS: {
    id: "HAS_NATURAL_GAS",
    name: "Gas natural",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_JACUZZI: {
    id: "HAS_JACUZZI",
    name: "Jacuzzi",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_GARDEN: {
    id: "HAS_GARDEN",
    name: "Jardín",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_LAUNDRY: {
    id: "HAS_LAUNDRY",
    name: "Con lavadero",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_TELEPHONE_LINE: {
    id: "HAS_TELEPHONE_LINE",
    name: "Línea telefónica",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_LIVING_ROOM: {
    id: "HAS_LIVING_ROOM",
    name: "Living",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_PATIO: {
    id: "HAS_PATIO",
    name: "Patio",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_CLOSETS: {
    id: "HAS_CLOSETS",
    name: "Placards",
    type: "boolean",
    group: "Otros",
  },
  HAS_TERRACE: {
    id: "HAS_TERRACE",
    name: "Terraza",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_HALF_BATH: {
    id: "HAS_HALF_BATH",
    name: "Toilette",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_DRESSING_ROOM: {
    id: "HAS_DRESSING_ROOM",
    name: "Vestidor",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_CINEMA_HALL: {
    id: "HAS_CINEMA_HALL",
    name: "Área de cine",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_PLAYGROUND: {
    id: "HAS_PLAYGROUND",
    name: "Área de juegos infantiles",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_LIFT: {
    id: "HAS_LIFT",
    name: "Ascensor",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_BUSINESS_CENTER: {
    id: "HAS_BUSINESS_CENTER",
    name: "Business center",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_TENNIS_COURT: {
    id: "HAS_TENNIS_COURT",
    name: "Cancha de tenis",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_GUEST_PARKING: {
    id: "HAS_GUEST_PARKING",
    name: "Estacionamiento para visitantes",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_GYM: {
    id: "HAS_GYM",
    name: "Gimnasio",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_COMMON_LAUNDRY: {
    id: "HAS_COMMON_LAUNDRY",
    name: "Lavandería",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_GRILL: {
    id: "HAS_GRILL",
    name: "Parrilla",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_SWIMMING_POOL: {
    id: "HAS_SWIMMING_POOL",
    name: "Pileta",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_PLAYROOM: {
    id: "HAS_PLAYROOM",
    name: "Playroom",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_ROOF_GARDEN: {
    id: "HAS_ROOF_GARDEN",
    name: "Roof garden",
    type: "boolean",
    group: "Ambientes",
  },
  HAS_PARTY_ROOM: {
    id: "HAS_PARTY_ROOM",
    name: "Salón de fiestas",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_MULTIPURPOSE_ROOM: {
    id: "HAS_MULTIPURPOSE_ROOM",
    name: "Salón de usos múltiples",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  HAS_SECURITY: {
    id: "HAS_SECURITY",
    name: "Seguridad",
    type: "boolean",
    group: "Comodidades y amenities",
  },
  ITEM_CONDITION: {
    id: "ITEM_CONDITION",
    name: "Condición del ítem",
    type: "list",
    values: [
      { id: "2230284", name: "Nuevo" },
      { id: "2230581", name: "Usado" },
    ],
    group: "Otros",
  },
};
