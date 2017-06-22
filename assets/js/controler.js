var game, arAliens, spaceC;
var interval;
var restartGame = false;
$( document ).ready(function() {
    $('.grid').hide();
    $('.game-status').hide();
    $('.instructions').hide();
});

$('#startGame').on('click', function(){
  $('.logo').hide();
  $('.grid').show();
  $('.instructions').hide();

  generateGame();

  interval = setInterval( function() {
    restartGame = game.startMoveGame();
  }, 500);
  recursiveInterval(game.aliens.getAliensAlive());

});

$('#startGameOnInstructions').on('click', function(){
  $('.logo').hide();
  $('.grid').show();
  $('.instructions').hide();

  generateGame();

  interval = setInterval( function() {
    restartGame = game.startMoveGame();
  }, 500);
  recursiveInterval(game.aliens.getAliensAlive());

});

$('#instructions').on('click', function(){
  $('.logo').hide();
  $('.instructions').show();
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
    if(game.aliens.getAliensAlive() != 0) {
      var recInterval = setInterval(function() {
        if (game.aliens.getAliensAlive() === 0){
          clearInterval(recInterval);
          clearInterval(interval);
          $('.grid').hide();
          $('.game-status').show();
          $('.game-status').text('You Win');
          $('.game-points #points').text("");
          $('.game-points #shield').text("");
          setTimeout(function(){
            $('.logo').show();
            $('.game-status').hide();
          }, 2000);
        } else {
          if (game.aliens.getAliensAlive() < x){
            clearInterval(interval);
            interval = setInterval( function() {
              restartGame = game.startMoveGame();
            }, x*10);
            clearInterval(recInterval);
            return recursiveInterval(x-10)
          }
          if(game.gameOver(restartGame)) {
            clearInterval(recInterval);
            clearInterval(interval);
            $('.grid').hide();
            $('.game-status').show();
            $('.game-status').text('Game Over');
            $('.game-points #points').text("");
            $('.game-points #shield').text("");
            setTimeout(function(){
              $('.logo').show();
              $('.game-status').hide();
            }, 2000);
          }
        }
      },100)
    }
}
