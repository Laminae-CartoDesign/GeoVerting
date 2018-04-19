function goHome() {
  document.getElementById("map_section").style.display = "block";
  document.getElementById("locate_position").style.display = "block";
  document.getElementById("help_section").style.display = "none";
  document.getElementById("about_section").style.display = "none";
  document.getElementById("contact_section").style.display = "none";
  document.getElementById("capturing_section").style.display = "none";
  closeNav();
}

function goPerfil(){
  document.getElementById("locate_position").style.display = "none";
  document.getElementById("map_section").style.display = "none";
  document.getElementById("help_section").style.display = "none";
  document.getElementById("about_section").style.display = "none";
  document.getElementById("contact_section").style.display = "none";
  document.getElementById("capturing_section").style.display = "block";
  closeNav();
}

function goHelp() {
  document.getElementById("locate_position").style.display = "none";
  document.getElementById("map_section").style.display = "none";
  document.getElementById("help_section").style.display = "block";
  document.getElementById("about_section").style.display = "none";
  document.getElementById("contact_section").style.display = "none";
  document.getElementById("capturing_section").style.display = "none";
  closeNav();
}

function goAbout() {
  document.getElementById("locate_position").style.display = "none";
  document.getElementById("map_section").style.display = "none";
  document.getElementById("help_section").style.display = "none";
  document.getElementById("about_section").style.display = "block";
  document.getElementById("contact_section").style.display = "none";
  document.getElementById("capturing_section").style.display = "none";
  closeNav();
}

function goContact() {
  document.getElementById("locate_position").style.display = "none";
  document.getElementById("map_section").style.display = "none";
  document.getElementById("help_section").style.display = "none";
  document.getElementById("about_section").style.display = "none";
  document.getElementById("capturing_section").style.display = "none";
  document.getElementById("contact_section").style.display = "block";
  closeNav();
}
