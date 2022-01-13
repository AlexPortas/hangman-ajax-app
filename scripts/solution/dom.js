const Dom = {
    showEndOfGameMessage(game_won) {
        let guesses = document.querySelector('#guesses')
        guesses.textContent = game_won ? "VICTORIA!" : "DERROTA!"
    },

    render(sentence, lettersTested) {
        let guessingBox = document.querySelector('#puzzle')
        guessingBox.innerHTML = ""
        let span
        for (letter of sentence) {
            span = document.createElement('span')
            // texTcontent del span es un espacio; o bien, tenemos que comprobar si hemos adivinado la letra ya; y poner la letra o un * (asterisco)
            span.textContent = (letter == " ") ? " " : this.updateLetterStatus(letter, lettersTested)
            guessingBox.appendChild(span)
        }
    },

    /**
     * Comprueba si currentLetter se encuentra en el array de letras lettersTested
     * 
     * @param {*} currentLetter String que representa una letra
     * @param {*} lettersTested Array de strings que contiene las letras ya probadas
     */
    updateLetterStatus(currentLetter, lettersTested) {
        let letterGuessed = lettersTested.includes(currentLetter)
        if (letterGuessed) {
            return currentLetter
        }

        return '*'
    },

    /**
     * Actualiza el elemeneto del DOM con el número de intentos del parámetro 'numGuessing'
     */
    updateGuessingText(numGuessing) {
        let guesses = document.querySelector('#guesses')

        guesses.textContent = "Intentos: " + numGuessing
    },

    setBackgroundImage(url) {
        document.body.style.backgroundImage = `url(${url})`
        document.body.style.backgroundSize = 'cover'
    },

    resetDOM() {
        document.body.style.backgroundImage = ''
        document.body.style.backgroundSize = ''
        document.querySelector('#letters-tried').innerHTML = ""
    },

    addTestedLetters(testedLetters) {
        let letters_tried = document.querySelector('#letters-tried')
        letters_tried.innerHTML = ""
        for (letter of testedLetters) {
            let span = document.createElement('span')
            span.textContent = letter
            letters_tried.appendChild(span)
        }
    }

}