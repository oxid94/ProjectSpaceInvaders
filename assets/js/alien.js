function Aliens(rowStart, rows, colStart, colNumber, clases){
  this.direction = "right";
  this.maxCol = 14;
  this.minCol = 5;
  this.maxRow = 7;
  this.arAlien = this.generateAliens(rowStart, rows, colStart, colNumber, clases);
  this.arShoots = [];
}

Aliens.prototype.generateAliens = function(rowStart, rows, colStart, colNumber, clases) {
  var arAliens = []
  var rStart = rowStart;
  for (var i = 0; i < rows; i++) {
    var cStart = colStart;
    var arRowAlien = [];
    for (var j = 0; j < colNumber; j++) {
      var alien = {
        row: rStart,
        col: cStart,
        class: clases[i]
      }
      cStart++;
      arRowAlien.push(alien);
    }
    rStart++;
    arAliens.push(arRowAlien);
  }
  return arAliens;
};

Aliens.prototype.drawAlien = function(augX = 0, augY = 0) {
  this.arAlien.forEach(function(array) {
    array.forEach(function(position) {
        position.row = position.row + augY;
        position.col = position.col + augX;
        var selector = '[data-row=' + position.row + '][data-col=' + position.col + ']';
        $(selector).append($('<span>')
            .addClass( "alien " + position.class)
          );
    });
  });
};

Aliens.prototype.moveAlien = function() {
  var moveOk = true;
  this.removeAliens();
  // generar disparos de aliens i mourels;
  this.generateShoot();
  this.moveShoot();

    switch (this.direction) {
      case "right":
        this.drawAlien(1);
        this.maxCol = this.maxCol + 1;
        this.minCol = this.minCol + 1;
        if(this.maxCol===19){
          this.direction = "downR";
        }

        break;
      case "left":
        this.drawAlien(-1);
        this.maxCol = this.maxCol -1 ;
        this.minCol = this.minCol -1;
        if(this.minCol===0){
          this.direction = "downL";
        }

        break;
      case "downR":
          this.drawAlien(0,1);
          this.direction = "left";
          this.maxRow = this.maxRow +1;
          if(this.maxRow === 28) {
            moveOk = false;
          }
          break;
      case "downL":
        this.drawAlien(0,1);
        this.direction = "right";
        this.maxRow = this.maxRow +1;
        if(this.maxRow === 28) {
          moveOk = false;
        }
          break;
    }
    return moveOk;
}

Aliens.prototype.removeAliens = function() {
  $('.block  > span.alien').remove();
}

Aliens.prototype.removeAlien = function(posX, posY) {
  var self = this;
  this.arAlien.forEach(function(array, ind) {
    array.forEach(function(position, index) {
      if(position.col === posX && position.row === posY){
        self.arAlien[ind][index] = 0;
      }
    });
  });
}

Aliens.prototype.generateShoot = function() {
  var aliensThatCanShot = [];
  var self = this;
  this.arAlien.forEach(function(array, ind) {
    if(!self.arAlien[ind+1]) {
      array.forEach(function(position, index) {
        if( position !== 0 ) {
          aliensThatCanShot.push(position);
        }
      });//aliens que pueden disparar
    } else {
      array.forEach(function(position, index) {
        if(self.arAlien[ind+1][index] === 0) {
          aliensThatCanShot.push(position);
        }
      });
    }
  });
  this.saveShoot(aliensThatCanShot);
}

Aliens.prototype.saveShoot = function (array) {
  var turn = Math.floor(Math.random() * 3);
  if (turn === 2 ) { // solo lanzara un disparo si es == 2 (un 33% de posibilidades de disparo)
    var randomPos = Math.floor(Math.random() * array.length);
    var shot = {
      row: (array[randomPos].row+1),
      col: (array[randomPos].col+1)
    }

    this.arShoots.push(shot);
  }
}

Aliens.prototype.drawShoot = function () {
  this.removeShoot();
  var self = this;
    this.arShoots.forEach(function(shot, index){
      if( shot.row > 35) {
        console.log("borrar disparo");
        self.arShoots.splice(index,1);
      }
      var selector = '[data-row=' + shot.row + '][data-col=' +  shot.col  + ']';
      $(selector).append($('<span>').addClass( "icon-thunderbolt"));
    });
}

Aliens.prototype.removeShoot = function () {
  $('.block  > span.icon-thunderbolt').remove();
}

Aliens.prototype.moveShoot = function (array) {
  var self = this;
  this.arShoots.forEach(function(shot,index){
    self.arShoots[index].row = self.arShoots[index].row + 1;
  });
  this.drawShoot();
}
