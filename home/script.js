var compras = new Array();

let productos = [
  {
    codigo: 0,
    nombre: "Vanilla Latte",
    descuento: "-10%",
    precio: 1170,
    precioDescuento: "$1300",
    estrellas: 4,
    imagen: "../img/cafe-viena.jpg",
  },
  {
    codigo: 1,
    nombre: "Cafe Inglés",
    descuento: "-21%",
    precio: 1027,
    precioDescuento: "$1300",
    estrellas: 3,
    imagen: "../img/cafe-ingles.jpg",
  },
  {
    codigo: 2,
    nombre: "Cafe Australiano",
    descuento: "-13%",
    precio: 957,
    precioDescuento: "$1100",
    estrellas: 5,
    imagen: "../img/cafe-australiano.jpg",
  },
  {
    codigo: 3,
    nombre: "Cafe Helado",
    descuento: "-10%",
    precio: 990,
    precioDescuento: "$1100",
    estrellas: 4,
    imagen: "../img/cafe-helado.jpg",
  },
  {
    codigo: 4,
    nombre: "Cafe Liqeurs",
    descuento: "-13%",
    precio: 957,
    precioDescuento: "$1100",
    estrellas: 4,
    imagen: "../img/cafe-liqueurs.jpg",
  },
  {
    codigo: 5,
    nombre: "Latte Ingles",
    descuento: "-10%",
    precio: 990,
    precioDescuento: "$1100",
    estrellas: 4,
    imagen: "../img/cafe-ingles.jpg",
  },
  {
    codigo: 6,
    nombre: "Cafe Irlandés",
    descuento: "-13%",
    precio: 957,
    precioDescuento: "$1100",
    estrellas: 4,
    imagen: "../img/cafe-irish.jpg",
  },
  {
    codigo: 7,
    nombre: "Cafe Viena",
    descuento: "-10%",
    precio: 990,
    precioDescuento: "$1100",
    estrellas: 4,
    imagen: "../img/cafe-viena.jpg",
  },
];

function contador() {
  compras = actualizar();
  var cantidad = compras.length;
  document.getElementById("numero").innerHTML = cantidad;
}

function soloNumeros(event) {
  var input = event.target;
  var soloNumeros = /^[0-9]+$/;
  var valor = input.value;

  if (!soloNumeros.test(valor)) {
    input.value = valor.replace(/[^0-9]/g, "");
  }

  if (valor.length > 2) {
    input.value = valor.slice(0, 2);
  }
}

function sumar(codigo) {
  compras = actualizar();
  compras.forEach(function (e) {
    if (codigo == e.codigo) {
      e.cantidad++;
    }
  });

  sessionStorage.setItem("compras", JSON.stringify(compras));
  carrito();
  total();
}

function resta(codigo) {
  compras = actualizar();
  compras.forEach(function (e) {
    if (codigo == e.codigo) {
      e.cantidad--;
      if (e.cantidad == 0) {
        e.cantidad = 1;
      }
    }
  });

  sessionStorage.setItem("compras", JSON.stringify(compras));
  carrito();
  total();
}

function actualizar() {
  var ss = sessionStorage.getItem("compras");
  var compras = [];
  if (ss != null) compras = JSON.parse(ss);

  return compras;
}

function agregarProducto(codigo) {
  compras = actualizar();
  exitoso =
    "<div class='exitoso'><div class='mensaje-confirmacion'>AGREGADO EXITOSAMENTE <div><input type='button' class='salir' value='SALIR' onclick='salir()'></div></div></div>";

  if (compras == null) {
    let compras = [];
  }

  var encontrado = false;
  compras.forEach(function (e) {
    if (e.codigo == codigo) {
      encontrado = true;
    }
  });
  if (!encontrado) {
    compras.push({ codigo: codigo, cantidad: 1 });

    sessionStorage.setItem("compras", JSON.stringify(compras));
    if (compras != null) {
      document.getElementById("mensaje-emergente").innerHTML = exitoso;
      document.getElementById("numero").innerHTML = "";
      var cantidad = compras.length;
      document.getElementById("numero").innerHTML = cantidad;
    }
  }
}

function salir() {
  document.getElementById("mensaje-emergente").innerHTML = "";
}

function eliminar(codigo) {
  var compras = actualizar();
  var c = -1;
  var i = -1;
  compras.forEach(function (e) {
    c++;
    if (i == -1 && e.codigo == codigo) {
      i = c;
    }
  });

  if (i >= 0) compras.splice(i, 1);

  sessionStorage.setItem("compras", JSON.stringify(compras));
  carrito();
  total();
}

