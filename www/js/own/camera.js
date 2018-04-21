function cameraTakePicture() {
  document.getElementById("submit_bttn").style.display = "none";
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
   });

   function onSuccess(imageData) {
      image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
      document.getElementById("myImage").style.display = "block";
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
}
