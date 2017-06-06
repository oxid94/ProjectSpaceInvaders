function Spacecraft(){
  this.lives = 3;
  this.pos = {
    row: 28,
    col: 9
  }
}

Spacecraft.prototype.drawSpacecraft = function() {
    var selector = '[data-row=' + this.pos.row + '][data-col=' + this.pos.col + ']';
    $(selector).append($('<span>').addClass('icon-spaceship').addClass('spaceship'))
};

Spacecraft.prototype.goLeft = function() {
  if(this.pos.col > 0)
    this.pos.col = this.pos.col -1;
};

Spacecraft.prototype.goRight = function() {
  if(this.pos.col < 19)
    this.pos.col = this.pos.col +1;
};

Spacecraft.prototype.moveSpacecraft = function(option) {
  this.removeSpacecraft();
  switch (option) {
    case "left":
        this.goLeft();
      break;
    case "right":
        this.goRight();
      break;
  }
  this.drawSpacecraft();
}

Spacecraft.prototype.removeSpacecraft = function() {
  $('.block  > span.spaceship').remove();
}
