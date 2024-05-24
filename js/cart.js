const contenedorTarjetasCart = document.getElementById("productos-carrito");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const vaciarCarritoElement=document.getElementById("vaciar");

function crearTarjetaProductosInicio(){
    contenedorTarjetasCart.innerHTML="";
    const productos=JSON.parse(localStorage.getItem("productos"));
    
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            const nuevoConjunto=document.createElement("div");
            nuevoConjunto.classList = "tarjeta-producto";
            nuevoConjunto.innerHTML = `<div class="producto">
                <img src="imagenes/${producto.id}.png" class="card-img-top" alt="...">
                <div class="content-detalle">
                    <div class="card-body">
                        <div class="sub-detalle">
                            <h5 class="card-title ">${producto.nombre}</h5>
                            <div class=" precio">$${producto.precio}</div>
                        </div>
                        <div class="codigo-content">
                            <label class="m-r">Código:</label>
                            <div>${producto.codigo}</div>
                        </div>
                        
                    </div>
                    <div class="botones">
                        <div class="sub-botones">
                            <button class="btn btn-primary mt-1">-</button>
                            <span class="cantidad-elementos">${producto.cantidad}</span>
                            <button class="btn btn-primary mt-1">+</button>
                        </div>
                        <button class="boton mt-1" id="btn-eliminar-todo"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    
                </div>
            </div>`
            contenedorTarjetasCart.appendChild(nuevoConjunto);
            nuevoConjunto.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
            const cuentaElement= e.target.parentElement.getElementsByTagName("span")[0];
            cuentaElement.innerText=agregarAlCarrito(producto);
            actualizarTotales();
            });
            nuevoConjunto.getElementsByTagName("button")[0].addEventListener("click", (e)=> {
            restarAlCarrito(producto);  
            crearTarjetaProductosInicio();
            actualizarTotales();
            });

            nuevoConjunto.getElementsByTagName("button")[2].addEventListener("click", (e)=> {
                eliminarUnElemento(producto);
            });

        });      
    }
}

crearTarjetaProductosInicio();
actualizarTotales();

function actualizarTotales(){
    const productos= JSON.parse(localStorage.getItem("productos"));
    let unidades =0;
    let precio=0;
    if(productos && productos.length>0){
        productos.forEach(productos => {unidades += productos.cantidad;
        precio += productos.precio * productos.cantidad;
        })
        unidadesElement.innerText=unidades;
        precioElement.innerText=precio;
    }
}

function revisarMensajeVacio(){
    const productosConjunto=JSON.parse(localStorage.getItem("productos"));
    carritoVacioElement.classList.toggle("escondido", productosConjunto && productosConjunto.length>0);
    totalesElement.classList.toggle("escondido", !(productosConjunto && productosConjunto.length>0));
}


revisarMensajeVacio();

vaciarCarritoElement.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    localStorage.removeItem("productos");
    actualizarTotales();
    crearTarjetaProductosInicio();
    revisarMensajeVacio();
    actualizNumeroCarrito();
}