function total() {
  var precioTotal = 0;

  var compras = actualizar();
  compras.forEach(function (e) {
    productos.forEach(function (f) {
      if (e.codigo == f.codigo) {
        precioTotal += f.precio * e.cantidad;
      }
    });
  });
  var divTotal = "<div class='precio-total'>$" + precioTotal + "</div>";
  var comprar =
    "<input type='button' id='boton-comprar' value='COMPRAR' class='comprar'>";
  if (precioTotal > 0) {
  }
  document.getElementById("aca-va-comprar").innerHTML =
    comprar +
    "TOTAL<div id='aca-va-total' ><div  class='precio-total'>$0</div>";
  document.getElementById("aca-va-total").innerHTML = divTotal;

  if (precioTotal > 0) {
    document.getElementById("aca-va-comprar").innerHTML =
      "<a href='..\\home\\compra.html' id='border-comprar'>" +
      comprar +
      "</a>" +
      "TOTAL<div id='aca-va-total'><div class='precio-total'>$0</div>";
    document.getElementById("aca-va-total").innerHTML = divTotal;
    document.getElementById("boton-comprar").style.cursor = "pointer";
    document.getElementById("border-comprar").style.cursor = "default";
  }
}

function comprobar() {
  let prefijo =
    "<div class='exitoso'><div class='mensaje-error'>CASILLAS ERRONEAS<div><br></br>";
  let sufijo =
    "<input type='button' class='salir' value='SALIR' onclick='salir()'></div></div></div>";
  exitoso =
    "<div class='exitoso'><div class='mensaje-confirmacion'>MENSAJE ENVIADO<div><input type='button' class='salir' value='SALIR' onclick='salir()'></div></div></div>";

  let mensajeFinal = "";
  if (!nombre()) {
    mensajeFinal += "<div>-NOMBRE<div><br>";
  }
  if (!correo()) {
    mensajeFinal += "<div>-CORREO<div>";
  }

  let mostrar = prefijo + mensajeFinal + sufijo;
  if (!correo() || !nombre()) {
    document.getElementById("mensaje-emergente").innerHTML = mostrar;
  } else {
    document.getElementById("mensaje-emergente").innerHTML = exitoso;
  }
}
//---------------------------------------------------------------------------------------------------------------

function validar() {
  let proceso =
    "<div class='exitoso'><div class='mensaje-proceso'>PROCESANDO<br><img class='gif' src='https://media.tenor.com/wKS4XYcVbDgAAAAi/icon.gif'></img></div></div></div>";
  let exitoso =
    "<div class='exitoso'><div class='mensaje-confirmacion'>COMPRA REALIZADA<div><a href='..\\TPFINAL\\crabs.html'><input type='button' class='salir' value='SALIR' onclick='salir()'></a></div></div></div>";

  nombre();
  apellido();
  correo();
  nombreTarjeta();
  numeroTarjeta();
  codigoSeguridad();

  if (
    nombre() &&
    apellido() &&
    correo() &&
    nombreTarjeta() &&
    numeroTarjeta() &&
    codigoSeguridad()
  ) {
    document.getElementById("mensaje-emergente").innerHTML = proceso;

    setTimeout(() => {
      document.getElementById("mensaje-emergente").innerHTML = exitoso;
    }, 3000);
  }
}

function nombre() {
  let id = "nombre";
  let input = document.getElementById(id).value;
  if (input == "" || contieneNumeros(input)) {
    negacion(id);
  } else {
    aprobado(id);
  }

  if (document.getElementById(id).style.borderColor == "green") {
    return true;
  }
}

function apellido() {
  let id = "apellido";
  let input = document.getElementById(id).value;
  if (input == "" || contieneNumeros(input)) {
    negacion(id);
  } else {
    aprobado(id);
  }

  if (document.getElementById(id).style.borderColor == "green") {
    return true;
  }
}

function correo() {
  let id = "correo";
  let input = document.getElementById(id).value;
  if (input == "") {
    negacion(id);
  }
  if (contieneEmail(input)) {
    aprobado(id);
  } else {
    negacion(id);
  }

  if (document.getElementById(id).style.borderColor == "green") {
    return true;
  }
}

function nombreTarjeta() {
  let id = "nombre-tarjeta";
  let input = document.getElementById(id).value;
  if (input == "" || contieneNumeros(input)) {
    negacion(id);
  } else {
    aprobado(id);
  }

  if (document.getElementById(id).style.borderColor == "green") {
    return true;
  }
}

function numeroTarjeta() {
  let id = "numero-tarjeta";
  let input = document.getElementById(id).value;
  if (input == "" || verificarTarjeta(input)) {
    negacion(id);
  } else {
    aprobado(id);
  }

  if (document.getElementById(id).style.borderColor == "green") {
    return true;
  }
}

function codigoSeguridad() {
  let id = "codigo-seguridad";
  let input = parseInt(document.getElementById(id).value);
  if (input <= 999 && input > 0) {
    aprobado(id);
  } else {
    negacion(id);
  }

  if (document.getElementById(id).style.borderColor == "green") {
    return true;
  }
}

//funciones globales
function negacion(elemento) {
  document.getElementById(elemento).style.border = "2px solid red";
}

function aprobado(elemento) {
  document.getElementById(elemento).style.border = "2px solid green";

  return true;
}

