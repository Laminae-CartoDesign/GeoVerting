//****************************** LOCATE POSITION *********************************************/
//Funcion que obtiene las coordenadas GPS del dispositivo
var marker;
x = 0;
 function locate_position(){
  located=false;
   //Creamos un popup para mostrar la precision
  	var popup = document.createElement('div');
    popup.className = 'accuracy';
    popup.id = 'accuracy';
    document.body.appendChild(popup);
    document.getElementById('accuracy').innerHTML='Wait for accuracy';

    function watchPosition() {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000,
        enableHighAccuracy: true,
      };

      watchID=navigator.geolocation.watchPosition(geolocation, onError, options);

      function geolocation(position) {
        longitude_pre=position.coords.longitude;
        latitude_pre=position.coords.latitude;
        accuracy_pre=position.coords.accuracy.toFixed(3);
        if (typeof(marker) == 'undefined') {
          //nothing
        }
        else {
          map.removeLayer(marker);
        }
        if (typeof(marker) == 'undefined') {
          marker = setMarker(latitude_pre, longitude_pre);

          map.setView([latitude, longitude], 19);
          located=true;
        }
        else {
          marker.setLatLng(latitude_pre, longitude_pre);
          map.setView([latitude, longitude], 19);
          located=true;
        }
        var acc_box=document.getElementById('accuracy');
        if (acc_box) {
          document.getElementById('accuracy').innerHTML='Accuracy: '+accuracy_pre+' m'
        }

      };

      function onError(error) {
        alert('code: '+error.code+'\n'+'message: '+error.message+'\n');
      }
    };

    geolocate=setInterval(watchPosition, 5000);
		popup.parentNode.removeChild(popup);
    document.body.appendChild(popup);
};



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
