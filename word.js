const Letter = require('./letter');

const Word = function(wordStr) {
  const letterArr = wordStr.split('');
  console.log('letterArr: ' + letterArr);

  this.isGuessed = false;

  this.letterObjArr = letterArr.map((char) => {
    console.log('char: ' + char);
    return new Letter(char);
  })

  this.displayWord = function() {
    const stringArr = this.letterObjArr.map(function(letter) {
      return letter.display();
    });
    return stringArr.join('');
  };

  this.checkLetters = function(inputChar) {
    let isGuessedFlag = true;
    this.letterObjArr.forEach(function(letter) {
      if (!letter.isGuessed) {
        isGuessedFlag = false;
        letter.check(inputChar);
      }
    })
    this.isGuessed = isGuessedFlag;
  };
};

module.exports = Word;