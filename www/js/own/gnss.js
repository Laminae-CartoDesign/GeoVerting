// =============================
// ========== LEAFLET ==========
// =============================

// MAPA Y CAPAS
var lat, lon

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

///////////////////////////////////////////////////////


//****************************** LOCATE POSITION *********************************************/
//Funcion que obtiene las coordenadas GPS del dispositivo
var marker;
x = 0;
 
located=false;
  //Creamos un popup para mostrar la precision
var popup = document.createElement('div');
popup.className = 'accuracy';
popup.id = 'accuracy';
document.body.appendChild(popup);
document.getElementById('accuracy').innerHTML='Wait for accuracy';

var options = {
  enableHighAccuracy: true,
  maximumAge: 3600000,
  timeout: 6000
};

function getLocation() {
  if (window.navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, options);
  } else {
    alert("Geolocation not supported in this browser.");
  }
}
    
    
function locationSuccess(position) {
  
  var current_lon = position.coords.longitude;
  var current_lat = position.coords.latitude;
  var current_acc = position.coords.accuracy;

  
  /*var acc_box=document.getElementById('accuracy');
  if (acc_box) {
    document.getElementById('accuracy').innerHTML='Accuracy: '+accuracy_pre+' m'
  }*/
  marker = setMarker(current_lat, current_lon);

  map.setView([latitude,longitude],12);

  distmin = 10;
  list_distmin=[];
  geojsonFeature.forEach(function(vert){

    dist=Math.abs(distancia(vert.Latitud,vert.Longitud,current_lat,current_lon));
    if (dist<distmin){
      distmin=dist;
      list_distmin.push([vert.Nombre,dist]);
      
    }


  });
  console.log('distmin: ', distmin);
  console.log(list_distmin);


};

function locationError(error) {
  alert('code: '+error.code+'\n'+'message: '+error.message+'\n');
}
      /*popup.parentNode.removeChild(popup);
      document.body.appendChild(popup);*/


    //geolocate=setInterval(watchPosition, 5000);
		


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




    




//****************************** LOCATION SELECTION *********************************************/
x = 0;
function onMapClick(e) {
  document.getElementById('myImage').style.display="none";
  latitude= e.latlng.lat;
  longitude= e.latlng.lng;
  x++;
  if (x <=1) {
    myIcon = L.icon({
  	iconUrl: 'img/capturewhite.svg',
  	iconSize: [20, 20]
  });

  popup = document.createElement('div');
  popup.className = 'locationsetting';
  popup.id = 'digitalizeoptions';

  var message1 = document.createElement('div');
  message1.innerHTML = "SUBMIT";
  message1.className = 'GPS';
  message1.id = 'GPS';
  message1.onclick = function showCapturingForm(){
              document.getElementById('map_section').style.display='none';
              document.getElementById('capturing_section').style.display='block';
              popup.parentNode.removeChild(popup);
              x++;
          };

  var message2 = document.createElement('div');
  message2.innerHTML = "DELETE";
  message2.className = 'manual';
  message2.id = 'manual';
  message2.onclick = function removeMarker(){
              //alert("I am an alert box!");
              map.removeLayer(marker);
              popup.parentNode.removeChild(popup);
              x=0;
          };

  popup.appendChild(message1);
  popup.appendChild(message2);
  document.body.appendChild(popup);

  marker = L.marker([latitude, longitude],{icon: myIcon}).bindPopup(popup).addTo(map);
  }
}

function setMarker(latitude_input, longitude_input) {
  if (typeof(marker) == 'undefined') {
    //nothing
  }
  else {
    map.removeLayer(marker);
  }
	latitude= latitude_input;
	longitude= longitude_input;

	myIcon = L.icon({
		iconUrl: 'img/capturewhite.svg',
		iconSize: [20, 20]
	});

	marker=L.marker([latitude, longitude],{icon: myIcon}).addTo(map);
}
