'use strict';

var _ = require('lodash');

var findPairs = require('./src/find_pairs');
var uniqueCards = require('./src/unique');
var rankToValue = require('./src/rank_to_value');


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

    var ownPairs = [];
    Object.keys(result).forEach(function (key) {
      if (result[key] > 1) {
        ownPairs.push(key);
      }
    });

    if (this._gameState.community_cards.length === 0) {
      var maximumBet = Math.min(this._gameState.small_blind * 6, currentPlayer.stack * 0.1);

      if (currentPlayer.stack < 500) {
        maximumBet = 50;
      }

      if (minimumBet <= maximumBet) {
        console.log('PREFLOP LOG: round: ' + this._gameState.round + ', small_blind: ' + this._gameState.small_blind + ', stack: ' + currentPlayer.stack + ', minimumBet: ' + minimumBet + ', maximumBet: ' + maximumBet);
        return minimumBet;
      } else {
        return 0;
      }
    }

    var shouldAllIn = false;

    var maxPairRank = _.max(ownPairs.map(rankToValue));

    if (ownPairs.length > 1 || maxPairRank >= 10) {
      shouldAllIn = true;
    }

    //
    //
    //pairs.forEach(function(rank) {
    //  if (['10', 'J', 'Q', 'K', 'A'].indexOf(rank.toUpperCase()) >= 0) {
    //    shouldAllIn = true;
    //  }
    //});

    if (shouldAllIn) {
      return 5000;
    } else if (ownPairs.length > 0) {
      var betAmount = minimumBet + this._gameState.minimum_raise;
      if (maxPairRank <= 6 && currentPlayer.stack < betAmount / 2) {
        return 0;
      }

      return betAmount;
    }
    else {
      return 0;
    }
  }

  showdown() {
  }

}

module.exports = {
  VERSION: "Super iPlayer Unicorn 3.2",

  bet_request(game_state) {
      return new Player(game_state).bet_request();
  },

  showdown(game_state) {

  }

};
