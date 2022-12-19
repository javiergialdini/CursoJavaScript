class Libro {
    constructor(id,titulo, genero, precio, stock, img){
        this.id = id;
        this.titulo = titulo
        this.genero = genero
        this.precio = precio
        this.stock = stock
        this.img = img
    }
}

let libro1 = new Libro(1, "Aprendiendo Javascript", "Universitario/Informática", 2500, 10, "JSCRIPT.jfif")
let libro2 = new Libro(2, "JAVA para novatos", "Universitario/Informática", 3800, 0, "JAVA.jpg")
let libro3 = new Libro(3, "Redes Informáticas", "Universitario/Informática", 6500, 10, "REDES.png")
let libro4 = new Libro(4, "Juego de Tronos", "Fantasía", 1800, 4, "GOT.jpg")
let libro5 = new Libro(5, "Dune", "Ciencia Ficción", 2200, 9, "Dune.jpg")
let libro6 = new Libro(6, "Soy Leyenda", "Ciencia Ficción/Terror", 1500, 13, "SLEY.jpg")
let libro7 = new Libro(7, "El derecho Penal Argentino en la historia", "Universitario/Leyes", 4750, 17, "DER.png")

let listaLibros = [ libro1, libro2, libro3, libro4, libro5, libro6, libro7 ]
let libros = listaLibros;
let listaLibrosComprar = [];
let codigoDescuento;
let descuento = 1;

let totalesCarrito = 0;
let listaGenerosLimpia = [];


listaLibrosComprarJson = localStorage.getItem("carritoLibros")
if(listaLibrosComprarJson != null) {
    listaLibrosComprar = JSON.parse(listaLibrosComprarJson);
    listaLibrosComprar.forEach(libro => {
        totalesCarrito += libro.stock;
        document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;
    })
}


// CARGO CAJAS DE LIBROS
const contenedorLibros = document.getElementById("div1")
mostrarLibros(libros);
function mostrarLibros(librosMostrar) {
    contenedorLibros.replaceChildren();
    contenedorLibros.style = "width: 100%;";
    contenedorLibros.className = "album py-5 bg-light";
    const contenedor = document.createElement("div");
    contenedor.className = "container";
    const row = document.createElement("div");
    row.className = "row";

    librosMostrar.forEach(libro => {
        const div = document.createElement("div");
        const disabled = libro.stock === 0 ? "disabled" : "";
        const pathIMG = libro.img != '' ? ("./img/" + libro.img) : "holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail";
        div.className = "col-md-3";
        div.innerHTML = `<div class="card mb-4 box-shadow">
                            <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 225px; width: 75%; display: block; margin: auto;" src="${pathIMG}" data-holder-rendered="true">
                            <div class="card-body">
                                <p class="card-text" style="width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${libro.titulo}</p>
                                <p class="text-muted" style="font-size: 16px; width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">$ ${libro.precio}</small>
                                <p class="text-muted" style="font-size: 12px; width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${libro.genero}</small>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" value="${libro.id}" onClick="añadeACarro(${libro.id})" ${disabled}>Añadir</button>
                                </div>
                                </div>
                            </div>
                        </div>`
        row.appendChild(div);
    })
    contenedor.appendChild(row);
    contenedorLibros.appendChild(contenedor);
    const btnCarro = document.getElementById("btnCarro");
    btnCarro.innerHTML = "VER CARRO"
    //const btnDesc = document.getElementById("btnDesc");
    //btnDesc.innerHTML = "OBTENER CODIGO DESCUENTO"
}





//    **********   CARRITO   ******

// AGREGO EVENTO AL BOTON CARRO
const btnCarro = document.getElementById("btnCarro");
btnCarro.onclick = () => {
    const checkFiltro = document.getElementById("divCheckDispo")
    if(btnCarro.innerHTML === "VER CARRO"){
        checkFiltro.replaceChildren();
        checkFiltro.innerHTML = '<p>Elementos añadidos al carro: </p>'
        mostrarCarrito(listaLibrosComprar);
    }
    else {
        checkFiltro.innerHTML = '<p>Mostar solo disponibles <input type="checkbox" id="soloStock"/></p>'
        checkFiltro.onclick = () => {
            libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
            mostrarLibros(libros)
        }
        cargarBotonesFiltro(listaGenerosLimpia);
        mostrarLibros(listaLibros);
    }
}

