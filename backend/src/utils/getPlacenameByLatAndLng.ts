export async function getPlaceName(lat: number, lon: number) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`,
    {
      headers: {
        "User-Agent": "LocalMarketplace/1.0 (your@email.com)",
        Accept: "application/json",
      },
    }
  );
  const data = await response.json()
  const fullAddress = data.display_name;
  const city = data.address.county
  console.log("S",data)
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return {fullAddress,city};
}