// extra useable access token for zomato api
// let accessToken = '6816158a6fbe7ceacf3a9617a5853775'; 
let accessToken = '1dec11522d7c1a36d57081a995c76d52';

let country;
let zip;
let cuisineID;
let lat;
let lng;
let page = 1;
const lonelyPlanetImages = [];
const ajaxCalls = [];
let countryJSON;
let zipJSON;
// JSON that stores cuisine id for each country so we can search the zomato api by cuisine
$.getJSON("https://raw.githubusercontent.com/tmd913/project0/master/assets/json/country_cuisine_id_lu.json", json => {
    countryJSON = json;
});
//JSON that converts US zip codes to latitude and longitude so that we can interact with the Zomato API
$.getJSON("https://raw.githubusercontent.com/tmd913/project0/master/assets/json/us_zip_to_lat_long_lu.json", json => {
    zipJSON = json;
});

// calls country api to dynamically display country information
function displayCountries() {
    // account for some of the specific country names needed for country api
    let countryAPI_string;
    switch (country) {
        case "bolivia":
            countryAPI_string = "Bolivia (Plurinational State of)";
            break;
        case "iran":
            countryAPI_string = "Iran (Islamic Republic of)";
            break;
        case "laos":
            countryAPI_string = "Lao People's Democratic Republic";
            break;
        case "north korea":
            countryAPI_string = "Korea (Democratic People's Republic of)";
            break;
        case "palestine":
            countryAPI_string = "Palestine, State of";
            break;
        case "russia":
            countryAPI_string = "Russian Federation";
            break;
        case "south korea":
            countryAPI_string = "Korea (Republic of)";
            break;
        case "syria":
            countryAPI_string = "Syrian Arab Republic";
            break;
        case "tanzania":
            countryAPI_string = "Tanzania, United Republic of";
            break;
        case "england":
        case "great britain":
        case "britain":
        case "northern ireland":
            countryAPI_string = "United Kingdom of Great Britain and Northern Ireland";
            break;
        case "united states":
            countryAPI_string = "United States of America";
            break;
        case "venezuela":
            countryAPI_string = "Venezuela (Bolivarian Republic of)";
            break;
        case "vietnam":
            countryAPI_string = "Viet Nam";
            break;
        default:
            countryAPI_string = country;
            break;
    }
    let queryURL = "https://restcountries.eu/rest/v2/name/" + countryAPI_string + "?fullText=true";

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

// scrapes lonely planet website to dynamically pull back first page of images from countrys places page
function displayLonelyPlanet() {
    // for (let page = 1; page < 6; page++) {
    $.get(`https://www.lonelyplanet.com/${country}/places?page=${page}`, response => {
        // finds links to places for specific country
        let placeLink = $(response).find(".card__mask > a");

        // loops through each link element found on places page
        for (const key in placeLink) {
            // only properties that are not inherited
            if (placeLink.hasOwnProperty(key)) {
                const element = placeLink[key];
                // limits to elements with valid urls
                if ($(element).attr("href") != undefined) {
                    // use to later build full place page link
                    let link = $(element).attr("href")
                    // adds ajax call to array so that they can later be stopped if taking too long to finish
                    ajaxCalls.push($.get(`https://www.lonelyplanet.com/${link}`, response2 => {
                        // limits to places with images available
                        if ($(response2).find(".slideshow__slide")[0] != undefined) {
                            // pulls lonely planet title from place page
                            let title = $(response2).find(".masthead__title")[0].innerText;
                            // pulls background image
                            let slideImg = $(response2).find(".slideshow__slide")[0].style.backgroundImage;
                            let div = $('<div class="lp-img-container">');
                            let divLink = $('<div class="lp-link-container">');
                            // builds full link to place page
                            divLink.append($("<a>").attr({ "href": `https://www.lonelyplanet.com/${link}`, "target": "_blank", "class": "place-link" }).text(title.toUpperCase()));
                            div.append(divLink);
                            // extracts useable url from css string
                            div.append($("<img>").attr({ "src": slideImg.substring(5, slideImg.length - 2), "height": "162px", "width": "250px" }));
                            // stores newly created divs in array for potentially limited display arrangements
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

// calls zomato api to find restaurants with the countrys cuisine near the zip code entered 
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
                    // create html block for displaying zomato info in materialize cards
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

// removes information prior to populating additional country
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
        // stop lonely planet ajax calls currently in progress
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
        cuisineID = countryJSON[country].CUISINE_ID;
        $("#restaurant-header").text(`LOCAL ${countryJSON[country].ADJ_FORM.toUpperCase()} RESTAURANTS`);
        lat = zipJSON[zip].LAT;
        lng = zipJSON[zip].LNG;
        displayLonelyPlanet();
        displayRestaurants();
    })
});




