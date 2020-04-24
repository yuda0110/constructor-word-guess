const inquirer = require('inquirer');
const Word = require('./word');

const wordGuessGame = {
  maxGuesses: 10,

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

  // wordObj: new Word(this.getWord()),

  getWord: function () {
    this.randomIndex = Math.floor(Math.random() * this.wordArr.length)
    return this.wordArr[this.randomIndex];
  },

  deleteWordFromArr: function () {
    this.wordArr.splice(this.randomIndex, 1);
  }

};


const guessWord = function(wordObj, wordChosen) {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Guess a letter!',
      name: 'guess'
    }
  ]).then((answer) => {
    wordObj.checkLetters(answer.guess);
    const displayedWord = wordObj.displayWord();
    console.log(displayedWord);
    wordObj.isCorrect ? console.log('CORRECT!') : console.log('INCORRECT!');

    if (wordChosen === displayedWord) {
      console.log('You got it right! Next word!!');
    } else {
      guessWord(wordObj, wordChosen);
    }
  });
}

const playGame = function() {
  const wordChosen = wordGuessGame.getWord().toLowerCase();
  wordGuessGame.deleteWordFromArr();
  console.log(wordChosen);
  const wordObj = new Word(wordChosen);

  guessWord(wordObj, wordChosen);
  // playGame();
}

// If (wordGuessGame.wordArr.length > 0)
playGame();