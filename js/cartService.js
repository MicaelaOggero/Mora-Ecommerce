function agregarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("productos"));
  let cuenta = 0;
  if (!memoria) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
    cuenta = 1;
  } else {
    const indiceProducto = memoria.findIndex(
      (conjunto) => conjunto.id === producto.id
    );
    const nuevaMemoria = memoria;

    if (indiceProducto === -1) {
      nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
      localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
      cuenta = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cuenta = nuevaMemoria[indiceProducto].cantidad;
    }

    localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
  }
  actualizoNumeroCarrito();
  crearTarjetaProductosInicio();
  actualizarTotales();
  revisarMensajeVacio();
  return cuenta;
}

function restarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("productos"));
  const indiceProducto = memoria.findIndex(
    (conjunto) => conjunto.id === producto.id
  );
  if (memoria[indiceProducto].cantidad === 1) {
    memoria.splice(indiceProducto, 1);
    localStorage.setItem("productos", JSON.stringify(memoria));
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("productos", JSON.stringify(memoria));
  actualizoNumeroCarrito();
  revisarMensajeVacio();
}

function eliminarUnElemento(producto) {
  const memoria = JSON.parse(localStorage.getItem("productos"));

  // Encontrar el índice del producto en el array
  const indiceProducto = memoria.findIndex((item) => item.id === producto.id);

  // Verificar si se encontró el producto
  if (indiceProducto !== -1) {
    // Eliminar el producto del array
    memoria.splice(indiceProducto, 1);

    // Actualizar el localStorage con el nuevo array
    localStorage.setItem("productos", JSON.stringify(memoria));

    // Actualizar la visualización del carrito

    actualizoNumeroCarrito();
    revisarMensajeVacio();
    actualizarTotales();
  }

  crearTarjetaProductosInicio();
}

/** Toma un producto, le agrga cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizoNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("productos"));
  if (memoria && memoria.length > 0) {
    const cuenta = memoria.reduce(
      (acum, current) => acum + current.cantidad,
      0
    );
    cuentaCarritoElement.innerText = cuenta;
  } else {
    cuentaCarritoElement.innerText = 0;
  }
}

actualizoNumeroCarrito();
