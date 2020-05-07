// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojsonn", createMarkers);

 
  
  // Grab the data with d3
  function createMarkers(data) {


    // Loop through data
    for (var i = 0; i < data.length; i++) {

        // Set the data location property to a variable
    var location = data[i];

    // Check for location property
    if (location) {
        markers.addLayer(L.marker([data[i].geometry.coordinates[1],data[i].geometry.coordinates[0]]).bindPopup(data[i].properties.mag));
      }
    }
  
    // Add our marker cluster layer to the map
    createMap(L.layerGroup(markers));
  
  };
  