function contieneNumeros(str) {
  return /\d/.test(str);
}

function contieneEmail(str) {
  return /@.*\.com$/.test(str);
}

function verificarTarjeta(tarjeta) {
  tarjeta = tarjeta.replace(/\s/g, "");

  var regex = /^[0-9]{15,16}$/;
  return regex.test(tarjeta);
}

function carrito() {
  compras = actualizar();

  let temporal = "";
  if (compras != null) {
    //(producto as e)
    let i = 0;
    productos.forEach(function (e) {
      //(compras as compra)
      compras.forEach(function (compra) {
        if (compra.codigo == e.codigo) {
          temporal +=
            "<div class='producto-carro' ><img src='" +
            e.imagen +
            "' class='img-carrito'><div><h3 class='titulo-carrito'>" +
            e.nombre +
            "</h3></div><div class='eliminar-producto'><i class='fa-solid fa-trash-can' onclick='eliminar(" +
            e.codigo +
            ")'></i></div><i class='fa-solid fa-minus' onclick='resta(" +
            e.codigo +
            ")'></i><div class='cantidad'><input type='text' class='number' readonly value=" +
            compra.cantidad +
            " id='cantidad' id oninput='soloNumeros(event)'></div><i class='fa-solid fa-plus' onclick='sumar(" +
            e.codigo +
            ")'></i><div class='valor-borde'></div><div class='valor-input'>$" +
            parseFloat(parseFloat(e.precio) * compra.cantidad).toFixed(2) +
            "</div></div>";
        }
      });
      i++;
      document.getElementById("contenedor-productos").innerHTML = temporal;
    });
  }
}
function generarCard() {
  var cardHTML =
    '<div class="producto-card">' +
    '<div class="contenedor-img">' +
    '<img src="' +
    productos.imagen +
    '" alt="' +
    productos.nombre +
    '" />' +
    '<span class="descuento">' +
    productos.descuento +
    "</span>" +
    '<div class="boton-grupo">' +
    "<span>" +
    '<i class="fa-regular fa-eye"></i>' +
    "</span>" +
    "<span>" +
    '<i class="fa-regular fa-heart"></i>' +
    "</span>" +
    "<span>" +
    '<i class="fa-solid fa-code-compare"></i>' +
    "</span>" +
    "</div>" +
    "</div>" +
    '<div class="modal-carrito-agregar">' +
    '<button id="menos">' +
    '<i class="fa-solid fa-minus"></i>' +
    "</button>" +
    '<p class="modal-carrito-precio">0</p>' +
    '<button id="mas">' +
    '<i class="fa-solid fa-plus"></i>' +
    "</button>" +
    "</div>" +
    '<div class="contenido-card-producto">' +
    '<div class="estrellas">' +
    generateStars(productos.estrellas) +
    "</div>" +
    "<h3>" +
    productos.nombre +
    "</h3>" +
    '<span class="add-cart">' +
    '<i class="fa-solid fa-basket-shopping"></i>' +
    "</span>" +
    '<p class="precio">' +
    productos.precio +
    "<span>" +
    productos.precioDescuento +
    "</span></p>" +
    "</div>" +
    "</div>";

  return cardHTML;
}

// Genera las estrellas según la cantidad indicada (entre 0 y 5)
function generateStars(starCount) {
  var starsHTML = "";
  for (var i = 0; i < starCount; i++) {
    starsHTML += '<i class="fa-solid fa-star"></i>';
  }
  for (var j = starCount; j < 5; j++) {
    starsHTML += '<i class="fa-regular fa-star"></i>';
  }
  return starsHTML;
}

function galeriaMostrar() {
  var tmp = "";
  if (productos != null) {
    productos.forEach(function (e) {
      tmp +=
        '<div class="producto-card">' +
        '<div class="contenedor-img">' +
        '<img src="' +
        e.imagen +
        '" alt="' +
        e.nombre +
        '" />' +
        '<span class="descuento">' +
        e.descuento +
        "</span>" +
        '<div class="boton-grupo">' +
        "<span>" +
        '<i class="fa-regular fa-eye"></i>' +
        "</span>" +
        "<span>" +
        '<i class="fa-regular fa-heart"></i>' +
        "</span>" +
        "<span>" +
        '<i class="fa-solid fa-code-compare"></i>' +
        "</span>" +
        "</div>" +
        "</div>" +
        '<div class="contenido-card-producto">' +
        '<div class="estrellas">' +
        generateStars(e.estrellas) +
        "</div>" +
        "<h3>" +
        e.nombre +
        "</h3>" +
        '<span class="add-cart" onclick="agregarProducto(' +
        e.codigo +
        ')">' +
        '<i class="fa-solid fa-basket-shopping"></i>' +
        "</span>" +
        '<p class="precio">$' +
        e.precio +
        "<span>" +
        e.precioDescuento +
        "</span></p>" +
        "</div>" +
        "</div>";
    });
    document.getElementById("contenedor-productos").innerHTML = tmp;
  }
}
