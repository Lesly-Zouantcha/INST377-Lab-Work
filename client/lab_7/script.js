async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  const request = await fetch(endpoint);

  const cities = await request.json();

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');

      return place.city.match(regex);
    });
  }
  const coords = [];
  function displayMatches(events) {
    const matchArray = findMatches(events.target.value, cities);

    const suggestionsListHtml = matchArray.map((place) => {
      const regex = new RegExp(events.target.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${events.target.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${events.target.value}</span>`);
      const placeName = place.name.replace(regex, `<span class="hl">${events.target.value}</span>`);
      const typeName = place.category.replace(regex, `<span class="hl">${events.target.value}</span>`);

      return `
                   <li>
                       <div class="name">${placeName}</div>
                       <div class="category">${typeName}</div>
                       <div class="city">${cityName}</div>
                       <div class="state">${stateName}</div>
                   </li>
               `;
    }).join('');

    suggestions.innerHTML = suggestionsListHtml;

    coords.push([resturant.name.toUpperCase(), resturant.geocoded_column_1.coordinates]);
    buildMarkers(coords);
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });

  function buildMarkers(locations = []) {
    // Remove old markers
    markers.forEach((m) => map.removeLayer(m));
    markers = [];

    // Check locations
    if (!locations || locations.length <= 0) {
      map.setView([38.83986, -76.941642], 5);
      return;
    }

    // Add new markers
    locations.forEach((loc) => {
      // eslint-disable-next-line max-len
      markers.push(new L.Marker([loc[1][1], loc[1][0]], {draggable: false}).bindPopup(loc[0]).openPopup());
    });
    markers.forEach((m) => map.addLayer(m));

    // Default view
    map.setView([locations[0][1][1], locations[0][1][0]], 12);
  }

  // Event Listeners
  searchInput.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    findMatches(e, data);
  };

  // Build Map Layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW1hdHR1IiwiYSI6ImNrdWw1eGxheTNldGUydXFsbjBpcm52M28ifQ.vm917QE5p4Dk7wvHRRLwUw'
  }).addTo(map);
  map.setView([38.83986, -76.941642], 5);
}

window.onload = windowActions();