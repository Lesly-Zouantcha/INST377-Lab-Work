async function setup() {
  /**
     * API Endpoint
     *
     * @type {string}
     */
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  
  /**
     * API Search Request
     *
     * @type {Object}
     */
  let request = await fetch(endpoint);
  
  /**
     * API Search Result
     *
     * @type {Object}
     */
  let data = await request.json();
  
  /**
     * Query Result Table
     *
     * @type {DOMElement}
     */
  const table = document.querySelector("#result-table");
  
  /**
     * Query Result Table tbody
     *
     * @type {DOMElement}
     */
  const tableResults = document.querySelector("#result-table-results");
  
  /**
     * Query No Results Notice
     *
     * @type {DOMElement}
     */
  const noResults = document.querySelector("#no-results");
  
  /**
     * Search Query Form
     *
     * @type {DOMElement}
     */
  const searchForm = document.querySelector("#search-form");
  
  /**
     * Search Query Term Input
     *
     * @type {DOMElement}
     */
  const searchTerm = document.querySelector("#search-term");
  
  /**
     * Find search result matches by term
     *
     * @param {Object} Firing event
     * @param {Object} Search Data
     */

  function findMatches(e, data = []) {
    // Validate input
    if (searchTerm.value.length <= 2) {
      buildResultUI();
      return;
    }
  
    // Variables
    const query = searchTerm.value.toLowerCase(); // Case insensitive
    const basis = document.querySelector('input[name="search_type"]:checked').value;
    let results = [];
  

  
    // Build UI with results
    buildResultUI(results);
  }
  
  /**
     * Build the result UI section
     *
     * @param {Array} [results=[]]
     */

  function buildResultUI(results = []) {
    // Validate input
    if (!results || !(results instanceof Array) || results.length <= 0) {
      noResults.classList.remove("is-hidden");
      table.classList.add("is-hidden");
    } else {
      noResults.classList.add("is-hidden");
      table.classList.remove("is-hidden");
    }
  
    // Variables
    const term = searchTerm.value;
    const regex = new RegExp(term, "gi");
    const fragment = document.createDocumentFragment();
  
    // Build Result Rows
    (results || []).splice(0, ).forEach((resturant) => {
      // Variables
      const tr = document.createElement('tr');
  
      // Attributes
      tr.innerHTML = `<td>${resturant.name.toUpperCase()}</td><td>${resturant.type}</td><td>${resturant.address_line_1}</td><td>${resturant.city}</td><td>${resturant.zip}</td>`
        .replace(regex, "<b class='has-background-info'>" + term.toUpperCase() + "</b>");
  
      // Append
      fragment.appendChild(tr);
    });
  
    // Append
    tableResults.innerHTML = "";
    tableResults.appendChild(fragment);
  }
  
  // Event Listeners
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    findMatches(e, data);
  };
  searchTerm.onkeyup = (e) => findMatches(e, data);
}
  
// Load API data automatically
window.onload = (e) => setup();