const inquirer = require('inquirer');
const Word = require('./word');

const wordGuessGame = {
  maxGuesses: 10,

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
  }

};


const guessWord = function(wordObj) {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Guess a letter!',
      name: 'guess'
    }
  ]).then((answer) => {
    wordObj.checkLetters(answer.guess);
    console.log(wordObj.displayWord());
    if (!wordObj.isGuessed) {
      guessWord(wordObj);
    }
  });
}

const playGame = function() {
  const wordChosen = wordGuessGame.getWord();
  wordGuessGame.deleteWordFromArr();
  console.log(wordChosen);
  const wordObj = new Word(wordChosen.toLowerCase());

  guessWord(wordObj);
}

// If (wordGuessGame.wordArr.length > 0)
playGame();