// CARGO LISTA DE CARRITO CON LIBROS AGREGADOS
function mostrarCarrito(listaLibrosComprar) {
    contenedorFiltros.replaceChildren();
    contenedorLibros.replaceChildren();
    if(listaLibrosComprar == "") {
        const div = document.createElement("div");
        div.className = "carrito";
        div.innerHTML = `<h2> Aún no agregó ningún libro al carro </h2>`;
        contenedorLibros.appendChild(div);
    }
    else
    {
        contenedorLibros.style = "width: 50%;";
        listaLibrosComprar.forEach(libro => {
        const disabledBtnMenos = libro.stock === 0 ? "disabled" : "";
        const disabledBtnMas = listaLibros.find(libroLista => libroLista.id === libro.id).stock === libro.stock ? "disabled": "";


        const div = document.createElement("div");
        div.className = "carrito";
        const pathIMG = libro.img != '' ? ("./img/" + libro.img) : "holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail";
        div.innerHTML = `<table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <td style="padding-left: 10px; width: 1%;">
                                        <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 60px; width: 36px; margin-right: 10px;" src="${pathIMG}" data-holder-rendered="true">
                                    </td>
                                    <td style="padding-left: 10px; width: 40%; text-align:left;">
                                        ${libro.titulo}
                                    </td>
                                    <td style="padding-left: 10px; width: 1%;">
                                        $${libro.precio}
                                    </td>
                                    <td style="padding-left: 10px; width: 1%;">
                                        <input id="btnMenos" type="submit" value="-" style=" width: 35px;" onClick=quitarElemento(${libro.id}) ${disabledBtnMenos}>
                                    </td>
                                    <td style="padding-left: 2px; width: 1%;">
                                        <input type="nummber" value="${libro.stock}" style=" width: 35px; text-align: center;">
                                    </td>
                                    <td style="padding-left: 2px; width: 1%;">
                                        <input id="btnMas" type="submit" value="+" style=" width: 35px;" onClick="agregarElemento(${libro.id})" ${disabledBtnMas}>
                                    </td>
                                    <td style="padding-left: 10px; width: 1%;">
                                        <input type="submit" value="Quitar" onClick="quitarLista(${libro.id})">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr>`;
        contenedorLibros.appendChild(div);
        })
    }
    const btnCarro = document.getElementById("btnCarro");
    btnCarro.innerHTML = "VOLVER"
    //const btnDesc = document.getElementById("btnDesc");
    //btnDesc.innerHTML = "AGREGAR CÓDIGO DESCUENTO"
}

// AÑADO LIBRO AL CARRO
function añadeACarro(id){
    if(listaLibros.find(libro => libro.id === id).stock > 0){
        const libroLista = listaLibrosComprar.find(libro => libro.id === id);

        if(listaLibrosComprar.find(libro => libro.id === id) === undefined){
            const libroAux = listaLibros.find(libro => libro.id === id);
            const libroAdd = new Libro(libroAux.id, libroAux.titulo, libroAux.genero, libroAux.precio, 1, libroAux.img); 
            listaLibrosComprar.push(libroAdd);
        } else {
            listaLibrosComprar.find(libro => libro.id === id).stock ++;
        }

        const librosStorage = JSON.stringify(listaLibrosComprar);
        localStorage.setItem("carritoLibros", librosStorage);

        totalesCarrito++;
        document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;
    }
}

// QUITO LISTA DEL CARRO
function quitarLista(id){
    const index = listaLibrosComprar.map( libro => libro.id).indexOf(id);
    totalesCarrito -= listaLibrosComprar.find(libro => libro.id === id).stock;
    listaLibrosComprar.splice(index, 1);
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;

    const librosStorage = JSON.stringify(listaLibrosComprar);
    localStorage.setItem("carritoLibros", librosStorage);

    mostrarCarrito(listaLibrosComprar);
}

// QUITO ELEMENTO DEL CARRO
function quitarElemento(id){
    listaLibrosComprar.find(libro => libro.id === id).stock --;
    totalesCarrito --;
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;

    const librosStorage = JSON.stringify(listaLibrosComprar);
    localStorage.setItem("carritoLibros", librosStorage);

    mostrarCarrito(listaLibrosComprar);
}

// AGREGO ELEMENTO AL CARRO
function agregarElemento(id){
    listaLibrosComprar.find(libro => libro.id === id).stock ++;
    totalesCarrito ++;
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;

    const librosStorage = JSON.stringify(listaLibrosComprar);
    localStorage.setItem("carritoLibros", librosStorage);

    mostrarCarrito(listaLibrosComprar);
}





//   ***********  Otorgar descuentos  ***********t

// AGREGO EVENTO AL BOTON OBTENER DESCUENTOS 
/*
const btnDesc = document.getElementById("btnDesc");
btnDesc.onclick = () => {
    if(btnDesc.innerHTML == "OBTENER CODIGO DESCUENTO"){
        const result = prompt("Ingrese día y mes de su cumpleaños\n(dd/mm)");
        darDescuento(result);
    }
    else{
        codigoDescuento = "";
        let result = prompt("Ingrese código");
        validarCodigoDescuento(result);
        if(descuento != 1)
            document.getElementById("mostrarCodDesc").innerHTML = `Código de descuento ingresado: ${result}`;
        else
            document.getElementById("mostrarCodDesc").innerHTML = `Sin descuento`;
    }
}*/

