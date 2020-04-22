const Letter = function(char) {
  this.underlyingChar = char;
  this.isGuessed = false;

  this.display = function() {
    const placeholder = '_';
    const space = ' ';
    if (char === space) {
      return space;
    } else {
      return this.isGuessed ? this.underlyingChar : placeholder;
    }
  }

  this.check = function(inputChar) {
    console.log('inputChar: ' + inputChar);
    console.log('underlyingChar: ' + this.underlyingChar);
    this.isGuessed = inputChar === this.underlyingChar;
    console.log('Letter.isGuessed: ' + this.isGuessed);
  }
}

module.exports = Letter;