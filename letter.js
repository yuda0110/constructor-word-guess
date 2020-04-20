const Letter = function() {
  this.underlyingChar = '';
  this.isGuessed = false;

  this.displayChar = function() {
    const placeholder = '_';
    return this.isGuessed ? this.underlyingChar : placeholder;
  }

  this.checkChar = function(inputChar) {
    this.isGuessed = inputChar === this.underlyingChar;
  }
}

module.exports = Letter;