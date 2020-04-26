const inquirer = require('inquirer');
const Word = require('./word');

const wordGuessGame = {
  gameState: null,

  randomIndex: 0,

  wordArr: [
    'star wars',
    'avengers',
    'avatar',
    // 'black panther',
    // 'titanic',
    // 'jurassic world',
    // 'incredibles',
    // 'the lion king'
  ],

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
      remainingGuesses: 5,
      guessedLetters: []
    }
  }
};


const nextMove = () => {
  if (wordGuessGame.wordArr.length > 0) {
    console.log('Next word!!\n===============================');
    playGame();
  } else {
    console.log('You have already guessed all the words :)')
  }
}


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
          return 'Invalid input! Please type in only an alphabet.';
        }
      }
    }
  ]).then(answer => {
    const guessedLetter = answer.guess;
    const guessedLettersArr = wordGuessGame.gameState.guessedLetters;

    if (guessedLettersArr.includes(guessedLetter)) {
      console.log('You have already guessed the letter. Please try another letter.');
      guessWord(wordObj, chosenWord);
    } else {
      guessedLettersArr.push(guessedLetter);

      wordObj.checkLetters(guessedLetter);
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
        nextMove();
      } else if (wordGuessGame.gameState.remainingGuesses <= 0) {
        console.log(`You got it wrong! The correct word: ${chosenWord}`);
        nextMove();
      } else {
        guessWord(wordObj, chosenWord);
      }
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


const playGame = () => {
  console.log('Let\'s guess a movie title!!');
  wordGuessGame.startNewWord();
  const chosenWord = wordGuessGame.getWord().toLowerCase();
  wordGuessGame.deleteWordFromArr();
  const wordObj = new Word(chosenWord);

  guessWord(wordObj, chosenWord);
}

playGame();