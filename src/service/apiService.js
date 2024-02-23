import axios from "axios";

const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

export async function getMapboxSearchResults(query) {
  try {
    const result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxAPIKey}&types=place`
    );
    return result.data.features;
  } catch (error) {
    throw new Error("An error occurred while fetching search results");
  }
}
