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
    this.isGuessed = inputChar === this.underlyingChar;
    return inputChar === this.underlyingChar;
  }
}

module.exports = Letter;