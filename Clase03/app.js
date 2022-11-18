function mostrarMultiplos(){
    let num = prompt("Ingrese un número")

    for(let i = 1; i <= num; i++){
        if(i % 5 == 0)
            console.log(i + " es múltiplo de 5")
    }
}
    

function mostrarImpares(){
    for(let i = 1; i <= 50; i++){
        if(i % 2 != 0)
            console.log(i)
    }
}