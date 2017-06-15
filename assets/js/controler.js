var game, arAliens, spaceC;
var interval;
var restartGame = false;
$( document ).ready(function() {
    $('.grid').hide();
});

$('#startGame').on('click', function(){
  $('.logo').hide();
  $('.grid').show();

  generateGame();



  interval = setInterval( function() {
    restartGame = game.startMoveGame();
  }, 500);
  recursiveInterval(game.aliens.getAliensAlive());

});

function generateGame() {
  var arClases = ['icon-in-uno','icon-in-dos','icon-in-tres','icon-in-cuatro','icon-in-cinco','icon-in-seis']
  arAliens = new Aliens(2,6,5,10,arClases);
  spaceC = new Spacecraft();
  game = new Game({
    rows: 600/20,
    columns: 400/20,
    aliens: arAliens,
    spacecraft: spaceC
  });
  game.drawItemsToStart();
  game.assignControlsToKeys();
}

var recursiveInterval = function(x) {
    if(x > 1) {
      var recInterval = setInterval(function() {
        if (game.aliens.getAliensAlive() < x){
          console.log("speed increase");
          clearInterval(interval);
          interval = setInterval( function() {
            restartGame = game.startMoveGame();
          }, x*10);
          clearInterval(recInterval);
          return recursiveInterval(x-10)
        }
        if(game.gameOver(restartGame)) {
          // delete Game.prototype.assignControlsToKeys;
          game.assignControlsToKeys = undefined;
          clearInterval(interval);
          clearInterval(recInterval);
          $('.logo').show();
          $('.grid').hide();

          // Tiene que ir una funcion para reemplazar las teclas

        }

      },100)
    } else {
      // delete Game.prototype.assignControlsToKeys;
      game.assignControlsToKeys = undefined;
      alert("You Win")
      clearInterval(recInterval);
      clearInterval(interval);
      $('.logo').show();
      $('.grid').hide();

    }
}
