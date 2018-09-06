// 'https://www.foodnetwork.com/search/malaysian-/CUSTOM_FACET:RECIPE_FACET'

// city ids 
// https://www.washingtonpost.com/sf/style/2015/12/21/the-10-best-food-cities-in-america-ranked/?noredirect=on&utm_term=.815a7512e441
// https://www.lonelyplanet.com/news/2018/02/23/international-food-top-cities/
/*
    ny:          280 
    san fran:    306 
    seattle:     279 
    la:          281 
    chi:         292 
    portland:    286 
    charleston:  1105
    nola:        90  
    philly:      287 
    dc:          283 
    london:      61  
    toronto:     89  
    melbourne:   259 
    dubai:       51  
    montreal:    294 
    boston:      289 
    sydney:      260 
    vancouver:   256 
    calgary:     300 
    atlanta:     288 
    vegas:       282 
    san diego:   302 
    baltimore:   787 
    edmonton:    334  
    houston:     277 
    manchester:  68  
    miami:       291 
    orlando:     601 
    ottawa:      295 
    perth:       296 
    brisbane:    298 
    charlotte:   303 
    denver:      305 
    detroit:     285 
    auckland:    70  
    phoenix:     301 
*/

// let accessToken = '6816158a6fbe7ceacf3a9617a5853775';
let accessToken = '1dec11522d7c1a36d57081a995c76d52';
// let zipAccessToken = 'POxFNCPw1BNNVCYVJdmoM1laaANt2ocOUdhA86z4RcyYea2Eo6hhzQIhaNEyJdlK';

const cityIDs = [280, 306, 279, 281, 292, 286, 1105, 90, 287, 283, 61, 89, 259, 51, 294, 289, 260, 256, 300, 288, 282, 302, 787, 334, 277, 68, 291, 601, 295, 296, 298, 303, 305, 285, 70, 301];
let cuisineIDs = {};

// cityIDs.forEach(element => {
//     $.ajax({
//         url: `https://developers.zomato.com/api/v2.1/cuisines?city_id=${element}`,
//         headers: {
//             'user-key': accessToken,
//         },
//         success: response => {
//             // console.log(response);
//             // console.log(response.cuisines[120]);
//             for (const key in response.cuisines) {
//                 if (response.cuisines.hasOwnProperty(key)) {
//                     const element = response.cuisines[key].cuisine;
//                     // console.log(element);
//                     if (!(element.cuisine_name in cuisineIDs)) {
//                         cuisineIDs[element.cuisine_name] = element.cuisine_id;
//                     }
//                 }
//             }
//         }
//     });
// });

// const places = [];

// $("#searchButton").on("click", event => {
//     event.preventDefault();
//     $(".picture-container").css("height", "800px");
//     $('html, body').animate({
//         scrollTop: $(".picture-container").offset().top
//       }, 1000);
//     $(".pictures").empty();
//     let country = $("#countrySearch").val().trim();
//     for (let i = 1; i < 6; i++) {
//         $.get(`https://www.lonelyplanet.com/${country}/places?page=${i}`, response => {
//             let placeLink = $(response).find(".card__mask > a");

//             for (const key in placeLink) {
//                 if (placeLink.hasOwnProperty(key)) {
//                     const element = placeLink[key];
//                     if ($(element).attr("href") != undefined) {
//                         let link = $(element).attr("href")
//                         let linkLength = link.length;
//                         let linkPlace;
//                         for (let j = linkLength - 1; j >= 0; j--) {
//                             if (link[j] == '/') {
//                                 linkPlace = link.substring(j + 1);
//                                 places.push(linkPlace);
//                                 break;
//                             }
//                         }
//                         $.get(`https://www.lonelyplanet.com/${link}`, response2 => {
//                             if ($(response2).find(".slideshow__slide")[0] != undefined) {
//                                 let title = $(response2).find(".masthead__title")[0].innerText;
//                                 let slideImg = $(response2).find(".slideshow__slide")[0].style.backgroundImage;
//                                 let div = $("<div>");
//                                 div.append($("<a>").attr({ "href": `https://www.lonelyplanet.com/${link}`, target: "_blank" }).text(title));
//                                 div.append($("<img>").attr({ "src": slideImg.substring(5, slideImg.length - 2), "height": "162px", "width": "250px" }));
//                                 $(".pictures").append(div);
//                             }
//                         });
//                     }
//                 }
//             }
//         });
//     }
// })

// $.getJSON("https://raw.githubusercontent.com/tmd913/project0/tom/assets/country_cuisine_id_lu.json", json => {
//     console.log(json);
// });

