//****************************** LOCATE POSITION *********************************************/
//Funcion que obtiene las coordenadas GPS del dispositivo


// Funcion que ejecuta el posicionamiento
var located = false;
function gnss_positioning() {
  function watchPosition() {
    watchID = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      {maximumAge: 3000, enableHighAccuracy: true}
    );

    function onSuccess(position) {
      user_lat = position.coords.latitude;
      user_lon = position.coords.longitude;
      user_acc = position.coords.accuracy;
      console.log([user_lat, user_lon, user_acc]);
      //Mas cosas aqui
      setMarker(user_lat, user_lon);

      if (located == false) {
        //******************** CALCULAR VERTICES CERCANOS ***************************/
        var distmin = 9999999;
        for (var i = 0; i < geojsonFeature.length; i ++) {
          dist = Math.abs(distancia(geojsonFeature[i].Latitud, geojsonFeature[i].Longitud, user_lat, user_lon));
          console.log(dist, geojsonFeature[i]);
          if (dist < distmin){
            distmin = dist;
            vertice_num = geojsonFeature[i].Numero;
            vertice_lat = geojsonFeature[i].Latitud;
            vertice_lon = geojsonFeature[i].Longitud;
          }
        }
        console.log('distmin: ', distmin);

        located = true;
      };

      var distmin = 100000000000000000000000000000000000000000000000000;
      var dist = Math.abs(distancia(vertice_lat, vertice_lon, user_lat, user_lon));
      if (dist < distmin){
        document.getElementById("locate_position").style.display = "block";
      }
      else {
        document.getElementById("locate_position").style.display = "none";
      }
    };

    function onError(error) {
      console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }
  };
  geolocate=setInterval(watchPosition, 5000);
}





/*
function locate_position(){


    function watchPosition() {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000,
        enableHighAccuracy: true,
      };

      watchID=navigator.geolocation.watchPosition(geolocation, onError, options);

      function geolocation(position) {
        console.log(position);
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        acc = position.coords.accuracy.toFixed(3);
      };

      function onError(error) {
        alert('code: '+error.code+'\n'+'message: '+error.message+'\n');
      }
    };

    geolocate=setInterval(watchPosition, 5000);
};
*/
