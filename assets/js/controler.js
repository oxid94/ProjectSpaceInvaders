var game, arAliens, spaceC;
$( document ).ready(function() {
    $('.grid').hide();
});

$('#startGame').on('click', function(){
  $('.logo').hide();
  $('.grid').show();



  var arClases = ['icon-in-uno','icon-in-dos','icon-in-tres','icon-in-cuatro','icon-in-cinco','icon-in-seis']
  arAliens = new Aliens(2,6,5,10,arClases);
  spaceC = new Spacecraft();
  game = new Game({
    rows: 600/20,
    columns: 400/20,
    aliens: arAliens,
    spacecraft: spaceC
  });
  game.start();
});
