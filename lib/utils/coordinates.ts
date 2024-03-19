/**
 * Why do we need to encode coordinates?
 * MercadoLibre doesn't return the geolocation when fetching a property, so we need to encode the coordinates and send them in the URL, together with its ID.
 */

interface EncodeCoordinatesArgs {
  lat: number;
  lng: number;
}

/**
 * A function that encodes coordinates.
 * @param lat - The latitude
 * @param lng - The longitude
 * @returns A string containing the encoded coordinates
 */
const encode = ({ lat, lng }: EncodeCoordinatesArgs) => {
  const coords = `${lat},${lng}`;
  return btoa(coords)
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '='
};

/**
 * A function that decodes coordinates.
 * @param encodedCoords - A string containing the encoded coordinates
 * @returns An object containing the latitude and longitude
 */
function decode(encodedCoords: string) {
  // Regular expression to check if the encodedCoords is possibly a valid Base64 URL-safe string
  const base64UrlPattern = /^[A-Za-z0-9\-_]+$/;

  // Validate the encodedCoords format
  if (!base64UrlPattern.test(encodedCoords)) {
    throw new Error("Invalid encoded coordinates format.");
  }

  const base64String = encodedCoords
    .replace(/-/g, "+") // Convert '-' back to '+'
    .replace(/_/g, "/"); // Convert '_' back to '/'
  const decodedString = atob(base64String);
  const parts = decodedString.split(",");

  if (parts.length !== 2) {
    throw new Error("Decoded string does not contain valid coordinates.");
  }

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);

  if (isNaN(lat) || isNaN(lng)) {
    throw new Error("Coordinates are not valid numbers.");
  }

  return {
    lat,
    lng,
  };
}

export const coordinates = {
  encode,
  decode,
};
