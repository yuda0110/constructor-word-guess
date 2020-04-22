const Letter = require('./letter');

const Word = function(wordStr) {
  const letterArr = wordStr.split('');
  console.log('letterArr: ' + letterArr);

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
    this.letterObjArr.forEach(function(letter) {
      letter.check(inputChar);
    })
  };
};

module.exports = Word;