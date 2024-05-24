const contenedorTarjetas = document.getElementById("productos-conteiner");

function crearTarjetaProductosIn(productos){
    console.log(productos);
    productos.forEach(producto => {
        const nuevoConjunto=document.createElement("div");
        nuevoConjunto.classList = "tarjeta-producto";
        nuevoConjunto.innerHTML = `
        <div class="producto" style="width: 16rem;">
                <img src="imagenes/${producto.id}.png" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title mt-3">${producto.nombre}</h5>
                  <div class="mt-2 precio">$${producto.precio}</div>
                  <div class="codigo-content">
                    <label class="mt-2">Código:</label>
                    <div class="codigo mt-2">${producto.codigo}</div>
                  </div>
                  <button class="btn btn-primary mt-1 btn-comprar">Comprar</button>
                </div>
            </div>`
        contenedorTarjetas.appendChild(nuevoConjunto);
        nuevoConjunto.getElementsByTagName("button")[0].addEventListener("click", ()=>agregarAlCarrito(producto))
    });
    
}    

let listaProductos=[]

getProductos().then(productos => {
  if (productos) {
      crearTarjetaProductosIn(productos);
      listaProductos=productos;
  }
}).catch(error => console.error("Error en la solicitud de productos:", error));

//------------------------Carrito de compras - funcionalidad segun tamaño ---------------------


if (window.innerWidth <= 700) {
  
  funcionalidadParaPantallasPequenas();
} else {
  
  funcionalidadParaPantallasGrandes();
}

// Funcionalidad para pantallas pequeñas
function funcionalidadParaPantallasPequenas() {
  
  document.getElementById('toggleCartBtn').addEventListener('click', function() {
    var cartPanel = document.getElementById('cartPanel');
    cartPanel.style.right = (cartPanel.style.right === '-300px') ? '0' : '-300px';
  });
  
  document.getElementById('carrito-page').addEventListener('click', function(event) {
    event.stopPropagation(); // Detiene la propagación del evento clic
  });
  
  document.addEventListener('click', function(event) {
    let cartPanel = document.getElementById("cartPanel");
  
    // Verifica si el clic se realizó fuera del panel del carrito, en el botón de alternar el carrito o en un botón "Comprar"
    if (event.target !== document.getElementById('toggleCartBtn') && !event.target.classList.contains('btn-comprar')) {
        cartPanel.style.right = '-300px';
    }
  });
}

// Funcionalidad para pantallas grandes
function funcionalidadParaPantallasGrandes() {
  
  document.getElementById('toggleCartBtn').addEventListener('click', function() {
    let cartPanel = document.getElementById('cartPanel');
    cartPanel.style.right = (cartPanel.style.right === '-500px') ? '0' : '-500px';
  });
  
  document.getElementById('carrito-page').addEventListener('click', function(event) {
    event.stopPropagation(); // Detiene la propagación del evento clic
  });
  
  document.addEventListener('click', function(event) {
    let cartPanel = document.getElementById("cartPanel");
  
    // Verifica si el clic se realizó fuera del panel del carrito, en el botón de alternar el carrito o en un botón "Comprar"
    if (event.target !== document.getElementById('toggleCartBtn') && !event.target.classList.contains('btn-comprar')) {
        cartPanel.style.right = '-500px';
    }
  });
}

// -----------------------Filtro busqueda----------------------------------

function crearTarjetaProductos(productos){
  productos.forEach(producto => {
      const nuevoConjunto=document.createElement("div");
      nuevoConjunto.classList = "tarjeta-producto";
      nuevoConjunto.innerHTML = `
      <div class="producto" style="width: 18rem;">
              <img src=${producto.imagen} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title mt-3">${producto.nombre}</h5>
                <div class="mt-2 precio">$${producto.precio}</div>
                <div class="codigo-content">
                  <label class="mt-2">Código:</label>
                  <div class="codigo mt-2">${producto.codigo}</div>
                </div>
                <button class="btn btn-primary mt-1 btn-comprar">Comprar</button>
              </div>
          </div>`
      contenedorTarjetas.appendChild(nuevoConjunto);
      nuevoConjunto.getElementsByTagName("button")[0].addEventListener("click", ()=>agregarAlCarrito(producto))
  });
  
}

const searchInput =document.getElementById("filtro");

const resultado=document.getElementById("productos-conteiner");

const handleSearch=()=>{
    contenedorTarjetas.innerHTML="";
    const searchIterm=searchInput.value.toLowerCase();
    const filtroConjunto=listaProductos.filter((conjunto) => conjunto.nombre.toLocaleLowerCase().startsWith(searchIterm));

    resultado.innerHTML="";
  
   crearTarjetaProductos(filtroConjunto);
};

searchInput.addEventListener("input", handleSearch);

// -----------Funcionalidad header productos-----------------

 // Obtener referencia a los enlaces y al contenedor de productos
 var enlaces = document.querySelectorAll('a[categoria]');
 var contenedorProductos = document.getElementById('productos-conteiner');
 
 // Agregar un event listener a cada enlace
 enlaces.forEach(function(enlace) {
     enlace.addEventListener('click', function(event) {
         event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
         
         // Obtener la categoría del enlace
         var categoria = enlace.getAttribute('categoria');
         console.log(categoria);
         
         // Mostrar u ocultar los productos según la categoría seleccionada
         mostrarProductosPorCategoria(categoria.toLowerCase());
     });
 });
 
 // Función para mostrar los productos por categoría
 function mostrarProductosPorCategoria(categoria) {
     contenedorTarjetas.innerHTML="";
     console.log(categoria);
     const filtroConjunto = listaProductos.filter((conjunto) => 
     conjunto.nombre.toLocaleLowerCase().includes(categoria.toLowerCase())
   );
   
     console.log(filtroConjunto);
     
     resultado.innerHTML="";
     
   
   
    crearTarjetaProductos(filtroConjunto);
   }


