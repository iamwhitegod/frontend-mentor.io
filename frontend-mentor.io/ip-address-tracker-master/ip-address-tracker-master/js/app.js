import axios from "axios";

const form = document.querySelector(".ip-address__form");
const mapContainer = document.querySelector("#map");
const results = document.querySelector(".ip-address__results");

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2hpdGVnb2QiLCJhIjoiY2s5Y3Q5bm52MDdsOTNobzhvenp6MnNsdCJ9.vc6KagoZn4bn0JtaLazS7g";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

class Ipaddress {
  constructor(query) {
    this.query = query;
  }

  async getIpAddress() {
    try {
      const results = await axios(
        `https://geo.ipify.org/api/v1?apiKey=at_IDRgiq72BInxrEa0x3FZme0KrGNXs&ipAddress=${this.query}`
      );

      console.log(results);
    } catch (err) {
      console.log(err);
    }
  }
}

new Ipaddress("192.212.174.101").getIpAddress().then(console.log(results));
