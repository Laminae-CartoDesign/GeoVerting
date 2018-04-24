//Funcion para mostrar el formulario de registro
function register() {
  $('#start_section').css('display', 'none');
  $('#regiter_section').css('display', 'block');
  $('#firstname').val('');
  $('#lastname').val('');
  $('#username').val('');
  $('#passwordregister').val('');
}

//Funcion para registrar los datos del formulario de registro
function register_done() {
  //Obtenemos los datos
  first_name=$('#firstname').val();
  second_name=$('#lastname').val();
  username=$('#user_name').val();
  password=$('#passwordregister').val();

  firebase.auth().createUserWithEmailAndPassword(username, password)
  .then(function(){
    $('#regiter_section').css('display', 'none');
    $('#start_section').css('display', 'block')
  })
  .catch(function (err) {
   // Handle errors
  });
}

//Funcion del boton back del formulario de registro
function back_bttn() {
  $('#regiter_section').css('display', 'none');
  $('#start_section').css('display', 'block');
}
