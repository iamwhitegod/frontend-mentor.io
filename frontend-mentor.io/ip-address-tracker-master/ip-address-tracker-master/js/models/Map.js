import leaflet from "leaflet";

const mapContainer = document.querySelector("#map");

export default function generateMap(lng, lat) {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoid2hpdGVnb2QiLCJhIjoiY2s5Y3Q5bm52MDdsOTNobzhvenp6MnNsdCJ9.vc6KagoZn4bn0JtaLazS7g";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [lng, lat], // starting position [lng, lat]
    zoom: 11.5, // starting zoom
    draggable: false,
    scrollZoom: false,
    interactive: false,
  });

  const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
}
