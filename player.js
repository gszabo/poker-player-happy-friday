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
    
    var minimumBet = this._gameState.current_buy_in - currentPlayer.bet;

    var result = findPairs(cards);

    var pairs = [];
    Object.keys(result).forEach(function (key) {
      if (result[key] > 1) {
        pairs.push(key);
      }
    });

    if (this._gameState.community_cards.length === 0) {
      if (minimumBet <= this._gameState.small_blind * 6) {
        return minimumBet;
      } else {
        return 0;
      }
    }

    var shouldAllIn = false;
    pairs.forEach(function(rank) {
      if (['10', 'J', 'D', 'K', 'A'].indexOf(rank.toUpperCase()) >= 0) {
        shouldAllIn = true;
      }
    });

    if (shouldAllIn) {
      return 5000;
    } else if (pairs.length > 0) {
      return minimumBet + this._gameState.minimum_raise;
    }
    else {
      return 0;
    }
  }

  showdown() {
  }

}

module.exports = {
  VERSION: "Super iPlayer Pro",

  bet_request(game_state) {
      return new Player(game_state).bet_request();
  },

  showdown(game_state) {

  }

};
