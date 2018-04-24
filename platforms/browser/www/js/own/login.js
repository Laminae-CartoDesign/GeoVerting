//****************************** START PAGE *****************************************************/
function sign_in() {
  var $login_form=$('#login_form').addClass('display');
  setTimeout(function() {
    $login_form.addClass('show');
  });

 $('#button_div').css('display', 'none');
};

function log_in() {
  //Obtenemos el usuario y contraseña del formulario de log_in
  user=$('#username').val();
  password=$('#password').val();
  //Guardamos el usuario con los valores
  firebase.auth().signInWithEmailAndPassword(user, password)
  .then(function() {
    map._onResize();
    $('#start_section').css('display', 'none');
    $('#navbar_section').css('display', 'block');
    $('#map_section').css('display', 'block');
  })
  .catch(function(error) {
    if (error.code === 'auth/wrong-password') {
      $('#username').val("Contraseña incorrecta");
    } else {
      $('#username').val("Usuario no registrado");         
    }
  });
}



