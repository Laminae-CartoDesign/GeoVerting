//****************************** START PAGE *****************************************************/
function sign_in() {
  var $login_form=$('#login_form').addClass('display');
  setTimeout(function() {
    $login_form.addClass('show');
  });

  document.getElementById('button_div').style.display='none';
};

function log_in() {
  //Obtenemos el usuario y contraseña del formulario de log_in
  user=document.getElementById('username').value;
  password=document.getElementById('password').value;
  //Obtenemos todos los usuarios almacenados
  users=get_user();
  //Inicializamos variables de comprobacion
  user_ok=false;
  pass_ok=false;
  //Buscamos el usuario y el password entre los almacenados
  for (i=0; i<users.length; i++) {
    if (user==users[i]['username']) {
      user_ok=true;
      if (password==users[i]['password']) {
        pass_ok=true;
      };
    };
  };
  //Ejecutamos segun se hayan encontrado ambos, solo uno o ninguno
  if (user_ok==true && pass_ok==true) {
    document.getElementById('start_section').style.display='none';
    document.getElementById('navbar_section').style.display='block';
    document.getElementById('map_section').style.display='block';
  }
  else if (user_ok==true && pass_ok==false) {
    document.getElementById('username').value='Contraseña incorrecta';
  }
  else {
    document.getElementById('username').value="Usuario no registrado";
  }
  map._onResize();
}
