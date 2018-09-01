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
                                $(".pictures").append(div);
                                $(".pictures").append($("<img>").attr({ "src": slideImg.substring(5, slideImg.length - 2), "height": "333px", "width": "500px" }));
                            }
                        });
                    }
                }
            }
        });
    }
})



