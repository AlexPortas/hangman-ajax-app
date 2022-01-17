const url = 'https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json'
let letrasIntentadas = [];
let intentosQuedan = 10;
empezarJuego();

async function empezarJuego() {
    console.log('entro')
    let respuesta = await fetch(url);
    let nuevoArray = await respuesta.json();
    console.log(nuevoArray)
    let numeroAleatorio = Math.floor(Math.random() * nuevoArray.length);
    let pelicula = nuevoArray[numeroAleatorio];
    insertarNuevaPelicula(pelicula);
    document.querySelector('#reset').addEventListener('click', resetDOM);
    actualizarCuadroIntentos(intentosQuedan);
}

function insertarNuevaPelicula(pelicula) {
    let cajaAdivinar = document.querySelector('#puzzle')
    cajaAdivinar.innerHTML = ""
    let span
    console.log("Nombre peli:", pelicula.title);
    for (letra of pelicula.title) {
        span = document.createElement('span')
        // texTcontent del span es un espacio; o bien, tenemos que comprobar si hemos adivinado la letra ya; y poner la letra o un * (asterisco)
        span.textContent = (letra == " " || letra == ":") ? " " : "*";
        cajaAdivinar.appendChild(span);
    }
}


function actualizarCuadroIntentos(intentosQuedan) {
    let guesses = document.querySelector('#guesses')

    guesses.textContent = "Intentos: " + intentosQuedan
}

function añadirIntento(letrasIntentadas) {
    let letters_tried = document.querySelector('#letters-tried')
    letters_tried.innerHTML = ""
    for (letter of letrasIntentadas) {
        let span = document.createElement('span')
        span.textContent = letter
        letters_tried.appendChild(span)
    }
}

function resetDOM() {
    document.querySelector('#letters-tried').innerHTML = "";
    empezarJuego();
    intentosQuedan = 10;
}


document.addEventListener('keydown', intentarLetra);

function intentarLetra(event) {
    console.log(event.key);
    let letra = event.key;
    comprobarLetra(letra, letrasIntentadas)
}

function comprobarLetra(letra, arrayIntentos) {
    if (arrayIntentos.includes(letra)) {
        return 
    }
    arrayIntentos.push(letra)
}
