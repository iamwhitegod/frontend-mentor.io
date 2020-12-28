const input = document.querySelector("#search");
const results = document.querySelector(".ip-address__results");

export const getInput = () => input.value;

export const clearInputs = () => (input.value = "");

export const renderSearchResults = (res) => {
  let html = `
  <div class="ip-address__address">
    <span class="ip-address__caption">IP Address</span>
    <p class="ip-address__results-data">${res.ip}</p>
  </div>
  <div class="ip-address__location">
    <span class="ip-address__caption">Location</span>
    <p class="ip-address__results-data">${res.location.city}, ${res.location.country} ${res.location.postalCode}</p>
  </div>
  <div class="ip-address__timezone">
    <span class="ip-address__caption">Timezone UTC</span>
    <p class="ip-address__results-data">UTC ${res.location.timezone}</p>
  </div>
  <div class="ip-address__isp">
    <span class="ip-address__caption">ISP</span>
    <p class="ip-address__results-data">${res.isp}</p>
  </div>
  `;

  results.innerHTML = "";

  results.insertAdjacentHTML("beforeend", html);
};
