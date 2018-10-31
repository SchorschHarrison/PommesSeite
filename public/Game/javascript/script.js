$(function () {

    the_game = function () {

      if (check_chip_hits_floor(chip1) || check_chip_hits_basket(chip1)) {
        set_chip_to_initial_position(chip1);
      } else {
        chip_down(chip1);
      }

      if (check_chip_hits_floor(chip2) || check_chip_hits_basket(chip2)) {
        set_chip_to_initial_position(chip2);
      } else {
        chip_down(chip2);
      }

      if (check_chip_hits_floor(chip3) || check_chip_hits_basket(chip3)) {
        set_chip_to_initial_position(chip3);
      } else {
        chip_down(chip3);
      }

      if (life > 0) {
        anim_id = requestAnimationFrame(the_game);
      } else{
        stop_the_game();
      }
    };

    anim_id = requestAnimationFrame(the_game);

});
