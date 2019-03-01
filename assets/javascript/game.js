var game = {
    maskedWord: "_",
    wordArray: [],
    secretWord: " ",
    numberOfWins: 0,
    usedLetters: " ",
    usersLetter: " ",
    messageForUser: " ",
    guessesRemaining: 0,

    loadWordArray: function () {
        this.wordArray.push("Pizza");
        this.wordArray.push("Pear");
        this.wordArray.push("Panetonne");
        this.wordArray.push("Papaya ");
        this.wordArray.push("Paprika");
        this.wordArray.push("Parsley");
        this.wordArray.push("Parsnip");
        this.wordArray.push("Passionfruit");	
        this.wordArray.push("Pasta");
        this.wordArray.push("Peaches");
        this.wordArray.push("Peanuts");
        this.wordArray.push("Peas");
        this.wordArray.push("Pecan");
        this.wordArray.push("Pepper");
        this.wordArray.push("Persimmon");
        this.wordArray.push("Pineapple");
        this.wordArray.push("Pistachios");
        this.wordArray.push("Plum");
        this.wordArray.push("Pomegranate");
        this.wordArray.push("Potato ");
        this.wordArray.push("Prunes	 ");
        this.wordArray.push("Pumpkin");
    },

    getSecretWord: function () {
        this.loadWordArray();
        var i = 0;
        var i = Math.floor(Math.random() * this.wordArray.length)
        this.secretWord = this.wordArray[i];
        this.maskedWord = "";
        for (i = 1; i < this.secretWord.length; i++) {
            this.maskedWord = this.maskedWord + "_";
        }
    },

    startNewGame: function () {

        this.messageForUser = "Press any key to get started!";
        this.getSecretWord();
        this.usedLetters = "";
        this.guessesRemaining = this.secretWord.length * 2;

        this.secretWord = this.secretWord.toLowerCase();
        console.log("The secret word is", this.secretWord)
    },

    refreshGame: function () {
        var winsText = "Number of wins: " + this.numberOfWins.toString();
        var guessText = "Guesses remaining: " + this.guessesRemaining.toString();
        var wordText = "Secret word: ";
        for (var i = 0; i < this.secretWord.length; i++) {
            wordText = wordText + "&nbsp;&nbsp;" + this.maskedWord.charAt(i);
        }
        document.querySelector("#message-for-user").innerHTML = this.messageForUser;
        document.querySelector("#masked-word").innerHTML = wordText;
        document.querySelector("#number-of-wins").innerHTML = winsText;
        document.querySelector("#used-letters").innerHTML = this.usedLetters;
        document.querySelector("#remaining-guesses").innerHTML = guessText;
    },

    checkWordForLetter() {

        // ------------------------------------------------------------------------
        // Does this.usersLetter appear anywhere in this.secretWord 
        // 1. Use indexOf to search for the position of the letter in the word
        // 2. if the indexOf is -1, that means the letter was not found in the word
        // ------------------------------------------------------------------------

        if (this.usedLetters.toLowerCase().indexOf(this.usersLetter) > -1) {
            console.log("The letter", this.usersLetter, "is already in ", this.usedLetters);
            return;
        } else {
            this.usedLetters = this.usedLetters + " " + this.usersLetter.toUpperCase();
            this.guessesRemaining = this.guessesRemaining - 1;
        };

        if (this.secretWord.indexOf(this.usersLetter) == -1) {
            console.log("The letter", this.usersLetter, "is NOT in the word", this.secretWord);

        } else {

            console.log("The letter", this.usersLetter, "IS in the word", this.secretWord);
            // -------------------------------------------------------------------------------
            // Check all the letter in the word to see if they match the users word
            // If we get a match, update the masked word to show the correctly guessed letters
            // -------------------------------------------------------------------------------
            for (var i = 0; i < this.secretWord.length; i++) {

                if (this.usersLetter == this.secretWord.charAt(i)) {
                    // console.log("The letter", this.secretWord.charAt(i), "was found at ", i)
                    console.log("The letter", this.usersLetter, "does equal the", this.secretWord.charAt(i),
                        "at", i)

                    this.maskedWord = this.maskedWord.substring(0, i) +
                        this.usersLetter.toUpperCase() +
                        this.maskedWord.substring(i + 1);
                } else {
                    console.log("The letter", this.usersLetter, "does not equal", this.secretWord.charAt(i),
                        "at", i)
                };
            };

            // check to see if user has guessed all the letters
            if (this.maskedWord.toLowerCase() == this.secretWord.toLowerCase()) {
                console.log("User has won the game", this.maskedWord.toLowerCase(), "=", this.secretWord.toLowerCase())
                this.numberOfWins = this.numberOfWins + 1;
                this.startNewGame();
                this.refreshGame();
            }
        };
        // check to see if player has used up all thier guesses
        if (this.guessesRemaining < 1) {
            console.log("User has lost the game", this.maskedWord.toLowerCase(), "!=", this.secretWord.toLowerCase())
            this.startNewGame();
            this.refreshGame();
        };
    }
};

game.startNewGame();
game.refreshGame();

document.onkeyup = function (event) {
    game.usersLetter = event.key.toLowerCase();;
    game.checkWordForLetter();
    game.refreshGame();
}