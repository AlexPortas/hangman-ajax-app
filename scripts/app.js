const url = 'https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json'
empezarJuego();

async function empezarJuego() {
    console.log('entro')
    let respuesta = await fetch(url);
    let nuevoArray = await respuesta.json();
    console.log(nuevoArray)
    let numElements = nuevoArray.length
    let numeroAleatorio = Math.floor(Math.random() * numElements);
    let pelicula = nuevoArray[numeroAleatorio];
    console.log(pelicula);
    document.querySelector('#reset').addEventListener('click', empezarJuego)
}