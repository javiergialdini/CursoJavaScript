//tarea
// 1
console.log('Ejercicio 1')
function esMayor(value) {
    return value > 3;
}
function display(num) {
    return num;
}
var arreglo = [1,4,6,10,22,55,46,2,5,0]
var filtrado = arreglo.filter(esMayor).map(display);

console.log(Math.max(...filtrado))
console.log('\n*****************\n')

// 2 formatear un numero hasta lugares decimales específicos
console.log('Ejercicio 2')
let num = 2.231456

function cantDec (n) {
    return (m) => m.toFixed(n);
}

let formateado = cantDec(3)

console.log(formateado(2.124569))
console.log('\n*****************\n')

// 3 escriba una función para obtener la cantidad de dias de un mes
console.log('Ejercicio 3')
let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiebre', 'Octubre', 'Noviembre', 'Diciembre']

ultimoDiaMes(meses)

function ultimoDiaMes(meses){
    let day = new Date();
        meses.forEach( (mes) => {
                day.setMonth(meses.indexOf(mes)+1)
                let lastDay = new Date(day.getFullYear(), day.getMonth(), 0)
                console.log(mes + ' ' + lastDay.getDate().toString() + ' días')
        }
    )
}
console.log('\n*****************\n')

