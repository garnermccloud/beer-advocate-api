var rb = require('../ratebeer-index.js');

rb.beerSearch("Anchor Steam", function(beers) {
    console.log("========%s=======", "beerSearch");
    console.log(beers);
    console.log("========%s=======", "beerSearch");
});

