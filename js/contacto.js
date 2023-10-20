let errorMessageName = document.getElementById("nombre-error")
let errorMessageSurname = document.getElementById("apellido-error")
let errorMessageEmail = document.getElementById("email-error")
let errorMessageConsulta = document.getElementById("consulta-error")

function contactFormCleaner(){
  document.getElementById('nombre').value = "";
  document.getElementById('apellido').value = "";
  document.getElementById('email').value = "";
  document.getElementById('consulta').value = "";
  errorMessageName.innerHTML = "";
  errorMessageSurname.innerHTML = "";
  errorMessageEmail.innerHTML = "";
  errorMessageConsulta.innerHTML = "";
}

function contactFormValidation(){
  let nameValue = document.getElementById("nombre").value
  let surnameValue = document.getElementById("apellido").value
  let emailValue = document.getElementById("email").value
  let consultaValue = document.getElementById("consulta").value

  if(!nameValue.match(/^[a-zA-ZÀ-ÿ\s]{2,20}$/)){
    errorMessageName.innerHTML = '<p>Verifique el dato ingresado. Solo se permiten letras.</p>';
  }else{
    errorMessageName.innerHTML = "";
  }

  if(!surnameValue.match(/^[a-zA-ZÀ-ÿ\s]{2,20}$/)){
    errorMessageSurname.innerHTML = '<p>Verifique el dato ingresado. Solo se permiten letras.</p>';
  }else{
    errorMessageSurname.innerHTML = "";
  }

  if(!emailValue.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    errorMessageEmail.innerHTML = '<p>Verifique el dato ingresado. Ej: correo@mybookery.com.</p>';
  }else{
    errorMessageEmail.innerHTML = "";
  }
  
  if(consultaValue === ""){
    errorMessageConsulta.innerHTML = 'Debe ingresar su consulta';
  }else{
    errorMessageConsulta.innerHTML = "";
  }

  if(nameValue !== "" && errorMessageName.innerHTML === "" &&
  surnameValue !== "" && errorMessageSurname.innerHTML === "" &&
  emailValue !== "" && errorMessageEmail.innerHTML === "" &&
  consultaValue !== "" && errorMessageConsulta.innerHTML === ""
  ){
    contactFormCleaner()
  }
}