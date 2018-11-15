//Hauptfunktion die den AnimationFrame startet und die Funktionen aufruft, die das Spiel starten

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






//setTimeout(the_game3, Math.floor((Math.random() * 500) + 1));

// if (check_chip_hits_floor(chip2) || check_chip_hits_basket(chip2)) {
//   set_chip_to_initial_position(chip2);
// } else {
//   chip_down(chip2);
// }
//
// if (check_chip_hits_floor(chip3) || check_chip_hits_basket(chip3)) {
//   set_chip_to_initial_position(chip3);
// } else {
//   chip_down(chip3);
// }
