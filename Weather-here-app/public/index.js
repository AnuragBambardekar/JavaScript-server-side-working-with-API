  let lat, lon, weather, loc;
  
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      console.log(lat, lon);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;

      //Get From API
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);

      weather = json.current;
      loc = json.location;

      document.getElementById('summary').textContent = json.current.condition.text;
      document.getElementById('lastupdated').textContent = json.current.last_updated;
      document.getElementById('temp').textContent = json.current.temp_c;
      document.getElementById('temp_f').textContent = json.current.temp_f;
      document.getElementById('location').textContent = json.location.country;
      document.getElementById('region').textContent = json.location.region;
      document.getElementById('name').textContent = json.location.name;
      document.getElementById('localtime').textContent = json.location.localtime;
      document.getElementById('pm2_5').textContent = json.current.air_quality.pm2_5;

    } catch (error) {
      console.error(error);
      weather = { value: -1 };
      document.getElementById('pm2_5').textContent = 'NO READING';
    }

    //Post to DB
    const data = { lat, lon, weather, loc };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    //Get from DB
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);

    });
  } else {
    console.log('geolocation not available');
  }


