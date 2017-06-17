function Spacecraft(){
  this.shields = 0;
  this.pos = {
    row: 28,
    col: 9
  }
  this.shoot = [];
}

Spacecraft.prototype.drawSpacecraft = function() {
    var selector = '[data-row=' + this.pos.row + '][data-col=' + this.pos.col + ']';
    $(selector).append($('<span>').addClass('icon-spaceship'))
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
  $('.block  > span.icon-spaceship').remove();
}

Spacecraft.prototype.generateShoot = function() {
  if (this.shoot.length >= 5){
    var oldShootMillis = this.shoot[this.shoot.length-5].timeMillis;
    var now = new Date().getTime();
    if ( now-oldShootMillis > 5000) {
      var rowS = this.pos.row-1;
      var colS = this.pos.col;
      if(!this.existShootInSamePosition(rowS,colS)){
        var shoot = {
          row: rowS,
          col: colS,
          timeMillis: now
        }
        new buzz.sound("assets/sound/shoot.wav").play();
        this.shoot.push(shoot);
      }
    }
  } else {
    var rowS = this.pos.row-1;
    var colS = this.pos.col;
    var now = new Date().getTime();
    if(!this.existShootInSamePosition(rowS,colS)){
      var shoot = {
        row: rowS,
        col: colS,
        timeMillis: now
      }
      this.shoot.push(shoot);
      new buzz.sound("assets/sound/shoot.wav").play();
    }
  }
  this.drawShoot();
}

Spacecraft.prototype.existShootInSamePosition = function(row, col) {
  var exist = false;
  this.shoot.forEach(function(shot) {
    if(shot.row === row && col === shot.col) {
      exist = true;
    }
  });
  return exist;
}

Spacecraft.prototype.drawShoot = function() {
  var self = this;
  this.shoot.forEach(function(shot) {
    var row = shot.row - 1;
    var col = shot.col;
    var selector = '[data-row=' + row + '][data-col=' + col + ']';
    $(selector).append($('<span>').addClass('icon-bomb'))
  });
}


Spacecraft.prototype.removeShoot = function() {
  $('.block  > span.icon-bomb').remove();
}

Spacecraft.prototype.moveShoot = function() {
  var self = this;
  this.shoot.forEach(function(shot, index) {
    self.shoot[index].row = shot.row - 1;

    if(self.shoot[index].row < 0) {
      self.shoot.splice(index,1);
    }
  });
  this.removeShoot();
  this.drawShoot();
}
