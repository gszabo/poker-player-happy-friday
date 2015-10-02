
module.exports = {

  VERSION: "iPlayer 2.0",

  bet_request: function(game_state) {
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

    if (shouldAllIn) {
      return 1000;
    }
    else {
      return 0;
    }
  },

  showdown: function(game_state) {

  }
};
