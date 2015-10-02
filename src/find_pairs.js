module.exports = function () {
    var result = cards.reduce(function (previousValue, currentValue) {
        if (previousValue[currentValue.rank]) {
            previousValue[currentValue.rank]++;
        }
        else {
            previousValue[currentValue.rank] = 1;
        }

        return previousValue;
    }, {});

    return result;
};