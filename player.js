
module.exports = {

  VERSION: "iPlayer 1.0",

  bet_request: function(game_state) {
    var currentPlayer = game_state.players[game_state.in_action];
    if (currentPlayer.hole_cards[0].rank == currentPlayer.hole_cards[1].rank) {
      return 1000;
    }
    else {
      return 0;
    }
  },

  showdown: function(game_state) {

  }
};
