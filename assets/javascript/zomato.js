// let accessToken = '6816158a6fbe7ceacf3a9617a5853775';
let accessToken = '1dec11522d7c1a36d57081a995c76d52';
// let zipAccessToken = 'POxFNCPw1BNNVCYVJdmoM1laaANt2ocOUdhA86z4RcyYea2Eo6hhzQIhaNEyJdlK';

let country;
let zip;
let cuisineID;
let lat;
let lng;
let page = 1;
const lonelyPlanetImages = [];
const ajaxCalls = [];

function displayCountries() {
    let queryURL = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let flag = $("<img>").attr({ "src": response[0].flag, "id": "country-flag" });

        $(".card-image").html(flag);
        $(".name").text(response[0].name);
        $(".capital").text("Capital: " + response[0].capital);
        $(".region").text("Region: " + response[0].region);
        $(".population").text("Population: " + response[0].population.toLocaleString('en'));
        $(".nativeName").text("Native name: " + response[0].nativeName);
        $(".currencies").text("Currency: " + response[0].currencies[0].name);
        $(".languages").text("Languages: " + response[0].languages[0].nativeName);
    });
}

function displayLonelyPlanet() {
    // for (let page = 1; page < 6; page++) {
        $.get(`https://www.lonelyplanet.com/${country}/places?page=${page}`, response => {
            let placeLink = $(response).find(".card__mask > a");

            for (const key in placeLink) {
                if (placeLink.hasOwnProperty(key)) {
                    const element = placeLink[key];
                    if ($(element).attr("href") != undefined) {
                        let link = $(element).attr("href")
                        ajaxCalls.push($.get(`https://www.lonelyplanet.com/${link}`, response2 => {
                            if ($(response2).find(".slideshow__slide")[0] != undefined) {
                                let title = $(response2).find(".masthead__title")[0].innerText;
                                let slideImg = $(response2).find(".slideshow__slide")[0].style.backgroundImage;
                                let div = $('<div class="lp-img-container">');
                                let divLink = $('<div class="lp-link-container">');
                                divLink.append($("<a>").attr({ "href": `https://www.lonelyplanet.com/${link}`, "target": "_blank", "class": "place-link" }).text(title.toUpperCase()));
                                div.append(divLink);
                                div.append($("<img>").attr({ "src": slideImg.substring(5, slideImg.length - 2), "height": "162px", "width": "250px" }));
                                lonelyPlanetImages.push(div);
                                $(".pictures").append(div);
                            }
                        }));
                    }
                }
            }
        });
    // }
}

function displayRestaurants() {
    $.ajax({
        url: `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lng}&cuisines=${cuisineID}&sort=rating&order=desc`,
        headers: {
            'user-key': accessToken,
        },
        success: response => {
            for (const key in response.restaurants) {
                if (response.restaurants.hasOwnProperty(key)) {
                    const element = response.restaurants[key];
                    let restaurant = element.restaurant;
                    let restaurantContainer = $(
                        `<div class="row">
                            <div class="col s12">
                                <div class="card darken-1" id="restaurant-card">
                                    <div class="card-content">
                                        <span class="card-title">${restaurant.name}</span>
                                        <p>${restaurant.location.locality}</p>
                                        <p>${restaurant.location.address}</p>
                                        <p>${restaurant.user_rating.aggregate_rating} / 5 from ${restaurant.user_rating.votes} user ratings - ${restaurant.user_rating.rating_text}</p>
                                        <p>Cuisines: ${restaurant.cuisines}</p>
                                        <p>Average Cost For Two: ${restaurant.currency}${restaurant.average_cost_for_two}</p>
                                    </div>
                                    <div class="card-action zomato">
                                        <a href="${restaurant.url}" target="_blank">Zomato Page</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );
                    $("#zomato-results").append(restaurantContainer);
                }
            }
        }
    })
}

function clearDisplay() {
    $(".card-image").html("");
    $(".name").text("");
    $(".capital").text("");
    $(".region").text("");
    $(".population").text("");
    $(".nativeName").text("");
    $(".currencies").text("");
    $(".languages").text("");
    $("#restaurant-header").text("");
    $("#zomato-results").empty();
    $(".pictures").empty();
}

$(document).ready(function () {
    $("#Submit").on("click", event => {
        event.preventDefault();
        ajaxCalls.forEach(element => {
            element.abort();
        })
        clearDisplay();
        $("#resultsArea").removeClass("display-none");
        $('html, body').animate({
            scrollTop: $("#restaurantResults").offset().top
        }, 0);
        country = $("#countrySearch").val().trim();
        $("#wiki-link").attr("href", `https://en.wikipedia.org/wiki/${country}`);
        zip = $("#restaurantSearch").val().trim();
        displayCountries();
        displayLonelyPlanet();
        $.getJSON("https://raw.githubusercontent.com/tmd913/project0/master/assets/json/country_cuisine_id_lu.json", json => {
            cuisineID = json[country].CUISINE_ID;
            $("#restaurant-header").text(`LOCAL ${json[country].ADJ_FORM.toUpperCase()} RESTAURANTS`);

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

            $.getJSON("https://raw.githubusercontent.com/tmd913/project0/master/assets/json/us_zip_to_lat_long_lu.json", json => {
                lat = json[zip].LAT;
                lng = json[zip].LNG;

                displayRestaurants();
            });
        });
    })
});