// Meodo para otorgar descuento
function darDescuento(fecha){
    let hoy = new Date();
    let mes = (hoy.getMonth()+1)

    let arr = fecha.split("/");
    let mesIngresado=arr[1]

    if(fecha.includes("/") && fecha.length < 6){
        let arr = fecha.split("/");
        let diaIngresado=arr[0]
        let mesIngresado=arr[1]
        if(validarFecha(diaIngresado, mesIngresado))
            if(mes == mesIngresado){
                alert("Tu código de descuento es: DESC4")
            }
            else{
                switch(mesIngresado){
                    case "1":
                    case "2":
                    case "3": alert("Tu código de descuento es: DESC1"); break;
                    case "4":
                    case "5":
                    case "6": alert("Tu código de descuento es: DESC3"); break;
                    case "7":
                    case "8":
                    case "9":alert("Tu código de descuento es: DESC4"); break;
                    case "10":
                    case "11":
                    case "12":alert("Tu código de descuento es: DESC2"); break;
                }
            }
        else
            alert("fecha mal ingresada")
    }
    else
        alert("fecha mal ingresada")
}

//VALIDO FECHA INGRESADA
function validarFecha(dia, mes) {
    if(mes > 0 && mes < 13) {
        switch(mes){
            case "1":
            case "3":
            case "5":
            case "7":
            case "8":
            case "10":
            case "12":
                if(dia > 0 && dia < 32) return true;
                else return false;
                break;
            case "2":
                if(dia > 0 && dia < 30) return true;
                else return false;
                break;
            case "4":
            case "6":
            case "9":
            case "11":
                if(dia > 0 && dia < 31) return true;
                else return false;
                break;
        }
    }
    else {
        return false;
    }
}

// Valido el codigo de descuento ingresado
function validarCodigoDescuento (codigo) {
    switch(codigo){
        case 'DESC1': descuento = 0.90; codigoDescuento = 'DESC1'; break;
        case 'DESC2': descuento = 0.85; codigoDescuento = 'DESC2';break;
        case 'DESC3': descuento = 0.80; codigoDescuento = 'DESC3';break;
        case 'DESC4': descuento = 0.75; codigoDescuento = 'DESC4';break;
        default: alert('Código incorrecto'); descuento = 1;
    }
}

// *************** DETEALLE DE COMPRA ****************
// AGREGO EVENTO A BOTON DETALLE DE COMPRA
/*
const btnDetalle = document.getElementById("btnDetalleCompra");
btnDetalle.onclick = () => {
    detalleDeCompra(listaLibrosComprar, descuento)
}*/


// Genero el detalle de la compra
function detalleDeCompra(listaLibrosCompra, descuento) {
    let i=0;
    let total = 0;
    let mensajeDetalleCompra = "DETALLE DE COMPRA\n"
    listaLibrosCompra.forEach(function (libro) {
    mensajeDetalleCompra += (i+1).toString() + ") "
    mensajeDetalleCompra += libro.titulo + " - "
    mensajeDetalleCompra += libro.genero + " - $"
    mensajeDetalleCompra += libro.precio + " x "
    mensajeDetalleCompra += libro.stock + "\n"
    total += Number(libro.precio*libro.stock)
    i++
    })
    mensajeDetalleCompra += "TOTAL $"+total
    if(descuento!=1)
    mensajeDetalleCompra += "\nTOTAL CON DESCUENTO "+Math.round((1-Number(descuento))*100).toString()+ "% $"+(total*descuento)
    alert(mensajeDetalleCompra)
}



//   **********  CARGO BOTONES DE FILTRO      *********
const contenedorFiltros = document.getElementById("btnsFiltro")
obtenerGenero(libros)
function obtenerGenero(libros) {
    const listaGeneros = [];
    libros.forEach(libro => {
        if(libro.genero.includes("/")){
            const subGeneros = libro.genero.split("/");
            subGeneros.forEach( gen => {
                listaGeneros.push(gen);
            })
        } else {
            listaGeneros.push(libro.genero);
        }
    })

    listaGenerosLimpia = [...new Set(listaGeneros)];
    cargarBotonesFiltro(listaGenerosLimpia);
}

function cargarBotonesFiltro(listaFiltros) {
    const button = document.createElement("button");
    button.className = "btn btn-sm btn-outline-secondary m-1";
    button.id = "todos";
    button.innerHTML = "Todos";
    button.addEventListener("click", aplicarFiltro.bind(null, "todos"));
    contenedorFiltros.appendChild(button);
    listaGenerosLimpia.forEach( genero => {
        const button = document.createElement("button");
        button.className = "btn btn-sm btn-outline-secondary m-1";
        button.id = genero;
        button.innerHTML = genero;
        button.addEventListener("click", aplicarFiltro.bind(null, genero));
        contenedorFiltros.appendChild(button);
    })
}

// AGREGO EVENTO A BOTONES DE FILTRO CATEGORIAS
let filtro = "todos";

function aplicarFiltro(genero) {
    filtro = genero;
    libros = filtrado(genero, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros);
}

// AGREGO EVENTO EL CHECKBOX DE STOCK
const checkStock = document.getElementById("soloStock");
checkStock.onclick = () => {
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros)
}

// Aplico filtro por género y si verifica stock
function filtrado(genero, hayStock) {
    if(genero === "todos"){
        let librosFiltrados = listaLibros.filter(libro => libro.stock >= hayStock);
        return librosFiltrados;
    }
    else{
        let librosFiltrados = listaLibros.filter(libro => libro.genero.includes(genero) && libro.stock >= hayStock);
        return librosFiltrados;
    }
}
