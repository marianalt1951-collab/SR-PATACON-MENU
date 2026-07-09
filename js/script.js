/*=========================================
        SR PATACÓN - SCRIPT PRO
        PARTE 1
=========================================*/

let carrito = [];

//=========================================
// FORMATO PESOS
//=========================================

function formatoPesos(valor) {
    return "$" + Number(valor).toLocaleString("es-CO");
}

//=========================================
// ABRIR CARRITO
//=========================================

function abrirCarrito() {
    document.getElementById("carrito").style.right = "0";
}

//=========================================
// CERRAR CARRITO
//=========================================

function cerrarCarrito() {
    document.getElementById("carrito").style.right = "-420px";
}

//=========================================
// CAMBIAR PRECIO SELECT
//=========================================

function cambiarPrecioOp(select){

    const card = select.closest(".producto-card");

    const opcion = select.options[select.selectedIndex];

    const precio = Number(opcion.dataset.p);

    card.dataset.precio = precio;

    card.querySelector(".producto-precio").innerHTML =
        formatoPesos(precio);

    actualizarTotal();
}

//=========================================
// CAMBIAR CANTIDAD
//=========================================

function cambiarCantidad(boton,cambio){

    const card = boton.closest(".producto-card");

    const numero =
        card.querySelector(".numero-cantidad");

    let cantidad =
        Number(numero.innerText);

    cantidad += cambio;

    if(cantidad < 0)
        cantidad = 0;

  numero.innerText = cantidad;

if(cambio > 0){

    animarCarrito();

}

actualizarTotal();
}
//=========================================
// ACTUALIZAR TOTAL GENERAL
//=========================================

function actualizarTotal(){

    let total = 0;

    document
    .querySelectorAll(".producto-card")
    .forEach(card=>{

        const precio =
        Number(card.dataset.precio);

        const cantidad =
        Number(
        card.querySelector(".numero-cantidad")
        .innerText);

        total += precio * cantidad;

    });

    const domicilio =
    Number(
    document.getElementById("valor-domicilio")?.value || 0
    );

    total += domicilio;

    document.getElementById("total-precio").innerHTML =
    formatoPesos(total);

    construirCarrito();
}
/*=========================================
        SR PATACÓN - SCRIPT PRO
        PARTE 2
=========================================*/

//=========================================
// CONSTRUIR CARRITO
//=========================================

function construirCarrito(){

    carrito = [];

    const lista = document.getElementById("lista-carrito");

    lista.innerHTML = "";

    let total = 0;

    let cantidadProductos = 0;

    document.querySelectorAll(".producto-card").forEach(card=>{

        const cantidad = Number(
            card.querySelector(".numero-cantidad").innerText
        );

        if(cantidad<=0) return;

        const nombre = card.dataset.nombre;

        const precio = Number(card.dataset.precio);

        let observacion = "";

        const txt = card.querySelector(".comentario-producto");

        if(txt){
            observacion = txt.value.trim();
        }

        let opcion = "";

        const select = card.querySelector(".select-interno");

        if(select){
            opcion = select.value;
        }

        carrito.push({
            nombre,
            precio,
            cantidad,
            opcion,
            observacion
        });

        cantidadProductos += cantidad;

        total += precio * cantidad;

        const item = document.createElement("div");

        item.style.padding="12px";
        item.style.marginBottom="12px";
        item.style.background="#1b1b1b";
        item.style.borderRadius="12px";
        item.style.border="1px solid #333";

        item.innerHTML=`

        <b style="color:#FFD600;">
        ${nombre}
        </b>

        <br>

        Cantidad:
        <b>${cantidad}</b>

        <br>

        Precio:
        <b>${formatoPesos(precio)}</b>

        ${opcion ? `<br>Opción: ${opcion}` : ""}

        ${observacion ?
        `<br>
        <span style="color:#25D366">
        Observación:
        ${observacion}
        </span>`
        :""}

        <hr style="margin-top:10px;border:1px solid #333;">
        `;

        lista.appendChild(item);

    });

    if(carrito.length===0){

        lista.innerHTML=`
        <p style="text-align:center;color:#999;margin-top:40px;">
        Tu carrito está vacío
        </p>
        `;

    }

    const domicilio =
    Number(document.getElementById("valor-domicilio")?.value || 0);

    total += domicilio;

    document.getElementById("contador-carrito").innerText =
    cantidadProductos;

    document.getElementById("total-carrito").innerHTML =
    formatoPesos(total);

}
/*=========================================
        SR PATACÓN - SCRIPT PRO
        PARTE 3
=========================================*/

//=========================================
// VACIAR PEDIDO
//=========================================

