function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.aliens = options.aliens;
  this.spacecraft = options.spacecraft;

  for (var rowIndex = 0; rowIndex < options.rows; rowIndex++) {
    for (var columnIndex = 0; columnIndex < options.columns; columnIndex++) {
      $('.grid').append($('<div>')
        .addClass('block')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex)
      );
    }
  }
}

Game.prototype.assignControlsToKeys = function(){
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

Game.prototype.start = function(){
  setInterval(this.inverval.bind(this), 500);
  this.spacecraft.drawSpacecraft();
  this.aliens.drawAlien()
  this.assignControlsToKeys();
}

Game.prototype.inverval = function(){
  this.shootImpactAlien();
  var restart = this.aliens.moveAlien();
  this.spacecraft.moveShoot();
  this.gameOver();
  if(!restart) {
    this.reStart();
    alert("Game Over");
  }
}


Game.prototype.gameOver = function () {
  var self = this;
  this.aliens.arShoots.forEach(function (shot){
    // console.log("spacecraft-> " +  self.spacecraft.pos.row + "-" + self.spacecraft.pos.col);
    // console.log("shot-> " +  shot.row + "-" + shot.col);
    if(self.spacecraft.pos.row === shot.row && self.spacecraft.pos.col === shot.col) {
      self.reStart();
      alert("Game Over");
    }
  });
}

Game.prototype.reStart = function() {
  var arClases = ['icon-in-uno','icon-in-dos','icon-in-tres','icon-in-cuatro','icon-in-cinco','icon-in-seis']
  this.aliens = new Aliens(2,6,5,10,arClases);
  this.spacecraft = new Spacecraft();
  this.spacecraft.removeSpacecraft();
  this.spacecraft.drawSpacecraft();
  this.aliens.removeAliens()
  this.aliens.drawAlien();
}

Game.prototype.shootImpactAlien = function() {
  var self = this;

  // recorro los aliens
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








}
