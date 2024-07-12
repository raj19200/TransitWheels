const axios = require('axios');
exports.getCoordinates = async (city) => {
  const apiKey = process.env.GEOCODING_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}&limit=1`;
  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error(`No coordinates found for city: ${city}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.getCityName = async (lat, lon) => {
  const apiKey = process.env.GEOCODING_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&pretty=1`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      return (
        response.data.results[0].components.city ||
        response.data.results[0].components.town ||
        response.data.results[0].components.village ||
        response.data.results[0].components.county
      );
    } else {
      throw new Error('City name not found for coordinates');
    }
  } catch (error) {
    console.error('Error fetching city name:', error.message);
    return null;
  }
};
