class Libro {
    constructor(titulo, genero, precio, stock){
        this.titulo = titulo
        this.genero = genero
        this.precio = precio
        this.stock = stock
    }
}

let libro1 = new Libro("JavaScript para principiantes", "Universitario/Informática", 2500, 10)
let libro2 = new Libro("JAVA Avanzado", "Universitario/Informática", 3800, 6)
let libro3 = new Libro("Redes", "Universitario/Informática", 6500, 10)
let libro4 = new Libro("Juego de Tronos", "Fantasía", 1800, 4)
let libro5 = new Libro("Dune", "Ciencia ficción", 2200, 9)
let libro6 = new Libro("Soy Leyenda", "Ciencia Ficción/Terror", 1500, 13)
let libro7 = new Libro("La enseñanza del derecho", "Universitario/Leyes", 4750, 17)

let listaLibros = [ libro1, libro2, libro3, libro4, libro5, libro6, libro7 ]
let listaLibrosComprar = []
let i = 1

let mensajeIngreso = "ELIJA UNA OPCIÓN PARA AÑADIR AL CARRO\n"
listaLibros.forEach(function (libro) {
    mensajeIngreso += i.toString() + ") "
    mensajeIngreso += libro.titulo + " - "
    mensajeIngreso += libro.genero + " - $"
    mensajeIngreso += libro.precio + "\n"
    i++
})
mensajeIngreso += "0) Terminar compra"
let seleccion
let codDescuento
let descuento

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

function controlOpciones(seleccion, indice) {
    return (!isNaN(seleccion) && (Number(seleccion)>0 && Number(seleccion)<i))
}

function validarCodigoDescuento (codigo) {
    switch(codigo){
        case 'DESC1': descuento = 0.90; break;
        case 'DESC2': descuento = 0.85; break;
        case 'DESC3': descuento = 0.80; break;
        case 'DESC4': descuento = 0.75; break;
        default: alert('Código incorrecto'); descuento = 1;
    }
}

function detalleDeCompra(listaLibrosCompra, descuento) {
    let i=0;
    let total = 0;
    let mensajeDetalleCompra = "DETALLE DE COMPRA\n"
    listaLibrosCompra.forEach(function (libro) {
    mensajeDetalleCompra += i.toString() + ") "
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