// Map
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/satellite-streets-v12", // style URL
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 13, // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: "#FF5A5F" })
  .setLngLat(listing.geometry.coordinates)
  // Marker Popup
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking.</p>`)
  )
  .addTo(map);