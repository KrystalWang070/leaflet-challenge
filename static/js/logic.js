var mymap = L.map('map', {
  center: [39.8283, -98.5795],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
maxZoom: 20,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(mymap);


var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link, function(data) {
  createFeatures(data.features);
});

function createFeatures(data) {

  function onEachFeature(feature, layer) {
      layer.bindPopup (feature.properties.mag);
  }



  var earth = L.geoJSON(data, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, coordinate) {
          var fill;
        
          var circles = {
              radius: (5*(feature.properties.mag/Math.log(5))),
              fillColor: fill,
              color: "blue",
              weight: 0.5,
              fillOpacity: 0.25
          };

          return L.circleMarker(coordinate, circles);
      }
  }).addTo(mymap);
  
};
