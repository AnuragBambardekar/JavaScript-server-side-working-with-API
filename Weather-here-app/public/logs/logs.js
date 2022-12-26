const mymap = L.map('mymap').setView([0, 0], 1);
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);


getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);

    let txt = `The weather here at ${item.loc.name}, ${item.loc.region}, ${item.loc.country} (${item.lat}&deg;,
    ${item.lon}&deg;) is ${item.weather.condition.text} with
    a temperature of ${item.weather.temp_c}&deg; C.`;

    if (item.weather.air_quality.pm2_5 < 0) {
      txt += '  No air quality reading.';
    } else {
      txt += `  The concentration of particulate matter 
    (pm2.5) is ${item.weather.air_quality.pm2_5} 
    µg/m³ last read on ${item.weather.last_updated}`;
    }
    marker.bindPopup(txt);
  }
  console.log(data);
}
