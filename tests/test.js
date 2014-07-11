var ba = require('../index.js');

ba.beerSearch("Anchor Steam", function(beers) {
    console.log("========%s=======", "beerSearch");
    console.log(beers);
    console.log("========%s=======", "beerSearch");
});

ba.beerPage("/beer/profile/29223/84343/", function(beer) {
    console.log("========%s=======", "beerPage");
    console.log(beer);
    console.log("========%s=======", "beerPage");
});

// Get a specific beer's reviews from top reviewers
// http://beeradvocate.com/beer/profile/29223/84343/?view=beer&sort=topr&start=0
ba.beerTopReviews("/beer/profile/29223/84343/", 1, function(reviews) {
    console.log("========%s=======", "beerTopReviews");
    console.log(reviews);
    console.log("========%s=======", "beerTopReviews");
});

ba.brewerySearch("Indeed Brewing Company", function(brewery) {
    console.log("========%s=======", "brewerySearch");
    console.log(brewery);
    console.log("========%s=======", "brewerySearch");
});

ba.breweryPage("/beer/profile/29223/", function(brewery) {
    console.log("========%s=======", "breweryPage");
    console.log(brewery);
    console.log("========%s=======", "breweryPage");
});
