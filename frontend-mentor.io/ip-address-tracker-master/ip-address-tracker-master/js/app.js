import IPaddress from "./models/Ipaddress";
import generateMap from "./models/Map";
import * as ipaddressViews from "./views/ipaddressViews";

const form = document.querySelector(".ip-address__form");

const state = {};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ctrlSearchIp();
});