// $.getJSON("https://raw.githubusercontent.com/tmd913/project0/tom/assets/us_zip_to_lat_long_lu.json", json => {
//     console.log(json["20036"]);
// });

// $.ajax({
//     url: 'https://developers.zomato.com/api/v2.1/cities?q=washington',
//     headers: {
//         'user-key': accessToken,
//     },
//     success: response => {
//         console.log(response);
//     }
// })

// cityIDs.forEach(element => {
//     $.ajax({
//         url: `https://developers.zomato.com/api/v2.1/cuisines?city_id=${element}`,
//         headers: {
//             'user-key': accessToken,
//         },
//         success: response => {
//             // console.log(response);
//             // console.log(response.cuisines[120]);
//             for (const key in response.cuisines) {
//                 if (response.cuisines.hasOwnProperty(key)) {
//                     const element = response.cuisines[key].cuisine;
//                     // console.log(element);
//                     if (!(element.cuisine_name in cuisineIDs)) {
//                         cuisineIDs[element.cuisine_name] = element.cuisine_id;
//                     }
//                 }
//             }
//         }
//     });
// });

$("#searchButton").on("click", event => {
    event.preventDefault();
    $("#resultsArea").removeClass("display-none");
    $('html, body').animate({
        scrollTop: $("#restaurantResults").offset().top
    }, 1000);
    $("#restaurantResults").empty();
    $(".pictures").empty();
    // $(".picture-container").css("height", "800px");
    // $('html, body').animate({
    //     scrollTop: $(".picture-container").offset().top
    //   }, 1000);
    // $(".pictures").empty();
    let country = $("#countrySearch").val().trim();
    let zip = $("#restaurantSearch").val().trim();
    let cuisineID;
    let lat;
    let lng;
    $.getJSON("https://raw.githubusercontent.com/tmd913/project0/tom/assets/country_cuisine_id_lu.json", json => {
        // console.log(json[country]);
        cuisineID = json[country].CUISINE_ID;
        // console.log(cuisineID);

        // $.ajax({
        //     url: 'https://www.zipcodeapi.com/rest/UR4aVihDZM5ZGru5FZN6ZUA4lxTFZTU61Xul2ii1bNa8AiIQEZLb4YKCLM4UYVrs/info.json/20036/degrees',
        //     method: "GET"
        // }).then( response => {
        //     console.log(response);
        // });
        for (let i = 1; i < 6; i++) {
            $.get(`https://www.lonelyplanet.com/${country}/places?page=${i}`, response => {
                let placeLink = $(response).find(".card__mask > a");

                for (const key in placeLink) {
                    if (placeLink.hasOwnProperty(key)) {
                        const element = placeLink[key];
                        if ($(element).attr("href") != undefined) {
                            let link = $(element).attr("href")
                            // let linkLength = link.length;
                            // let linkPlace;
                            // for (let j = linkLength - 1; j >= 0; j--) {
                            //     if (link[j] == '/') {
                            //         linkPlace = link.substring(j + 1);
                            //         places.push(linkPlace);
                            //         break;
                            //     }
                            // }
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
                            </div>`);
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
                            $("#restaurantResults").append(restaurantContainer);
                            console.log(restaurantContainer);
                        }
                    }

                }
            })
        });
    });
    // for (let i = 1; i < 6; i++) {
    //     $.get(`https://www.lonelyplanet.com/${country}/places?page=${i}`, response => {
    //         let placeLink = $(response).find(".card__mask > a");

    //         for (const key in placeLink) {
    //             if (placeLink.hasOwnProperty(key)) {
    //                 const element = placeLink[key];
    //                 if ($(element).attr("href") != undefined) {
    //                     let link = $(element).attr("href")
    //                     let linkLength = link.length;
    //                     let linkPlace;
    //                     for (let j = linkLength - 1; j >= 0; j--) {
    //                         if (link[j] == '/') {
    //                             linkPlace = link.substring(j + 1);
    //                             places.push(linkPlace);
    //                             break;
    //                         }
    //                     }
    //                     $.get(`https://www.lonelyplanet.com/${link}`, response2 => {
    //                         if ($(response2).find(".slideshow__slide")[0] != undefined) {
    //                             let title = $(response2).find(".masthead__title")[0].innerText;
    //                             let slideImg = $(response2).find(".slideshow__slide")[0].style.backgroundImage;
    //                             let div = $("<div>");
    //                             div.append($("<a>").attr({ "href": `https://www.lonelyplanet.com/${link}`, target: "_blank" }).text(title));
    //                             div.append($("<img>").attr({ "src": slideImg.substring(5, slideImg.length - 2), "height": "162px", "width": "250px" }));
    //                             $(".pictures").append(div);
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //     });
    // }
})





