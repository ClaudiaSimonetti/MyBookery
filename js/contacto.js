function validateForm() {

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var consulta = document.getElementById("consulta").value;

    var nombreError = document.getElementById("nombre-error");
    var apellidoError = document.getElementById("apellido-error");
    var emailError = document.getElementById("email-error");
    var consultaError = document.getElementById("consulta-error");

    nombreError.innerText="";
    apellidoError.innerText="";
    emailError.innerText="";
    consultaError.innerText="";
    

    nombre.classList.remove("is-invalid");
    apellido.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    consulta.classList.remove("is-invalid");

    if (nombre.value.trim() === "") {
      nombreError.innerText = "Ingrese su nombre.";
      nombre.classList.add(is-invalid);
      return false;
    }
    if (apellido.value.trim() === "") {
      apellidoError.innerText = "Ingrese su apellido.";
      apellido.classList.add(is-invalid);
      return false;
    }
    if (email.value.trim() === "") {
      emailError.innerText = "Ingrese un email válido.";
      email.classList.add(is-invalid);
      return false;
    }
    if (consulta.value.trim() === "") {
      consultaError.innerText = "Ingrese su consulta.";
      consulta.classList.add(is-invalid);
      return false;
    }

    return true;

 
}
  

  