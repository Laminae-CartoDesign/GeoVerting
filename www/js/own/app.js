/*Funcion para registrar un usuario en el local storage*/
function set_user(data) {
  localStorage.setItem('users', JSON.stringify(data));
};

/*Funcion para obtener los usuarios del local storage*/
function get_user() {
  if (localStorage.getItem('users') === null) {
    return [];
  }
  else {
    return JSON.parse(localStorage.getItem('users'));
  }
};

/********************** DOCUMENT ON READY *************************************/
$(document).ready( function () {
  getLocation()
});


var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};

app.initialize();
