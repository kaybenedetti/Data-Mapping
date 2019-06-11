var myMap = L.map("map", {
  center: [13.1, 43.5],
  zoom: 2
});
function getColor(magnitude) {
  switch (true) {
    case magnitude > 5:
      return "#ea2c2c";
    case magnitude > 4:
      return "#ea822c";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "#eecc00";
    case magnitude > 1:
      return "#d4ee00";
    default:
      return "#98ee00";
  }
};

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude ;
};

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(baseURL, function (data) {
  data.features.forEach(function(output) {
    L.geoJson(data, {
      pointToLayer: function (output, location) {
        return L.circleMarker(location)
      },
      style: {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(output.properties.mag),
        color: "#000000",
        stroke: true,
        weight: .25,
        radius: getRadius(output.properties.mag)
      },

      onEachoutput: function (output, layer) {
        layer.bindPopup("magnitude: " + output.properties.mag + "<br/>location: " + output.properties.place)
      }
    }).addTo(myMap)
  })
});