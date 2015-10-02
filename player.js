'use strict';

var _ = require('lodash');

var findPairs = require('./src/find_pairs');
var uniqueCards = require('./src/unique');


class Player {
  constructor(game_state) {
    this.VERSION = "iPlayer 2.4";
    this._gameState = game_state;

  }

  bet_request() {
    var currentPlayer = this._gameState.players[this._gameState.in_action];

    var cards = [].concat(currentPlayer.hole_cards).concat(uniqueCards(this._gameState.community_cards));

    var result = findPairs(cards);

    var shouldAllIn = false;
    Object.keys(result).forEach(function (key) {
      if (result[key] > 1) {
        shouldAllIn = 1;
      }
    });

    if (this._gameState.community_cards.length === 0) {
      return this._gameState.current_buy_in - currentPlayer.bet;
    }


    if (shouldAllIn) {
      return 5000;
    }
    else {
      return 0;
    }
  }

  showdown() {
  }

}

module.exports = {
  bet_request(game_state) {
      return new Player(game_state).bet_request();
  },

  showdown(game_state) {

  }

};
