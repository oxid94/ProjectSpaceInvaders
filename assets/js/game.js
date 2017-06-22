function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.aliens = options.aliens;
  this.spacecraft = options.spacecraft;
  this.shield = null;
  this.points = 0;
}

// Funcion que genera el grid del juego
Game.prototype.generateGrid = function(){
  for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
    for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
      $('.grid').append($('<div>')
        .addClass('block')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex)
      );
    }
  }
}

// Funcion que borra el grid del juego
Game.prototype.deleteGrid = function(){
    $('.grid').children().remove();
    this.spacecraft.shoot = [];
}

// La funcion que recoge los comandos de teclado
Game.prototype.assignControlsToKeys = function(){
  $('body').unbind();
  var self = this;
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 65: // arrow left
        self.spacecraft.moveSpacecraft("left");
        break;
      case 68: // arrow right
        self.spacecraft.moveSpacecraft("right");
        break;
      case 83: // arrow right
          self.spacecraft.activeShield();
          break;
      case 32: // space bar (shot)
        self.spacecraft.generateShoot();
          break;
      }
  });
}

// La funcion dibuja el grid la nave y los aliens
Game.prototype.drawItemsToStart = function(){
  this.generateGrid();
  this.spacecraft.drawSpacecraft();
  this.aliens.drawAlien()
}

// La funcion que genera el movimiento
//    1- mira si un disparo de la nave ha impactado a un alien
//    2- mueve los aliens, y mira si han tocado la nave (Si tocan la nave salta el Game Over)
//    3- mueve los disparos de la nave
Game.prototype.startMoveGame = function(){
  this.shootImpactAlien();
  this.spacecraft.moveShoot();
  this.generateShield();
  this.spacecraft.drawShields();
  if(this.shield !== null) {
    this.moveShield();
  }
  this.drawPoints();
  var alienTouchUser = this.aliens.moveAlien();
  return alienTouchUser;
}

// Funcion que salta un alert con gameOver, si un disparo de un alien te toca o los aliens te tocan.
Game.prototype.gameOver = function (restart) {
  var save = false;
  // var self = this;
  var isGameOver = false;
    this.aliens.arShoots.forEach(function (shot, pos){
      if(this.spacecraft.pos.row === shot.row && this.spacecraft.pos.col === shot.col) {
        if (this.spacecraft.activateShield === false) {
          if(save === false) {
            isGameOver = true;
            this.deleteGrid();
            new buzz.sound("assets/sound/playerDie.wav").play();
          }
        } else {
          this.spacecraft.activateShield = false;
          save = true;
          this.aliens.arShoots.splice(pos,1);
        }
      } else {
        if(!restart) {
          isGameOver = true;
          this.deleteGrid();
          new buzz.sound("assets/sound/playerDie.wav").play();
        }
      }
    }.bind(this));
  return isGameOver;
}

Game.prototype.shootImpactAlien = function() {
  var self = this;
  this.aliens.arAlien.forEach(function(fila, fIndex){
    fila.forEach(function(alien, aIndex){
      var alienRow = alien.row;
      var alienCol = alien.col;
      self.spacecraft.shoot.forEach(function(shot, sIndex) {
          if(shot.row === alienRow && shot.col === alienCol){
            self.spacecraft.shoot.splice(sIndex,1);
            self.aliens.arAlien[fIndex][aIndex] = 0;
            new buzz.sound("assets/sound/invaderDie.wav").play();
            self.points += 5;
          }
      })
    });
  });
  this.aliens.drawAlien();
  this.drawPoints();
}

Game.prototype.generateShield = function() {
  if (this.shield === null ) {
    var randomNum = Math.floor(Math.random() * 30);
    if( randomNum === 15 ) {
      var shild = {
        row: 0,
        col: Math.floor(Math.random() * 20)
      }
      this.shield = shild;
      this.drawShield();
    }
  }
}

Game.prototype.drawShield = function() {
  var selector = '[data-row=' + this.shield.row + '][data-col=' + this.shield.col + ']';
  $(selector).append($('<span>').addClass('icon-bubbles'))
}

Game.prototype.removeShield = function() {
  $('.block  > span.icon-bubbles').remove();
}

Game.prototype.moveShield = function() {
  if( this.shield.row > 30) {
    this.shield = null;
  } else {
    this.shield.row+=1;
    this.removeShield();
    this.drawShield();
    this.dropShield();
  }
}

Game.prototype.drawPoints = function() {
    $('#points').text("Points: " + this.points);
}

Game.prototype.dropShield = function() {
  if(this.spacecraft.pos.row === this.shield.row && this.spacecraft.pos.col === this.shield.col) {
    this.shield = null;
    this.spacecraft.shields+=1;
    this.removeShield();
  }
}
