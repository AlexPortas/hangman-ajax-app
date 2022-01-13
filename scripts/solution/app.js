startGame()

function startGame() {
    Requests.getMovieFromJSON(processJSONResponse)
    document.querySelector('#reset').addEventListener('click', startGame)
}

function checkNewLetter(event) {
    Status.newLetterTested(event.key)
    Dom.updateGuessingText(Status.chances)
    Dom.addTestedLetters(Status.lettersTested)
    
    if (Status.isGameWin()) {
        document.removeEventListener('keydown', checkNewLetter)
        Dom.showEndOfGameMessage(true)

        let audio = new Audio(CONFIG.WIN_SOUND);
        audio.play();

        Requests.getMovieFromIMDB(Status.movieToGuess.title, Dom.setBackgroundImage)
    }

    else if (Status.isGameLost()) {
        document.removeEventListener('keydown', checkNewLetter)
        Dom.showEndOfGameMessage(false)

        let audio = new Audio(CONFIG.LOST_SOUND);
        audio.play();
    }
}

function setupGame(movie) {
    Status.setupGame(movie)
    Dom.resetDOM()
    Dom.render(Status.movieToGuess.title, Status.lettersTested)
    Dom.updateGuessingText(Status.chances)
    document.addEventListener('keydown', checkNewLetter);
}


function processJSONResponse(result) {
    
    let newArray = result;
    let wordsNumber = CONFIG.MOVIE_NUM_WORDS

    if (wordsNumber) {
        newArray = result.map(element => {
            element.words = element.title.split(" ").length
            return element
        })

        newArray = newArray.filter(element => {
            return element.words == wordsNumber
        })
    }
    let movie = Utils.getRandomValueFromArray(newArray)
    setupGame(movie) // Esta decisión de pasar el objeto entero en vez de solo el título, tendrá consecuencias.
    // Cuando quieres flexibilidad (poder consultar más tarde el ranking de la película, por ejemplo); pierdes simplicidad (el dato a minuplar es más complejo)
}