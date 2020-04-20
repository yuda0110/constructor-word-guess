const Letter = function() {
  this.underlyingChar = '';
  this.isGuessed = false;

  this.display = function() {
    const placeholder = '_';
    return this.isGuessed ? this.underlyingChar : placeholder;
  }

  this.check = function(inputChar) {
    this.isGuessed = inputChar === this.underlyingChar;
  }
}

module.exports = Letter;