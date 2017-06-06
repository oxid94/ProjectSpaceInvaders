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
          break;
    }
  });

}

Game.prototype.start = function(){
  setInterval(this.aliens.moveAlien.bind(this.aliens), 1000);
  this.spacecraft.drawSpacecraft();
  this.aliens.drawAlien()
  this.assignControlsToKeys();
}
