// let accessToken = '6816158a6fbe7ceacf3a9617a5853775';
let accessToken = '1dec11522d7c1a36d57081a995c76d52';
// let zipAccessToken = 'POxFNCPw1BNNVCYVJdmoM1laaANt2ocOUdhA86z4RcyYea2Eo6hhzQIhaNEyJdlK';

$(document).ready(function () {
    $("#Submit").on("click", event => {
        event.preventDefault();
        $("#resultsArea").removeClass("display-none");
        $('html, body').animate({
            scrollTop: $("#restaurantResults").offset().top
        }, 0);
        $("#restaurantResults").empty();
        $(".pictures").empty();
        let country = $("#countrySearch").val().trim();
        let zip = $("#restaurantSearch").val().trim();
        let cuisineID;
        let lat;
        let lng;
        $.getJSON("https://raw.githubusercontent.com/tmd913/project0/tom/assets/country_cuisine_id_lu.json", json => {
            // console.log(json[country]);
            cuisineID = json[country].CUISINE_ID;
            // console.log(cuisineID);

            // ================================
            // zip code api for later use
            // ================================
            // $.ajax({
            //     url: 'https://www.zipcodeapi.com/rest/UR4aVihDZM5ZGru5FZN6ZUA4lxTFZTU61Xul2ii1bNa8AiIQEZLb4YKCLM4UYVrs/info.json/20036/degrees',
            //     method: "GET"
            // }).then( response => {
            //     console.log(response);
            // });
            // ================================
            // end zip code api for later use
            // ================================

            $.getJSON("https://raw.githubusercontent.com/tmd913/project0/tom/assets/us_zip_to_lat_long_lu.json", json => {
                // console.log(json[zip]);
                lat = json[zip].LAT;
                lng = json[zip].LNG;
                // console.log(lat);
                // console.log(lng);

                $.ajax({
                    url: `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lng}&cuisines=${cuisineID}&sort=rating&order=desc`,
                    headers: {
                        'user-key': accessToken,
                    },
                    success: response => {
                        // console.log(response);
                        for (const key in response.restaurants) {
                            if (response.restaurants.hasOwnProperty(key)) {
                                const element = response.restaurants[key];
                                let restaurant = element.restaurant;
                                // ================================
                                // original zomato display info
                                // ================================
                                // console.log(restaurant);
                                // let name = $("<h5>").text(restaurant.name);
                                // let locality = $("<p>").text(restaurant.location.locality);
                                // let address = $("<p>").text(restaurant.location.address);
                                // let ratingScore = $("<p>").text(`${restaurant.user_rating.aggregate_rating}/5 from ${restaurant.user_rating.votes} user ratings - ${restaurant.user_rating.rating_text}`);
                                // let ratingText = $("<p>").text(restaurant.user_rating.rating_text);
                                // let ratingVotes = $("<p>").text(`${restaurant.user_rating.votes} votes`);
                                // let cuisines = $("<p>").text(`Cuisines: ${restaurant.cuisines}`);
                                // let costFor2 = $("<p>").text(`Average Cost For Two: ${restaurant.currency}${restaurant.average_cost_for_two}`);
                                // let url = $("<a>").attr({ "href": restaurant.url, "target": "_blank" }).text(`Zomato Page`);
                                // let restaurantContainer = $('<div class="restaurant-container">').css({ "border": "solid black 1px", "padding": "10px", "margin": "10px" });
                                // $(restaurantContainer).append(name);
                                // $(restaurantContainer).append(locality);
                                // $(restaurantContainer).append(address);
                                // $(restaurantContainer).append(ratingScore);
                                // $("#restaurantResults").append(ratingText);
                                // $("#restaurantResults").append(ratingVotes);
                                // $(restaurantContainer).append(cuisines);
                                // $(restaurantContainer).append(costFor2);
                                // $(restaurantContainer).append(url);
                                // $("#restaurantResults").append(restaurantContainer);
                                // ================================
                                // end original zomato display info
                                // ================================
                                let restaurantContainer = $(
                                    `<div class="row">
                                        <div class="col s12">
                                            <div class="card teal darken-1">
                                                <div class="card-content white-text">
                                                    <span class="card-title">${restaurant.name}</span>
                                                    <p>${restaurant.location.locality}</p>
                                                    <p>${restaurant.location.address}</p>
                                                    <p>${restaurant.user_rating.aggregate_rating} / 5 from ${restaurant.user_rating.votes} user ratings - ${restaurant.user_rating.rating_text}</p>
                                                    <p>Cuisines: ${restaurant.cuisines}</p>
                                                    <p>Average Cost For Two: ${restaurant.currency}${restaurant.average_cost_for_two}</p>
                                                </div>
                                                <div class="card-action">
                                                    <a href="${restaurant.url}" target="_blank">Zomato Page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                );
                                $("#restaurantResults").append(restaurantContainer);
                                // console.log(restaurantContainer);

                                for (let i = 1; i < 6; i++) {
                                    $.get(`https://www.lonelyplanet.com/${country}/places?page=${i}`, response => {
                                        let placeLink = $(response).find(".card__mask > a");

                                        for (const key in placeLink) {
                                            if (placeLink.hasOwnProperty(key)) {
                                                const element = placeLink[key];
                                                if ($(element).attr("href") != undefined) {
                                                    let link = $(element).attr("href")
                                                    $.get(`https://www.lonelyplanet.com/${link}`, response2 => {
                                                        if ($(response2).find(".slideshow__slide")[0] != undefined) {
                                                            let title = $(response2).find(".masthead__title")[0].innerText;
                                                            let slideImg = $(response2).find(".slideshow__slide")[0].style.backgroundImage;
                                                            let div = $("<div>");
                                                            div.append($("<a>").attr({ "href": `https://www.lonelyplanet.com/${link}`, target: "_blank" }).text(title));
                                                            div.append($("<img>").attr({ "src": slideImg.substring(5, slideImg.length - 2), "height": "162px", "width": "250px" }));
                                                            $(".pictures").append(div);
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }

                    }
                })
            });
        });
    })
});




