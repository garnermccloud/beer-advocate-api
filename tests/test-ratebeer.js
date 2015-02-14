var rb = require('../ratebeer-index.js');

rb.beerSearch("Anchor Steam", function(beers) {
    console.log("========%s=======", "beerSearch");
    console.log(beers);
    console.log("========%s=======", "beerSearch");
});

rb.beerPage("/beer/negra-modelo/745/", function(beer) {
    console.log("========%s=======", "beerPage");
    console.log(beer);
    console.log("========%s=======", "beerPage");
});
