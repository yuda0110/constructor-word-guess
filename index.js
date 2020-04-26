const inquirer = require('inquirer');
const Word = require('./word');

const wordGuessGame = {
  gameState: null,

  randomIndex: 0,

  wordArr: [
    'star wars',
    'avengers',
    // 'avatar',
    // 'black panther',
    // 'titanic',
    // 'jurassic world',
    // 'incredibles',
    // 'the lion king'
  ],

  // wordObj: new Word(this.getWord()),

  getWord: function () {
    this.randomIndex = Math.floor(Math.random() * this.wordArr.length)
    return this.wordArr[this.randomIndex];
  },

  deleteWordFromArr: function () {
    this.wordArr.splice(this.randomIndex, 1);
  },

  startNewWord: function () {
    this.gameState = this.gameStateFactory();
  },

  gameStateFactory: function () {
    return {
      remainingGuesses: 5
    }
  }

};


const guessWord = function(wordObj, chosenWord) {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Guess a letter!',
      name: 'guess',
      validate: (input) => {
        if (input.length === 1 &&
          (input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 90)
          || (input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122)) {
          return true;
        } else {
          return 'Invalid value! Please type in only an alphabet.';
        }
      }
    }
  ]).then(answer => {
    wordObj.checkLetters(answer.guess);
    const displayedWord = wordObj.displayWord();
    console.log(displayedWord);

    if (wordObj.isCorrect) {
      console.log('CORRECT!')
    } else {
      console.log('INCORRECT!');
      wordGuessGame.gameState.remainingGuesses--;
      console.log(`${wordGuessGame.gameState.remainingGuesses} guesses remaining!!`);
    }

    if (chosenWord === displayedWord) {
      console.log('You got it right!');
      if (wordGuessGame.wordArr.length > 0) {
        console.log('Next word!!');
        playGame();
      } else {
        console.log('You have already guessed all the words :)')
      }
    } else if (wordGuessGame.gameState.remainingGuesses <= 0) {
      console.log(`You got it wrong! The correct word: ${chosenWord}`);
      if (wordGuessGame.wordArr.length > 0) {
        console.log('Next word!!');
        playGame();
      } else {
        console.log('You have already guessed all the words :)')
      }
    } else {
      guessWord(wordObj, chosenWord);
    }
  }).catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log('TtyError: ');
      console.log(error);
    } else {
      // Something else when wrong
      console.log(error);
    }
  });
}

const playGame = function() {
  wordGuessGame.startNewWord();
  const chosenWord = wordGuessGame.getWord().toLowerCase();
  wordGuessGame.deleteWordFromArr();
  console.log(chosenWord);
  const wordObj = new Word(chosenWord);

  guessWord(wordObj, chosenWord);
}

playGame();