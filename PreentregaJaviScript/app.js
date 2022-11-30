class Libro {
    constructor(id,titulo, genero, precio, stock){
        this.id = id;
        this.titulo = titulo
        this.genero = genero
        this.precio = precio
        this.stock = stock
    }
}

let libro1 = new Libro(1, "JavaScript para principiantes", "Universitario/Informática", 2500, 10)
let libro2 = new Libro(2, "JAVA Avanzado", "Universitario/Informática", 3800, 0)
let libro3 = new Libro(3, "Redes", "Universitario/Informática", 6500, 10)
let libro4 = new Libro(4, "Juego de Tronos", "Fantasía", 1800, 4)
let libro5 = new Libro(5, "Dune", "Ciencia ficción", 2200, 9)
let libro6 = new Libro(6, "Soy Leyenda", "Ciencia Ficción/Terror", 1500, 13)
let libro7 = new Libro(7, "La enseñanza del derecho", "Universitario/Leyes", 4750, 17)

let listaLibros = [ libro1, libro2, libro3, libro4, libro5, libro6, libro7 ]
let libros = listaLibros;
let listaLibrosComprar = [];
let codigoDescuento;
let descuento;


// CARGO CAJAS DE LIBROS
const contenedorLibros = document.getElementById("div1")
mostrarLibros(libros);
function mostrarLibros(librosMostrar) {
    contenedorLibros.replaceChildren();
    librosMostrar.forEach(libro => {
        const div = document.createElement("div");
        div.className = "caja";
        div.innerHTML = `<div class="nombreLibro"><p>${libro.titulo}</p></div>
                        <div><p>Precio: $${libro.precio}</p></div>
                        <div><button class="btnAgregar" value="${libro.id}" onClick="añadeACarro(${libro.id})"> Añadir al carro </button></div>
                        <div><p style="font-size: 10px">Género: ${libro.genero}</p></div>
                        `
        contenedorLibros.appendChild(div);
    })
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
        listaLibros.forEach(libro => {
        const div = document.createElement("div");
        div.className = "carrito";
        div.innerHTML = `<ul><li type="disc">${libro.titulo} $${libro.precio} <input type="submit" value="Quitar" onClick="quitarDeCarro(${libro.id})"></li></ul>`;
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
        listaLibrosComprar.push(listaLibros.find(libro => libro.id === id))
        document.getElementById("cantItems").innerHTML = `Items en el carro: ${listaLibrosComprar.length}`;
    }
    else {
        alert("Lo sentimos. Ya no quedan disponibles :(")
    }
}

// QUITO DEL CARRO
function quitarDeCarro(id){
    const index = listaLibrosComprar.map( libro => libro.id).indexOf(id);
    listaLibrosComprar.splice(index, 1);
    document.getElementById("cantItems").innerHTML = `Items en el carro: ${listaLibrosComprar.length}`;
    mostrarCarrito(listaLibrosComprar);
}

function comprar() {
    do {
        seleccion = prompt(mensajeIngreso)
        if(controlOpciones(seleccion, i)){
            indice=seleccion-1
            alert(listaLibros[indice].titulo)
            listaLibrosComprar.push(listaLibros[seleccion])
        }
        else if(Number(seleccion) === 0)
            continue
        else
            alert('Debe ingresar una opción correcta')
    }
    while (Number(seleccion) != 0)

    do {
        seleccion = prompt('¿Desea agregar codigo de descuento?\n0) NO\n1) SI')
        if(controlOpciones(seleccion, 2)) {
            codDescuento = prompt('Ingrese el código de descuento')
            validarCodigoDescuento(codDescuento)
            if(descuento != 1){
                detalleDeCompra(listaLibrosComprar, descuento)
                seleccion = 0
            }
        }
        else if(Number(seleccion) == 0) {
            detalleDeCompra(listaLibrosComprar, 1)
        }
        else {
            alert('Debe ingresar una opción correcta')
        }
    }
    while(Number(seleccion) != 0)
    listaLibrosComprar = [];
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
    mensajeDetalleCompra += libro.precio + "\n"
    total += Number(libro.precio)
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