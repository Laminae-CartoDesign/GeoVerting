//Funcion para mostrar el formulario de registro
function register() {
  document.getElementById('start_section').style.display='none';
  document.getElementById('regiter_section').style.display='block';
  document.getElementById('firstname').value="";
  document.getElementById('lastname').value="";
  document.getElementById('username').value="";
  document.getElementById('passwordregister').value="";
}

//Funcion para registrar los datos del formulario de registro
function register_done() {
  //Obtenemos los datos
  first_name=document.getElementById('firstname').value;
  second_name=document.getElementById('lastname').value;
  username=document.getElementById('user_name').value;
  password=document.getElementById('passwordregister').value;
  //Comprobamos que se hayan introducido todos los datos
  if (first_name!="" && second_name!="" && username!="" && password!="") {
    //Obtenemos los usuarios existentes
    users = get_user();
    //Creamos un objeto con los datos del nuevo usuario
    new_user = {"username": username, "password": password,
    "firstname": first_name, "second_name": second_name};
    //Incluimos el nuevo usuario en la lista de usuarios existentes
    users.push(new_user);
    //Guardamos los usuarios en el local storage
    set_user(users);
    //Quitamos el formulario y volvemos a la pantalla de inicio
    document.getElementById('regiter_section').style.display='none';
    document.getElementById('start_section').style.display='block';
  }
}

//Funcion del boton back del formulario de registro
function back_bttn() {
  document.getElementById('regiter_section').style.display='none';
  document.getElementById('start_section').style.display='block';
}
