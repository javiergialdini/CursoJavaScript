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
let libro5 = new Libro(5, "Dune", "Ciencia ficción", 2200, 9, "Dune.jpg")
let libro6 = new Libro(6, "Soy Leyenda", "Ciencia Ficción/Terror", 1500, 13, "SLEY.jpg")
let libro7 = new Libro(7, "El derecho Penal Argentino en la historia", "Universitario/Leyes", 4750, 17, "DER.png")

let listaLibros = [ libro1, libro2, libro3, libro4, libro5, libro6, libro7 ]
let libros = listaLibros;
let listaLibrosComprar = [];
let codigoDescuento;
let descuento = 1;

let totalesCarrito = 0;


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

        const pathIMG = libro.img != '' ? ("./img/" + libro.img) : "holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail";
        div.className = "col-md-3";
        div.innerHTML = `<div class="card mb-4 box-shadow">
                            <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="${pathIMG}" data-holder-rendered="true">
                            <div class="card-body">
                                <p class="card-text">${libro.titulo}</p>
                                <small class="text-muted">Género: ${libro.genero}</small>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" value="${libro.id}" onClick="añadeACarro(${libro.id})">Añadir</button>
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
    const btnDesc = document.getElementById("btnDesc");
    btnDesc.innerHTML = "OBTENER CODIGO DESCUENTO"
}

// AGREGO EVENTO AL BOTON CARRO
const btnCarro = document.getElementById("btnCarro");
btnCarro.onclick = () => {
    if(btnCarro.innerHTML === "VER CARRO")
        mostrarCarrito(listaLibrosComprar);
    else
        mostrarLibros(listaLibros);
}

// AGREGO EVENTO AL BOTON OBTENER DESCUENTOS
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
}

// AGREGO EVENTO A BOTON DETALLE DE COMPRA
const btnDetalle = document.getElementById("btnDetalleCompra");
btnDetalle.onclick = () => {
    detalleDeCompra(listaLibrosComprar, descuento)
}

// CARGO LISTA DE CARRITO CON LIBROS AGREGADOS
function mostrarCarrito(listaLibros) {
    contenedorLibros.replaceChildren();
    if(listaLibros == "") {
        const div = document.createElement("div");
        div.className = "carrito";
        div.innerHTML = `<h2> Aún no agregó ningún libro al carro </h2>`;
        contenedorLibros.appendChild(div);
    }
    else
    {
        contenedorLibros.style = "width: 50%;";
        listaLibros.forEach(libro => {
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
                                        <input type="submit" value="-" style=" width: 35px;" onClick=quitarElemento(${libro.id})>
                                    </td>
                                    <td style="padding-left: 2px; width: 1%;">
                                        <input type="nummber" value="${libro.stock}" style=" width: 35px; text-align: center;">
                                    </td>
                                    <td style="padding-left: 2px; width: 1%;">
                                        <input type="submit" value="+" style=" width: 35px;" onClick="agregarElemento(${libro.id})">
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
    const btnDesc = document.getElementById("btnDesc");
    btnDesc.innerHTML = "AGREGAR CÓDIGO DESCUENTO"
}

// AÑADO LIBRO AL CARRO
function añadeACarro(id){
    if(listaLibros.find(libro => libro.id === id).stock > 0){
        let index = listaLibros.find(libro => libro.id === id).id.toString();
        const libroLista = listaLibrosComprar.find(libro => libro.id === id);

        if(listaLibrosComprar.find(libro => libro.id === id) === undefined){
            let libroAdd = listaLibros.find(libro => libro.id === id);
            libroAdd.stock = 1;
            listaLibrosComprar.push(libroAdd);
        } else {
            listaLibrosComprar.find(libro => libro.id === id).stock ++;
        }

        localStorage.setItem("carritoLibros", listaLibrosComprar);
        totalesCarrito++;
        document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;
        //book = localStorage.getItem("carritoLibros")
        //console.log(book, typeof book)
        //let libroObjeto = JSON.parse(book)
        //console.log(libroObjeto, typeof libroObjeto)
    }
    else {
        alert("Lo sentimos. Ya no quedan disponibles :(")
    }
}

// QUITO LISTA DEL CARRO
function quitarLista(id){
    const index = listaLibrosComprar.map( libro => libro.id).indexOf(id);
    totalesCarrito -= listaLibrosComprar.map( libro => libro.id).stock;
    listaLibrosComprar.splice(index, 1);
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;
    mostrarCarrito(listaLibrosComprar);
}

// QUITO ELEMENTO DEL CARRO
function quitarElemento(id){
    listaLibrosComprar.find(libro => libro.id === id).stock --;
    totalesCarrito --;
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;
    mostrarCarrito(listaLibrosComprar);
}

// AGREGO ELEMENTO AL CARRO
function agregarElemento(id){
    listaLibrosComprar.find(libro => libro.id === id).stock ++;
    totalesCarrito ++;
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${totalesCarrito}`;
    mostrarCarrito(listaLibrosComprar);
}

// Metodo para otorgar descuento
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


// Aplico filtro por género y si verifica stock
function filtrado(genero, hayStock) {
    if(genero === "todos"){
        let librosFiltrados = listaLibros.filter(libro => libro.stock >= hayStock);
        return librosFiltrados;
    }
    else{
        let librosFiltrados = listaLibros.filter(libro => libro.genero === genero && libro.stock >= hayStock);
        return librosFiltrados;
    }
}

// AGREGO EVENTO A BOTONES DE FILTRO CATEGORIAS
let filtro = "todos";

const btnTodos = document.getElementById("todos");
btnTodos.onclick = () => {
    filtro = "todos";
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros);
}

const btnInformatica = document.getElementById("informatica");
btnInformatica.onclick = () => {
    filtro = "Universitario/Informática";
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros);
}

const btnLeyes = document.getElementById("leyes");
btnLeyes.onclick = () => {
    filtro = "Universitario/Leyes";
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros);
}

const btnCienciaFic = document.getElementById("cienciaFic");
btnCienciaFic.onclick = () => {
    filtro = "Ciencia ficción";
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros);
}

const btnFantasia = document.getElementById("fantasia");
btnFantasia.onclick = () => {
    filtro = "Fantasía";
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros);
}

// AGREGO EVENTO EL CHECKBOX DE STOCK
const checkStock = document.getElementById("soloStock");
checkStock.onclick = () => {
    libros = filtrado(filtro, (document.getElementById("soloStock").checked ? 1:0));
    mostrarLibros(libros)
}