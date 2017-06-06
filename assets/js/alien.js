function Aliens(rowStart, rows, colStart, colNumber, clases){
  this.direction = "right";
  this.maxCol = 14;
  this.minCol = 5;
  this.maxRow = 7;
  this.arAlien = this.generateAliens(rowStart, rows, colStart, colNumber, clases);
}

Aliens.prototype.generateAliens = function(rowStart, rows, colStart, colNumber, clases) {
  var arAliens = []
  var rStart = rowStart;
  for (var i = 0; i < rows; i++) {
    var cStart = colStart;
    for (var j = 0; j < colNumber; j++) {
      var alien = {
        row: rStart,
        col: cStart,
        class: clases[i]
      }
      cStart++;
      arAliens.push(alien);
    }
    rStart++;
  }
  return arAliens;
};

Aliens.prototype.drawAlien = function(augX = 0, augY = 0) {
  this.arAlien.forEach(function(position, index) {
    position.row = position.row + augY;
    position.col = position.col + augX;
    var selector = '[data-row=' + position.row + '][data-col=' + position.col + ']';
    $(selector).append($('<span>')
        .addClass( "alien " + position.class)
      );
  });
};

Aliens.prototype.moveAlien = function() {
  this.removeAliens();
  if(this.maxCol <= 19 && this.minCol >= 0){
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

          break;
      case "downL":
        this.drawAlien(0,1);
        this.direction = "right";

          break;
    }
  }
}

Aliens.prototype.removeAliens = function() {
  $('.block  > span.alien').remove();
}
