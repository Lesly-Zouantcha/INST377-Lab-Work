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

  function displayMatches(events) {
    const matchArray = findMatches(events.target.value, cities);

    const suggestionsListHtml = matchArray.map((place) => {
      const regex = new RegExp(events.target.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${events.target.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${events.target.value}</span>`);
      const placeName = place.name.replace(regex, `<span class="hl">${events.target.value}</span>`);
      const typeName = place.type.replace(regex, `<span class="hl">${events.target.value}</span>`);

      return `
                 <li>
                     <span class="name">${placeName}</span>
                     <span class="name">${typeName}</span>
                     <span class="name">${cityName}</span>
                     <span class="name">${stateName}</span>
                 </li>
             `;
    }).join('');

    suggestions.innerHTML = suggestionsListHtml;
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions();