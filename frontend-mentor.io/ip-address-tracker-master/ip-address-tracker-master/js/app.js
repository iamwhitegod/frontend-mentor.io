import IPaddress from "./models/Ipaddress";
import generateMap from "./models/Map";
import * as ipaddressViews from "./views/ipaddressViews";

const form = document.querySelector(".ip-address__form");

const state = {};

const ctrlInit = async () => {
  // 1) Add to state & Create a new Ipaddress
  state.clientIp = new IPaddress();

  // 2) Get Client's Ipaddress
  await state.clientIp.getClientIpaddress();

  // 3) Generate Map
  generateMap(
    state.clientIp.result.location.lng,
    state.clientIp.result.location.lat
  );

  // 4) Render UI
  ipaddressViews.renderSearchResults(state.clientIp.result);
};

// SEARCH IP ADDRESS CONTROLLER
const ctrlSearchIp = async () => {
  // 1) Get Ipaddress from user input
  const query = ipaddressViews.getInput();
  if (!query) return;

  // 2) Add to state
  state.ipaddress = new IPaddress(query);

  // 3) Call get Ipaddress
  await state.ipaddress.getIpAddress();

  // 4) Generate map
  generateMap(
    state.ipaddress.result.location.lng,
    state.ipaddress.result.location.lat
  );

  // 4) Render UI
  ipaddressViews.renderSearchResults(state.ipaddress.result);

  ipaddressViews.clearInputs();
};

window.addEventListener("load", ctrlInit);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ctrlSearchIp();
});
