import leaflet from "leaflet";

const mapContainer = document.querySelector("#map");

export default function generateMap(lng, lat) {
  // mapboxgl.accessToken =
  //   "pk.eyJ1Ijoid2hpdGVnb2QiLCJhIjoiY2s5Y3Q5bm52MDdsOTNobzhvenp6MnNsdCJ9.vc6KagoZn4bn0JtaLazS7g";

  // const map = new mapboxgl.Map({
  //   container: "map",
  //   style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  //   center: [lng, lat], // starting position [lng, lat]
  //   zoom: 10, // starting zoom
  // });

  // const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

  leaflet.map(mapContainer, {
    center: [lat, lng],
    zoom: 13,
  });

  leaflet.map(mapContainer).setView([lat, lng], 13);

  leaflet
    .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map);
}
