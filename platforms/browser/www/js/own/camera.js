// Funcion para configurar opciones para la camara
function setOptions(srcType) {
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: srcType,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: false,
    correctOrientation: true
  }
  return options;
};

// Funcion que se ejecuta si la foto se toma correctamente
function onSuccess(imageUri) {
  // Get today date
  var today = new Date();
  var now= String(today.getHours()) + String(today.getMinutes()) +
    String(today.getSeconds()) + String(today.getDate()) +
    String((today.getMonth()+1)) + String(today.getFullYear());

  var user = firebase.auth().currentUser.displayName;
  var file_name = user + now;
  console.log(file_name);

  // Create a storage reference
  var storageRef = firebase.storage().ref().child('fotos/'+ user + '/' + file_name);

  // Upload file
  var task = storageRef.putString(imageUri);
  console.log(imageUri, 'base64url');
};

// Funcion que se ejecuta si hay un error al tomar la foto
function onError() {
  console.debug("No se ha podido tomar la foto: " + error, "app");
};


// Funcion para abrir la camara
function openCamera() {
  var srcType = Camera.PictureSourceType.CAMERA;
  var options = setOptions(srcType);
  //var func = createNewFileEntry;

  navigator.camera.getPicture(onSuccess, onError, options);
};
