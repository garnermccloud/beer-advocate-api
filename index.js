var _request = require('request'),
    cheerio = require('cheerio');

exports.config = function(options) {
    this.request = _request.defaults(options);
}

exports.beerSearch = function(query, callback) {

    var url = "http://beeradvocate.com/search/?q=" + encodeURIComponent(query) + "&qt=beer";

    if (!this.request) {
        this.request = _request;
    }

    this.request(url, function (error, response, html) {

        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            var beers = [];

            $('#baContent ul li').each(function(beer) {

                // One beer listing
                var li = $(this);

                // Beer details
                var beer = li.children('a').eq(0),
                    beer_name = beer.text(),
                    beer_url = beer.attr('href');

                // Brewery details
                var brewery = li.children('a').eq(1),
                    brewery_name = brewery.text(),
                    brewery_url = brewery.attr('href'),
                    brewery_location = brewery.next().text();

                // Retired?
                var retired = false;
                if (beer.prev().text() === "Retired - ") {
                    var retired = true;
                }

                // Data to return
                var data = {
                    beer_name: beer_name,
                    beer_url: beer_url,
                    brewery_name: brewery_name,
                    brewery_location: brewery_location.slice(2),
                    brewery_url: brewery_url,
                    retired: retired
                };
                
                // Add to beer array
                beers.push(data);

            });

            callback(beers);

        }

    });

}

exports.beerPage = function(url, callback) {

    var url = "http://beeradvocate.com" + url;

    if (!this.request) {
        this.request = _request;
    }

    this.request(url, function (error, response, html) {

        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            var beer = [];

            // Beer & brewery name
            var title = $('h1').text().split(/\s-\s/),
                beer_name = title[0],
                brewery_name = title[1];

            // ABV
            var beer_abv_chunk = $('#baContent table').eq(1).find('td').text().split(/%\sABV/)[0],
                beer_abv = beer_abv_chunk.substr(beer_abv_chunk.length - 6).trimLeft() + "%";

            // Brewery details
            var links = $('#baContent table').find('form').parent().find('a'),
                brewery_state = links.eq(2).text(),
                brewery_country = links.eq(3).text(),
                beer_style = links.eq(4).text();

            // Beer Advocate scores
            var ba_info = $('.BAscore_big').eq(0),
                ba_score = ba_info.text(),
                ba_rating = ba_info.next().next().text();

            var bros_info = $('.BAscore_big').eq(1),
                bros_score = bros_info.text(),
                bros_rating = bros_info.next().next().text();

            // More stats
            var stats = $('#baContent table').eq(2).find('td:last-child').text().split(/:\s/),
                ratings = stats[1].replace("Reviews",""),
                reviews = stats[2].replace("rAvg",""),
                rAvg = stats[3].replace("\npDev",""),
                pDev = stats[4].replace("\n\nRatings Help\n","");


            // Data to return
            var data = {
                beer_name: beer_name,
                beer_style: beer_style,
                beer_abv: beer_abv,
                brewery_name: brewery_name,
                brewery_state: brewery_state,
                brewery_country: brewery_country,
                ba_score: ba_score,
                ba_rating: ba_rating,
                bros_score: bros_score,
                bros_rating: bros_rating,
                ratings: ratings,
                reviews: reviews,
                rAvg: rAvg,
                pDev: pDev
            };

            // Add to beer array
            beer.push(data);

            callback(beer);

        }

    });

}

exports.beerTopReviews = function(beer_url, count, callback) {

	// Optional count criteria
	// -1 : All the reviews
	// n  : Returns up to n reviews (no error is thrown if n is not met)

	if(arguments.length == 2){
	
		// Count holds the callback
		callback = count;
		
		// Make the default count 25
		count = 25;
	}
	
	// Replace any -1 with the max
	if(count == -1){
		count = Number.MAX_VALUE;
	}

    var base_url = "http://beeradvocate.com" + beer_url + "?sort=topr&start=",
		start_index = 0,
		reviews = [],
		max_review_count = null;
	
	// Create recursive review populator
        if (!this.request) {
            this.request = _request;
        }
	var self = this;
	var populate_reviews = function(url){
	
		self.request(url, function (error, response, html) {

			if (!error && response.statusCode == 200) {

				var $ = cheerio.load(html);
				
				// Get the total number of reviews if it's not known
				if(!max_review_count){					
					var tc = $($('#baContent').contents()[11]).text();
					max_review_count = tc
						.split('|')[1]
						.split(':')[1]
						.trim()
				}

				$('#rating_fullview_content_2').each(function() {

					// One review listing
					var li = $(this);

					// Reviewer details
					var reviewer_link = li.find('.username').eq(0),
						reviewer = reviewer_link.text(),
						reviewer_url = reviewer_link.attr('href');

					// Review score
					var rating = li.children('.BAscore_norm').eq(0).text();
					
					// Review score total
					var rating_max_el = li.children('.rAvg_norm'),
						rating_max = rating_max_el.eq(0).text().replace('/','');
					
					// Get all the text only nodes
					var text_nodes = [];
					li.contents().each(function(){
					
						if(this[0].type === 'text'){
							text_nodes.push(this[0]);
						}
						
					});
					
					// Rating attributes
					var attribute_split = text_nodes[2].data.split('|');
					if(attribute_split.length == 5){
					
						attributes = {
							look: attribute_split[0].split(':')[1].trim(),
							smell: attribute_split[1].split(':')[1].trim(),
							taste: attribute_split[2].split(':')[1].trim(),
							feel: attribute_split[3].split(':')[1].trim(),
							overall: attribute_split[4].split(':')[1].trim()
						}
						
					};
						
					// Serving type
					var serving_type = text_nodes[text_nodes.length-2].data.split(':')[1];
					if(serving_type){
						serving_type = serving_type.trim();
					}
					
					// Date
					var date = text_nodes[text_nodes.length-1].data.replace('&nbsp|&nbsp;',''),
						
					// Review text				
					review_text_arr = text_nodes.slice(3, text_nodes.length - 2);
					
					// Replace the dom objects with text
					for(var i=review_text_arr.length; i--;){
						review_text_arr[i] = review_text_arr[i].data;
					};
					
					// Join the text
					review_text = review_text_arr.join('\n');
					
					// Data to return
					var data = {
						reviewer: reviewer,
						reviewer_url: reviewer_url,
						rating: rating,
						rating_max: rating_max,
						attributes: attributes,
						review_text: review_text,
						serving_type: serving_type,
						date: date
					};
					
					// Add to reviews array
					reviews.push(data);
				});			
				
				if(reviews.length < count && reviews.length < max_review_count){
				
					populate_reviews(base_url + reviews.length);
					
				}
				else{
				
					reviews = reviews.splice(0, count);
					callback(reviews);
					
				}
			}
			else{
			
				callback(error);
				
			}
		});
	};
	
	// Start recursion
	populate_reviews(base_url + start_index);
	
}
