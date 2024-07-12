const { getCityName } = require('./geoCode');
const getIntermediateCities = require('./getIntermediateCitiesCodes');

exports.getCities = async (fromCity, toCity) => {
  const cities = await getIntermediateCities(fromCity, toCity);
  const cityNames = await Promise.all(
    cities.map(async ({ latitude, longitude }) => {
      const cityName = await getCityName(latitude, longitude);
      return cityName ? cityName : 'City name not found';
    }),
  );
  return [...new Set(cityNames)];
};
