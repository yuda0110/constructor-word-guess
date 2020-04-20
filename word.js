const Letter = require('./letter');

const Word = function() {
  this.letterObjArr = [];

  this.displayWord = function() {
    const stringArr = this.letterObjArr.map(function(letter) {
      return letter.display();
    });
    return stringArr.join('');
  };

  this.myFunc = function(inputChar) {
    this.letterObjArr.forEach(function(letter) {
      letter.check()
    })
  };
};

module.exports = Word;