async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  let request = await fetch(endpoint);

  let types = await request.json();

  function findMatches(wordToMatch, types) {
    return types.filter(place=> {
      const regex = new RegExp(wordToMatch, 'gi');
      return restaurant.type.match(regex) || restaurant.name.match(regex);
    }); }

  function displayMatches(event) {
    const matchArray = findMatches(events.target.value, types);
    const html = matchArray.map(restaurant => {
        return `
            <li>
                <span class = "name"> ${restaurant.name}</span>
                <span class = "type"> ${restaurant.type}</span>
                <span class = "address"> ${restaurant.address_line_1}</span>
                <span class = "city"> ${restaurant.city}</span>
                <span class = "zip"> ${restaurant.zip}</span>
            </li>
            
            `;

    }).join('');

    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions();


