// =============================
// ========== LEAFLET ==========
// =============================
var lat, lon, map
function create_map() {
  try {
    map.off();
    map.remove();
  }
  catch (error) {
  }
  map = L.map('mapid').setView([39.5, -2.8], 5);

  // load a tile layer
  var OpenStreetMap =L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 20,
        minZoom: 11
      });
  //OpenStreetMap.addTo(map)
  var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
          maxZoom: 20,
          attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });
  var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
     maxZoom: 19,
       attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });
  Esri_WorldImagery.addTo(map)

  //Creamos marker customizado
  var geojsonMarkerOptions = new L.Icon();
  geojsonMarkerOptions.options.iconUrl = './img/punta_pointer.png';
  geojsonMarkerOptions.options.iconAnchor = new L.Point(15, 60),
  geojsonMarkerOptions.options.iconSize   = new L.Point(30, 60);

  var markersLayer = new L.markerClusterGroup({
    //disableClusteringAtZoom: 15,
    maxClusterRadius:70,
    polygonOptions: {
        color: '#6600cc',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.3
      }
  });

  var basemaps = {
    "Street Map" : OpenStreetMap,
    "Grayscale" : OpenStreetMap_BlackAndWhite,
    "Terrain Map" : OpenTopoMap,
    "Satellite Imagery": Esri_WorldImagery
};
  L.control.layers(basemaps).addTo(map);

  geojsonFeature.forEach(function(vert){
    lat = vert.Latitud;
    lon = vert.Longitud;
    pnts = vert.Points;
    
    var geo = [lat,lon];
    //var geo = L.latLng(lat,lon);

    var popup = '<center><b>' + vert.Nombre.split() + '</b><br>' + vert.Hort + '</center>';
    var icon_type
    switch (pnts) {
        case 10:
        icon_type = './img/icons/marker-icon-blue.png';
        break;
        case 20:
        icon_type = './img/icons/marker-icon-green.png';
        break;
        case 30:
        icon_type = './img/icons/marker-icon-yellow.png';
        break;
        case 40:
        icon_type = './img/icons/marker-icon-orange.png';
        break;
        case 50:
        icon_type = './img/icons/marker-icon-red.png';
        break;
        default:
        icon_type = './img/icons/marker-icon-blue.png'
        break;
    }   
        
     

    icono = L.icon({
        iconUrl: icon_type
        
    })

    //Add marker at festival locations
    var vertexMarker = new L.marker(geo, {icon: icono}).bindPopup(popup);

    //vertexMarker.addTo(map);
    markersLayer.addLayer(vertexMarker);
    
    markersLayer.addTo(map);
  });
  
  
};

