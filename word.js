const Letter = require('./letter');

const Word = function(wordStr) {
  const letterArr = wordStr.split('');
  console.log('letterArr: ' + letterArr);

  this.isCorrect = false;

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
    let isCorrectFlag = false;
    const remainingLetterObjArr = [];

    this.letterObjArr.forEach((letterObj) => {
      if (!letterObj.isGuessed) {
        remainingLetterObjArr.push(letterObj);
      }
    });

    remainingLetterObjArr.forEach(function(letter) {
      if (letter.check(inputChar)) {
        isCorrectFlag = true;
      }
    })

    this.isCorrect = isCorrectFlag;
    console.log('isCorrect1: ' + this.isCorrect);
  };

};

module.exports = Word;