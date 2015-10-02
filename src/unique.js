module.exports = function (cards) {
    var existing = [];
    var result = [];

    cards.forEach(function (card) {
        if (existing.indexOf(card.rank) == -1) {
            existing.push(card.rank);
            result.push(card);
        }
    });

    return result;
};