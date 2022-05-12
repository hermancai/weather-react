export default async function getWeather({ query: { input } }, res) {
  const coordsResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${process.env.WEATHER_API}`
  );
  const coordsJSON = await coordsResponse.json();

  if (coordsJSON.length === 0)
    return res.status(400).json({ error: "No results found." });

  const { lat, lon } = coordsJSON[0];
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${process.env.WEATHER_API}`
  );
  const forecastJSON = await forecastResponse.json();

  res.status(200).json(forecastJSON);
}
