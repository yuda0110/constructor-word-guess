const inquirer = require('inquirer');
const Word = require('./word');

const wordGuessGame = {
  maxGuesses: 10,

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
    return this.wordArr[Math.floor(Math.random() * this.wordArr.length)];
  }

};


inquirer.prompt([
  {
    type: 'input',
    message: 'Guess a letter!',
    name: 'guess'
  }
]).then((answer) => {
  console.log(answer.guess);
  const wordChosen = wordGuessGame.getWord();
  console.log(wordChosen);
  const wordObj = new Word(wordChosen.toLowerCase());
  wordObj.checkLetters(answer.guess);
  console.log(wordObj.displayWord());
});