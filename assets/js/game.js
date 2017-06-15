function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.aliens = options.aliens;
  this.spacecraft = options.spacecraft;
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
  var alienTouchUser = this.aliens.moveAlien();
  return alienTouchUser;
}

// Funcion que salta un alert con gameOver, si un disparo de un alien te toca o los aliens te tocan.
Game.prototype.gameOver = function (restart) {
  var self = this;
  var isGameOver = false;
  if(this.aliens.arAlien.length === 0){
    alert("You Win!");
  } else {
    this.aliens.arShoots.forEach(function (shot){
      if(self.spacecraft.pos.row === shot.row && self.spacecraft.pos.col === shot.col) {
        isGameOver = true;
        self.deleteGrid();
        alert("Game Over");
      } else {
        if(!restart) {
          isGameOver = true;
          self.deleteGrid();
          alert("Game Over");
        }
      }
    });
  }
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
          }
      })
    });
  });
  this.aliens.drawAlien();
}
