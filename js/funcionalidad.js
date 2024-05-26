//Inicio sesión y Crear cuenta
let btnAbrirInicio = document.getElementById("btn-abrir-inicio"),
  overlay = document.getElementById("overlay"),
  popup = document.getElementById("popup"),
  btnCerrarInicio = document.getElementById("btn-cerrar-inicio");
let btnAbrirCrearCuenta = document.getElementById("btn-abrir-crearCuenta"),
  overlayC = document.getElementById("overlay-c"),
  popupC = document.getElementById("popup-c"),
  btnCerrarCrearCuenta = document.getElementById("btn-cerrar-crearCuenta");

btnAbrirInicio.addEventListener("click", function () {
  overlay.classList.add("active-i");
});

btnCerrarInicio.addEventListener("click", function () {
  overlay.classList.remove("active-i");
});

btnAbrirCrearCuenta.addEventListener("click", function () {
  overlayC.classList.add("active-c");
});

btnCerrarCrearCuenta.addEventListener("click", function () {
  overlayC.classList.remove("active-c");
});

//Efecto header
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 0);
});

//Desaparece boton carrito cuando se abre el menu desplegable

const toggleButton = document.getElementById("toggleButton");
const elementoVisible = document.getElementById("toggleCartBtn");

// Agregar un evento de clic al botón
toggleButton.addEventListener("click", function () {
  if (
    elementoVisible.style.display === "flex" ||
    elementoVisible.style.display === ""
  ) {
    elementoVisible.style.display = "none";
  } else {
    elementoVisible.style.display = "flex";
  }
});
