const axios = require('axios');
const { getCoordinates } = require('./geoCode');

const getIntermediateCities = async (fromCity, toCity) => {
  try {
    // Get coordinates for fromCity and toCity
    const fromCoordinates = await getCoordinates(fromCity);
    const toCoordinates = await getCoordinates(toCity);

    if (!fromCoordinates || !toCoordinates) {
      throw new Error('Invalid city names provided');
    }

    // Query OpenStreetMap for route details
    const url = `https://router.project-osrm.org/route/v1/driving/${fromCoordinates.longitude},${fromCoordinates.latitude};${toCoordinates.longitude},${toCoordinates.latitude}?steps=true&geometries=geojson`;

    const response = await axios.get(url);

    if (response.data.code === 'Ok' && response.data.routes.length > 0) {
      const route = response.data.routes[0];

      // Extract intermediate steps
      const steps = route.legs.flatMap((leg) =>
        leg.steps.map((step) => ({
          latitude: step.intersections[0].location[1],
          longitude: step.intersections[0].location[0],
        })),
      );

      return steps;
    } else {
      throw new Error('No route found');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getIntermediateCities;
