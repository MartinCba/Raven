document.addEventListener("DOMContentLoaded", function () {
  // Captura el formulario por su ID
  var form = document.getElementById("miFormulario");

  // Agrega un controlador de eventos para el evento 'submit'
  form.addEventListener("submit", function (event) {
    // Evita que el formulario se envíe
    event.preventDefault();
  });
});

function validarFormulario() {
  // Obtener los valores de los campos de entrada
  var nombre = document.getElementById("nombre").value.trim();
  var apellido = document.getElementById("apellido").value.trim();
  var asunto = document.getElementById("asunto").value.trim();
  var email = document.getElementById("email").value;

  var observaciones = document.getElementById("observaciones").value;

  // Restablecer los estilos de los campos de entrada
  resetearEstilos();

  // Bandera para verificar si hay errores
  var hayErrores = false;

  // Validar nombre
  if (!validarNombreApellido(nombre)) {
    resaltarCampo("nombre");
    hayErrores = true;
  }

  // Validar apellido
  if (!validarNombreApellido(apellido)) {
    resaltarCampo("apellido");
    hayErrores = true;
  }
  // Validar asunto
  if (asunto === "") {
    resaltarCampo("asunto");
    hayErrores = true;
  }

  // Validar correo electrónico
  if (!validarCorreo(email)) {
    resaltarCampo("email");
    hayErrores = true;
  }

  // Validar observaciones
  if (observaciones === "") {
    resaltarCampo("observaciones");
    hayErrores = true;
  }

  // Mostrar mensaje de éxito o errores
  if (hayErrores) {
    swal("Error", "Por favor, corrija los campos resaltados", "error");
  } else {
    swal(
      "Éxito",
      "Muchas gracias, pronto nos pondremos en contacto!",
      "success"
    );
    resetearCampos();
  }
}

function validarCorreo(correo) {
  // Expresión regular para validar el correo electrónico
  var regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return regexCorreo.test(correo);
}

function validarNombreApellido(cadena) {
  // Expresión regular para validar nombre y apellido
  var regexNombreApellido = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
  return regexNombreApellido.test(cadena);
}

function resaltarCampo(campoId) {
  // Cambiar el estilo del borde del campo resaltado
  document.getElementById(campoId).style.border = "2px solid red";
}

function resetearEstilos() {
  // Restablecer los estilos de todos los campos de entrada
  var campos = ["nombre", "apellido", "email", "asunto", "observaciones"];
  campos.forEach(function (campoId) {
    document.getElementById(campoId).style.border = "";
  });
}

function resetearCampos() {
  // Restablecer los valores de los campos de entrada a su estado inicial
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("email").value = "";
  document.getElementById("asunto").value = "";
  document.getElementById("observaciones").value = "";
}
