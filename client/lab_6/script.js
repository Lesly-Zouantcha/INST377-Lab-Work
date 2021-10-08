async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  let request = await fetch(endpoint);

  let cities = await request.json();

  function findMatches(wordToMatch, cities) {
    return types.filter(place=> {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex);
    }); }

  function displayMatches(event) {
    const matchArray = findMatches(events.target.value, cities);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class = "name"> ${place.name}, ${place.city}, ${place.state}</span
            </li>`;
    }).join('');

    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions();


