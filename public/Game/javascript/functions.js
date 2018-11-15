// Funktion die den Korb entsprechend der Vorgabe in abhängigkeit zur Maus platziert
$(document).on('mousemove', function (e) {

  if (levelIndex == 2) {

    basket.css('left', 'auto');
    basket.css('right', e.pageX);

  } else if (levelIndex == 1) {

    basket.css('left', e.pageX);
  } else {
  }
});

//Funktion die die Pommes nahc unten bewegt
function chip_down(chip){
  chip_current_position = parseInt(chip.css('top'));
  chip.css('top', chip_current_position + speed);
}

//Funktion die prüft ob die Pommes den Boden berührenund wenn ja die pommes zurücksetzt und ein Leben abzeiht
function check_chip_hits_floor(chip){
  if (collision(chip, floor)){
    show_mashed_pot(chip);
    decrement_life();
    return true;
  }
  return false;
}

// Funktion die die Pommes wieder zurücksetzt
function set_chip_to_initial_position(chip) {
  chip.css('top', chip_initial_position);
}

// Funktion die am Boden Kartoffelbrei anzeigt, wenn die Pommes auf dem Boden aufkommt
function show_mashed_pot(chip){
  mashedpot_num = chip.attr('data-mashedpot');

  $('#mashedpot' + mashedpot_num).show();
  hide_mashed_pot(mashedpot_num);
}

//Funktion die den Kartoffelbrei nach 800ms wieder verschwinden lässt
function hide_mashed_pot(mashedpot_num) {
  setTimeout(function () {
    $('#mashedpot' + mashedpot_num).hide();
  }, 800);
}

// die die Anzahl der leben decrementiert
function decrement_life() {
  life--;
  life_span.text(life);
}


// Funktion, die überprüft ob eine Pommes mit der Tüte aufgefangen wurde, dann den Score erhöht und dann die Pommes zurücksetzt
function check_chip_hits_basket(chip){
  if (collision(chip, basket)) {
    chip_top = parseInt(chip.css('top'));
    if (chip_top < basket_top) {
      update_score();
      return true;
    }
  }
  return false;
}

//Funktion die den Score erhöht und ab einem gewissen Score die Geschwindigkeit der Pommes erhöht
function update_score() {
  score++;
  if (score % 10  === 0 && score <= max_speed) {
    speed = speed + 0.5;
  }
  score_span.text(score);
  score_1.text(score);
}

// Funktion die das Spiel beendet und die Buttons zum Fortfahren zeigt
function stop_the_game(){
  cancelAnimationFrame(anim_id);
  restart.slideDown();
  if (levelIndex == 1) {
    lev2.slideDown();

    console.log(levelIndex);
  } else {
    lev1.slideDown();

    console.log(levelIndex);
  }
}

// Funktion die das aktuelle Spiel neustartet
restart.click(function () {
  set_chip_to_initial_position(chip1);
  set_chip_to_initial_position(chip2);
  set_chip_to_initial_position(chip3);

  score = 0;
  score_span.text(score);
  score_1.text(score);
  life = startLife;
  life_span.text(life);

  restart.slideUp();
  lev2.slideUp();
  lev1.slideUp();

  // the_game();
  the_game1();
  setTimeout(the_game2(), 300);
  the_game3();

})

lev2.click(function () {

  restart.click();
  levelIndex++;
  console.log("Hallo du bist in level 2");
  console.log("der levelIndex ist ");
  console.log(levelIndex);
})

lev1.click(function () {

  restart.click();
  levelIndex--;
  console.log("Hallo du bist in level 1");
  console.log("der levelIndex ist ");
  console.log(levelIndex);
})
//ungenutzte Sleep funktion
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
