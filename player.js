'use strict';

class Player {
  constructor() {
    this.VERSION = "iPlayer 2.1";
  }

  bet_request(game_state) {
    var currentPlayer = game_state.players[game_state.in_action];

    var cards = [].concat(currentPlayer.hole_cards).concat(game_state.community_cards);

    var result = cards.reduce(function (previousValue, currentValue) {
      if (previousValue[currentValue.rank]) {
        previousValue[currentValue.rank]++;
      }
      else {
        previousValue[currentValue.rank] = 1;
      }

      return previousValue;
    }, {});

    var shouldAllIn = false;
    Object.keys(result).forEach(function (key) {
      if (result[key] > 1) {
        shouldAllIn = 1;
      }
    });

    if (game_state.community_cards.length === 0) {
      return game_state.current_buy_in - currentPlayer.bet;
    }

    if (shouldAllIn) {
      return 5000;
    }
    else {
      return 0;
    }
  }

  showdown(game_state) {

  }

}

module.exports = new Player();
