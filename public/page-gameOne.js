"use strict";

/**
 * Klasse PageGameOne: JavaScript für GameOne
 *
 * Diese Klasse wird von der App-Klasse zu bestimmten Zeitpunkten instantiiert
 */

class PageGameOne{

  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("main-page-gameOne"); //geht in index.html in die main von GameOne

      let basket = $('#basket'),
          container = $('#container'),
          frit = $('.frit'),
          chips = $('.chip'),
          chip1 = $('#chip1'),
          chip2 = $('#chip2'),
          chip3 = $('#chip3'),
          restart = $('#restart'),
          lev1 = $('#lev1'),
          lev2 = $('#lev2'),
          score_span = $('#score'),
          score_1 = $('#score_1'),
          life_span = $('#life'),
          floor = $('#floor'),
          basket_height = basket.height(),
          container_height = container.height(),
          chip_height = chips.height(),
          chip_initial_position = parseInt(chips.css('top')),
          score = 0,
          levelIndex = 1,
          life = 3,
          startLife = 3,
          speed = 2,
          max_speed = 75,
          counter = 0,
          score_updated = false,
          the_game = 0,
          anim_id = 0,
          chip_current_position = 0,
          chip_top = 0,
          basket_top = container_height - basket_height,
          mashedpot_num = 0;
      life_span.text(life);

  }

  show() {

      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }

  function collision($div1, $div2){
      let x1 = $div1.offset().left;
      let y1 = $div1.offset().top;
      let h1 = $div1.outerHeight(true);
      let w1 = $div1.outerWidth(true);
      let b1 = y1 + h1;
      let r1 = x1 + w1;
      let x2 = $div2.offset().left;
      let y2 = $div2.offset().top;
      let h2 = $div2.outerHeight(true);
      let w2 = $div2.outerWidth(true);
      let b2 = y2 + h2;
      let r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
      }
      return true;
  }

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

  function chip_down(chip){
    chip_current_position = parseInt(chip.css('top'));
    chip.css('top', chip_current_position + speed);
  }

  function check_chip_hits_floor(chip){
    if (collision(chip, floor)){
      show_mashed_pot(chip);
      decrement_life();
      return true;
    }
    return false;
  }

  function set_chip_to_initial_position(chip) {
    chip.css('top', chip_initial_position);
  }

  function show_mashed_pot(chip){
    mashedpot_num = chip.attr('data-mashedpot');

    $('#mashedpot' + mashedpot_num).show();
    hide_mashed_pot(mashedpot_num);
  }

  function hide_mashed_pot(mashedpot_num) {
    setTimeout(function () {
      $('#mashedpot' + mashedpot_num).hide();
    }, 800);
  }

  function decrement_life() {
    life--;
    life_span.text(life);
  }

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

  function update_score() {
    score++;
    if (score % 10  === 0 && score <= max_speed) {
      speed = speed + 0.5;
    }
    score_span.text(score);
    score_1.text(score);
  }

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

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


  $(function () {

      the_game1 = function () {

        if (check_chip_hits_floor(chip1) || check_chip_hits_basket(chip1)) {
          set_chip_to_initial_position(chip1);
        } else {
          //setTimeout(chip_down(chip1), Math.floor((Math.random() * 1000) + 1));

          chip_down(chip1);
        }



        if (life > 0) {

          anim_id = requestAnimationFrame(the_game1);
        } else{
          stop_the_game();
        }
      };

      setTimeout(the_game2 = function () {

        if (check_chip_hits_floor(chip2) || check_chip_hits_basket(chip2)) {
          set_chip_to_initial_position(chip2);
        } else {
          //setTimeout(chip_down(chip2), 1000);

           chip_down(chip2);
        }



        if (life > 0) {

          anim_id = requestAnimationFrame(the_game2);
        } else{
          stop_the_game();
        }
      }, 300);

      the_game3 = function () {

        if (check_chip_hits_floor(chip3) || check_chip_hits_basket(chip3)) {
          set_chip_to_initial_position(chip3);
        } else {
          // setTimeout(chip_down(chip3), 3000);

          chip_down(chip3);
        }



        if (life > 0) {

          anim_id = requestAnimationFrame(the_game3);
        } else{
          stop_the_game();
        }
      };


      // setTimeout(the_game1, Math.floor((Math.random() * 1000) + 1));
      // setTimeout(the_game2, Math.floor((Math.random() * 1000) + 1));
      // setTimeout(the_game3, Math.floor((Math.random() * 1000) + 1));

      anim_id = requestAnimationFrame(the_game1);
      anim_id = requestAnimationFrame(the_game2);
      anim_id = requestAnimationFrame(the_game3);

  });






}
