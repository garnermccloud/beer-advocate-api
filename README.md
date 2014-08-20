Beer Advocate API
=================

Beer Advocate API is an unofficial JavaScript library for working with http://beeradvocate.com data.

Getting started
---------------

Beer Advocate API can be installed via [NPM](https://www.npmjs.org/). (For more on NPM, see thin [introduction](http://howtonode.org/05896bb828f0d7e9251dd5b4cfd72350896990bd/introduction-to-npm)). Make sure you’re in your projects directory, and run the following:

```bash
$ npm install beer-advocate-api
```

Including the library
---------------------

Next, make sure to include Beer Advocate API in your project.

```javascript
var ba = require('beer-advocate-api');
```

Documentation
=============

See the online [docs](http://stursby.github.io/beer-advocate-api) here.

Beers
-----

### Search

Search for a beer

```javascript
ba.beerSearch("Anchor Steam", function(beers) {
    console.log(beers);
});
```

Example response

```json
[
    {
        "beer_name": "Anchor Steam Beer",
        "beer_url": "/beer/profile/28/63/",
        "brewery_name": "Anchor Brewing Company",
        "brewery_location": "San Francisco, California",
        "brewery_url": "/beer/profile/28/",
        "retired": false
    },
    {
        "beer_name": "Drop Anchor Steam Beer",
        "beer_url": "/beer/profile/952/9899/",
        "brewery_name": "Great Dane Pub & Brewing Company (Downtown)",
        "brewery_location": "Madison, Wisconsin",
        "brewery_url": "/beer/profile/952/",
        "retired": true
    },
    {
        "beer_name": "Anchor's Away Steam Beer",
        "beer_url": "/beer/profile/1313/23018/",
        "brewery_name": "Lucky Labrador Brewing Company",
        "brewery_location": "Portland, Oregon",
        "brewery_url": "/beer/profile/1313/",
        "retired": true
    },
    {
        "beer_name": "Dry Hopped Steam Beer",
        "beer_url": "/beer/profile/28/129664/",
        "brewery_name": "Anchor Brewing Company",
        "brewery_location": "San Francisco, California",
        "brewery_url": "/beer/profile/28/",
        "retired": false
    }
]
```


### Beer page

Get a specific beer page

```javascript
ba.beerPage("/beer/profile/29223/84343/", function(beer) {
    console.log(beer);
});
```

Example response

```json
[
    {
        "beer_name": "Furious",
        "beer_style": "",
        "beer_abv": "6.20%",
        "brewery_name": "Surly Brewing Company",
        "brewery_state": "",
        "brewery_country": "",
        "ba_score": "96",
        "ba_rating": "world-class",
        "bros_score": "-",
        "bros_rating": "no score",
        "ratings": "4,021",
        "reviews": "1,379",
        "rAvg": "4.33",
        "pDev": "9.24%"
    }
]
```

### Top reviews

Get a specific beer’s reviews from top reviewers

```javascript
ba.beerTopReviews("/beer/profile/29223/84343/", 1, function(reviews) {
    console.log(reviews);
});
```

Example response

```json
[
    {
        "reviewer": "Sammy",
        "reviewer_url": "/community/members/sammy.3853/",
        "rating": "3.95",
        "rating_max": "5",
        "attributes": {
            "look": "4",
            "smell": "4",
            "taste": "4",
            "feel": "3.5",
            "overall": "4"
        },
        "review_text": "Very fresh and good can obtained by John. Citrus hop aroma, yet well tamed. Cloudy orange and lacey. A big IBU and yet a very good ornage, tangerine, grapefruit taste and drinkability. A good examle of a pale that used tobe called an IPA(if not a DIPA by some) .Recommended.",
        "serving_type": "can",
        "date": "11-28-2012 04:40:39"
    }
]
```


Breweries
=========

### Search

Search for a brewery

```javascript
ba.brewerySearch("Big Sky Brewing Company", function(brewery) {
    console.log(brewery);
});
```

Example response

```json
[
    {
        "brewery_name": "Big Sky Brewing Company",
        "brewery_url": "/beer/profile/751/",
        "brewery_location": "Missoula, Montana"
    }
]
``


### Brewery page

Get a specific brewery page

```javascript
ba.breweryPage("/beer/profile/2137/", function(brewery) {
    console.log(brewery);
});
```

Example response

```json
[
    {
        "brewery_name": "Big Sky Brewing Company",
        "brewery_rating": {
            "score": "94",
            "text": "outstanding",
            "count": "20",
            "reviews": "4",
            "rAvg": "4.3",
            "pDev": "9.53%"
        },
        "active_beers": "35",
        "beer_ratings": "6,837",
        "beer_avg": "3.73",
        "taps": "0",
        "bottles": "0",
        "cask": false,
        "beer_to_go": true
    }
]
```

Acknowledgements
----------------

Beer Advocate API is not associated with the Beer Advocate or it’s magazine. We’re fans. And love what they do.

**Beer Advocate API** is authored and maintained by [Charlie Hield](https://twitter.com/charliehield) with help from its contributors:

 * [Kevin Schaul](https://github.com/kevinschaul)
 * [Aaron Bieber](https://github.com/qbit)
 * [Len Boyette](https://github.com/kevlened)

© 2014, Charlie Hield under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
