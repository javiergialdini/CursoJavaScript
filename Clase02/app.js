function askEdad(){
    let edad = prompt("Ingrese la edad: ");
    
    if(edad < 18){
        alert("Eres menor de edad")
    }
    else{
        alert("Eres mayor de edad")
    }
}

function ingresarNombre(){
    let nombreIngresado = prompt("Ingresar nombre")

    if((nombreIngresado != "") && ( nombreIngresado =="EMA" || nombreIngresado == "ema")){
        alert("Hola Ema!!!!")
    }
    else
    { 
        alert("Otro nombre")
    }
}

function ingresarNum(){
    let num1 = prompt("Ingresa el primer nuúmero")
    let num2 = prompt("Ingresa el segundo número")

    if(num1 != "" && num2 != ""){ 
        if(Number(num1) > Number(num2)){
            alert("El mayor es " + num1)
        }
        else if (Number(num1) === Number(num2)){
            alert("Son iguales")
        }
        else{
            alert("El mayor es " + num2)
        }
    }
    else{
        alert("Debe ingresar los 2 números")
    }
}

function checkDiv(){
    let resp = " no es divisible entre 2"
    let num = prompt("Ingrese un número")

    if(Number(num)%2 == 0)
        resp = " es divisible entre 2"
    if(isNaN(num))
        resp = " no es un número"

    alert("'" + num + "'" + resp)
}

function ingresarTresNum(){
    let num1 = prompt("Ingresa el primer número")
    let num2 = prompt("Ingresa el segundo número")
    let num3 = prompt("Ingresa el tercer número")

    if(num1 != num2 && num1 != num3 && num2 != num3){
        if(num1 > num2){
            if(num1 > num3)
                alert(num1 + " es el mayor de los 3")
            else
                alert(num3 + " es el mayor de los 3")
        }
        else{
            if(num2 > num3)
                alert(num2 + " es el mayor de los 3")
            else
                alert(num3 + " es el mayor de los 3")
        }
    }
    else{
        alert("Debe ingresa 3 números diferentes")
    }
}

function entradaBar(){
    let nombreReserva = prompt("Ingresa el nombre de la reserva")

    if(nombreReserva.toLowerCase() == "carlos"){
        alert("Reserva para 4 personas...")
        let nom1 = prompt("Ingrese el nombre del primer acompañante")
        let edad1 = prompt("Ingrese su edad")
        let gen1 = prompt("Ingrese ")
    }
    else{
        alert("No tenemos reserva con ese nombre")
    }
}