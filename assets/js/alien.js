function Aliens(rowStart, rows, colStart, colNumber, clases){
  this.direction = "right";
  this.maxRow = 7;
  this.arAlien = this.generateAliens(rowStart, rows, colStart, colNumber, clases);
  this.arShoots = [];
}

// Funcion que guarda los aliens en un array
//      @rowStart -> fila por la que empieza a dibujar
//      @rows -> numero de filas que tiene que dibujar
//      @colStart -> columna por la que empieza a dibujar
//      @colNumber -> numeor de columnas a dibujar
//      @clases -> clases de los aliens
//  Los aliens tienen
//    row -> fila en la que esta el alien
//    col -> columna en la que esta el alien
//    class -> clase de alien
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

// Funcion que dibuja los aliens en el grid
//    @augX -> por defecto 0, si les pasas parametro augmenta la posicion X columnas
//    @augY -> por defecto 0, si les pasas parametro augmenta la posicion X filas
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

// Borra del grid todos los aliens
Aliens.prototype.removeAliens = function() {
  $('.block  > span.alien').remove();
}

// Borra del array de aliens a un alien en concreto
//    @posX -> posicion de columna que tiene que tener el alien a borrar
//    @posY -> posicion de fila que tiene que tener el alien a borrar
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

// La funcion mueve los aliens
//  1- Borra tots los aliens
//  2- Genera los disparos
Aliens.prototype.moveAlien = function() {
  var moveOk = true;
  this.removeAliens();
  this.generateShoot();
    switch (this.direction) {
      case "right":
        this.drawAlien(1);
        if(this.getMaxColOfAlien()===19){
          this.direction = "downR";
        }

        break;
      case "left":
        this.drawAlien(-1);
        if(this.getMinColOfAlien()===0){
          this.direction = "downL";
        }

        break;
      case "downR":
          this.drawAlien(0,1);
          this.direction = "left";
          this.maxRow = this.maxRow +1;
          if(this.getMaxRowOfAlien() === 28) {
            moveOk = false;
          }
          break;
      case "downL":
        this.drawAlien(0,1);
        this.direction = "right";
        this.maxRow = this.maxRow +1;
        if(this.getMaxRowOfAlien() === 28) {
          moveOk = false;
        }
          break;
    }
    return moveOk;
}

// La funcion mira en que columna esta el alien situado mas a la derecha
Aliens.prototype.getMaxColOfAlien = function() {
  var aliesAlive = [];
  this.arAlien.forEach(function(fila, fIndex){
    fila.forEach(function(alien, aIndex){
      if(alien !== 0){
        // console.log(alien);
        aliesAlive.push(alien);
      }
    });
  });

  var maxCol = 0;
  aliesAlive.forEach(function(alien){
    if(alien.col > maxCol){
      maxCol = alien.col;
    }
  });

  return maxCol;
}

// La funcion mira en que columna esta el alien situado mas a la izquierda
Aliens.prototype.getMinColOfAlien = function() {
  var aliesAlive = [];
  this.arAlien.forEach(function(fila, fIndex){
    fila.forEach(function(alien, aIndex){
      if(alien !== 0){
        // console.log(alien);
        aliesAlive.push(alien);
      }
    });
  });

  var minCol = 19;
  aliesAlive.forEach(function(alien){
    if(alien.col < minCol){
      minCol = alien.col;
    }
  });

  return minCol;
}

// La funcion mira en que fila esta el alien situado mas abajo
Aliens.prototype.getMaxRowOfAlien = function() {
  var aliesAlive = [];
  this.arAlien.forEach(function(fila, fIndex){
    fila.forEach(function(alien, aIndex){
      if(alien !== 0){
        // console.log(alien);
        aliesAlive.push(alien);
      }
    });
  });

  var maxRow = 0;
  aliesAlive.forEach(function(alien){
    if(alien.row > maxRow){
      maxRow = alien.row;
    }
  });
  return maxRow;
}

// La funcion crea disparos con un 33% de posibilidades y los guarda en el array de disparos
Aliens.prototype.generateShoot = function() {
  var turn = Math.floor(Math.random() * 3);
  if (turn === 2 ) { // solo lanzara un disparo si es == 2 (un 33% de posibilidades de disparo)
    var aliensThatCanShot = [];
    var self = this;
    // this.arAlien.forEach(function(array, ind) {
    //   if(!self.arAlien[ind+1]) {
    //     array.forEach(function(position, index) {
    //       if( position !== 0 ) {
    //         aliensThatCanShot.push(position);
    //       }
    //     });//aliens que pueden disparar
    //   } else {
    //     array.forEach(function(position, index) {
    //       if(self.arAlien[ind+1][index] === 0) {
    //         aliensThatCanShot.push(position);
    //       }
    //     });
    //   }
    // });
    this.arAlien.forEach(function(fila, fIndex) {
      fila.forEach(function(alien,aIndex){
        if(fIndex === 0){
          if(alien !== 0)
            aliensThatCanShot.push(alien)
        } else {
          aliensThatCanShot.forEach(function(alienThatCanShot, atcsIndex){
            if(alien !== 0){
              if(alien.col === alienThatCanShot.col)
                aliensThatCanShot[atcsIndex] = alien;
            }
          });
        }
      });
    });
    this.saveShoot(aliensThatCanShot);
  }
  this.moveShoot();
}

// La funcion guarda el disaparo en el array
//    @array -> Son todos los aliens que pueden disparar
Aliens.prototype.saveShoot = function (array) {
    var randomPos = Math.floor(Math.random() * array.length);
    var shot = {
      row: (array[randomPos].row),
      col: (array[randomPos].col+1)
    }
    this.arShoots.push(shot);
}

// Dibuja los disaparos y si el disparo se sale del rango lo borra
Aliens.prototype.drawShoot = function () {
  this.removeShoot();
  var self = this;
    this.arShoots.forEach(function(shot, index){
      if( shot.row > 35) {
        // console.log("borrar disparo");
        self.arShoots.splice(index,1);
      }
      var selector = '[data-row=' + shot.row + '][data-col=' +  shot.col  + ']';
      $(selector).append($('<span>').addClass( "icon-thunderbolt"));
    });
}

// borra del grid los disaparos
Aliens.prototype.removeShoot = function () {
  $('.block  > span.icon-thunderbolt').remove();
}

// mueve el disparo,
Aliens.prototype.moveShoot = function () {
  var self = this;
  this.arShoots.forEach(function(shot,index){
    self.arShoots[index].row = self.arShoots[index].row + 1;
  });
  this.drawShoot();
}

Aliens.prototype.getAliensAlive = function(){
  var aliens = 0;
  this.arAlien.forEach(function(fila, fIndex) {
    fila.forEach(function(alien,aIndex){
      if(alien !== 0) {aliens++;}
    });
  });
  return aliens;
};
