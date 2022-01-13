/**
 * En este fichero vamos a crear un método para hacer la llamada para descargar un fichero de películas ubicado en https://github.com/hjorturlarsen/IMDB-top-100/blob/master/data/movies.json
 * 
 * La llamada debe aceptar un parámetro opcional. Si el parámetro es vacio, vamos a devolver una película al azar.
 * 
 * Si tiene un valor, entre 1 y 15; vamos a devolver el nombre de una película que contenga exactamente dicho número de palabras
 * 
 * 
 */
const Requests = {
    getMovieFromIMDB(title, cb) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=f67a8ad780c75b59b2e185315b4e7818&language=en-US&page=1&include_adult=false&query=${title}`
        const path_to_images = 'https://image.tmdb.org/t/p/original'
        fetch(url).
            then(response => response.json()).
            then(result => cb(path_to_images + result.results[0].poster_path)).
            catch(error => console.error(error))

    },

    /**
     * Hace una llamada AJAX para obtener el fichero JSON.
     * 
     * @param {*} cb Función callback. Función que vamos a invocar, pasándole un parámetro de resultados, cuando haya terminado la llamada AJAX
     */
    getMovieFromJSON(cb) {
        const url = 'https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json'
        fetch(url).
            then(response => response.json()).
            then(result => cb(result))
    }
}