function vaciarCarrito(){

    // Reiniciar cantidades
    document.querySelectorAll(".producto-card").forEach(card=>{

        // Cantidad
        const cantidad = card.querySelector(".numero-cantidad");
        if(cantidad){
            cantidad.innerText = "0";
        }

        // Comentarios
        const comentario = card.querySelector(".comentario-producto");
        if(comentario){
            comentario.value = "";
        }

        // Select
        const select = card.querySelector(".select-interno");
        if(select){

            select.selectedIndex = 0;

            const precioInicial =
            select.options[0].dataset.p;

            if(precioInicial){

                card.dataset.precio = precioInicial;

                card.querySelector(".producto-precio").innerHTML =
                formatoPesos(precioInicial);

            }

        }

    });

    // Vaciar arreglo
    carrito = [];

    // Vaciar lista visual
    document.getElementById("lista-carrito").innerHTML = `
        <p style="text-align:center;color:#999;margin-top:40px;">
            Tu carrito está vacío
        </p>
    `;

    // Reiniciar contador
    document.getElementById("contador-carrito").innerText = "0";

    // Reiniciar totales
    document.getElementById("total-precio").innerHTML = "$0";
    document.getElementById("total-carrito").innerHTML = "$0";

}
//=========================================
// ENVIAR PEDIDO A WHATSAPP
//=========================================

function enviarPedidoWhatsApp(){

    if(carrito.length === 0){

        alert("No hay productos en el carrito.");

        return;

    }
    //=========================================
// DATOS DEL CLIENTE
//=========================================

const nombre = document.getElementById("nombre-cliente").value.trim();

const direccion = document.getElementById("direccion").value.trim();

const barrio = document.getElementById("barrio").value.trim();

if(nombre === ""){

    alert("Por favor escribe tu nombre.");

    return;

}

if(direccion === ""){

    alert("Por favor escribe la dirección.");

    return;

}

if(barrio === ""){

    alert("Por favor escribe el barrio.");

    return;

}


   let mensaje =

`🍽 PEDIDO SR. PATACÓN

👤 Nombre: ${nombre}
🏠 Dirección: ${direccion}
📍 Barrio: ${barrio}

🛒 Pedido:

`;

    carrito.forEach((item,index)=>{


        mensaje += `${index + 1}. ${item.nombre}\n`;

        mensaje += `Cantidad: ${item.cantidad}\n`;


        if(item.opcion){

            mensaje += `Opción: ${item.opcion}\n`;

        }


        if(item.observacion){

            mensaje += `Observación: ${item.observacion}\n`;

        }


        mensaje += `Subtotal: ${formatoPesos(item.precio * item.cantidad)}\n\n`;


    });



    const domicilio = Number(
        document.getElementById("valor-domicilio")?.value || 0
    );



    let total = 0;


    carrito.forEach(item=>{

        total += item.precio * item.cantidad;

    });



    total += domicilio;



    mensaje += `🛵 Domicilio: ${formatoPesos(domicilio)}\n`;

    mensaje += `💰 TOTAL: ${formatoPesos(total)}\n\n`;

    mensaje += "Gracias por comprar en SR. PATACÓN 🍔";



    const telefono = "573145448787";


    const url = 
    "https://wa.me/" + telefono + 
    "?text=" + encodeURIComponent(mensaje);



    window.open(url,"_blank");

}

//=========================================
// PAGO NEQUI
//=========================================

function pagarNequi(){

    alert(
`PAGO POR NEQUI

Número:

3117442305

Después del pago envía el comprobante por WhatsApp.

Gracias por comprar en SR. PATACÓN 🍔`
    );

}

//=========================================
// INICIAR
//=========================================

window.onload = function(){

    actualizarTotal();

};
/*=========================================
        SR PATACÓN - SLIDER AUTOMÁTICO
=========================================*/

let posicionSlider = 0;


function moverSlider(){

    const slides = document.querySelectorAll(".slide");


    if(slides.length === 0){
        return;
    }


    // quitar activo a todas
    slides.forEach(slide=>{
        slide.classList.remove("activo");
    });


    // siguiente imagen
    posicionSlider++;


    // volver al inicio
    if(posicionSlider >= slides.length){

        posicionSlider = 0;

    }


    // activar nueva imagen
    slides[posicionSlider].classList.add("activo");

}


// cambiar cada 4 segundos
setInterval(moverSlider,4000);
//=========================================
// ANIMACIÓN CARRITO
//=========================================

function animarCarrito(){

    const boton = document.getElementById("btn-carrito");

    if(!boton) return;

    boton.classList.remove("rebote");

    void boton.offsetWidth;

    boton.classList.add("rebote");}

    /*=========================================
        BUSCADOR DEL MENÚ
=========================================*/

function buscarProductos(){

    const texto = document
        .getElementById("buscador")
        .value
        .toLowerCase()
        .trim();

    const productos = document.querySelectorAll(".producto-card");

    productos.forEach(producto=>{

        const nombre = producto.dataset.nombre.toLowerCase();

        const titulo = producto
            .querySelector(".producto-nombre")
            .innerText
            .toLowerCase();

        const descripcion = producto
            .innerText
            .toLowerCase();

        if(
            nombre.includes(texto) ||
            titulo.includes(texto) ||
            descripcion.includes(texto)
        ){

            producto.style.display="flex";

        }else{

            producto.style.display="none";

        }

    });

}
   