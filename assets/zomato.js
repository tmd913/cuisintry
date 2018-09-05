let accessToken = '6816158a6fbe7ceacf3a9617a5853775';

$.ajax({
    // url: 'https://developers.zomato.com/api/v2.1/categories',
    url: 'https://developers.zomato.com/api/v2.1/cities?q=washington',
    headers: {
        'user-key': accessToken,
    },
    success: response => {
        console.log(response);
    }
})

// var country = "england";

// $.get('https://www.lonelyplanet.com/' + country, function(response) {
//     // console.log(response);
//     var slideImg = $(response).find(".slideshow__slide")[0].style.backgroundImage;
//     console.log(slideImg.substring(5, slideImg.length - 2));
//     $("#resultsArea").append($("<img>").attr("src", slideImg.substring(5, slideImg.length - 2)));
// });

const places = [];

$("#searchButton").on("click", event => {
    event.preventDefault();
    $(".picture-container").css("height", "800px");
    $('html, body').animate({
        scrollTop: $(".picture-container").offset().top
      }, 1000);
    $(".pictures").empty();
    let country = $("#countrySearch").val().trim();
    for (let i = 1; i < 6; i++) {
        $.get(`https://www.lonelyplanet.com/${country}/places?page=${i}`, response => {
            let placeLink = $(response).find(".card__mask > a");

            for (const key in placeLink) {
                if (placeLink.hasOwnProperty(key)) {
                    const element = placeLink[key];
                    if ($(element).attr("href") != undefined) {
                        let link = $(element).attr("href")
                        let linkLength = link.length;
                        let linkPlace;
                        for (let j = linkLength - 1; j >= 0; j--) {
                            if (link[j] == '/') {
                                linkPlace = link.substring(j + 1);
                                places.push(linkPlace);
                                break;
                            }
                        }
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
})

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

const cityIDs = [280,306,279,281,292,286,1105,90,287,283,61,89,259,51,294,289,260,256,300,288,282,302,787,334,277,68,291,601,295,296,298,303,305,285,70,301];
let cuisineIDs = {};

cityIDs.forEach(element => {
    $.ajax({
        url: `https://developers.zomato.com/api/v2.1/cuisines?city_id=${element}`,
        headers: {
            'user-key': accessToken,
        },
        success: response => {
            // console.log(response);
            // console.log(response.cuisines[120]);
            for (const key in response.cuisines) {
                if (response.cuisines.hasOwnProperty(key)) {
                    const element = response.cuisines[key].cuisine;
                    // console.log(element);
                    if (!(element.cuisine_name in cuisineIDs)) {
                        cuisineIDs[element.cuisine_name] = element.cuisine_id;
                    }
                }
            }
        }
    });
});

$.getJSON("https://api.myjson.com/bins/1cr34k", json => {
    console.log(json);
});

// $.getJSON("./assets/us_zip_to_lat_long_lu.json", json => {
//     console.log(json);
// });



