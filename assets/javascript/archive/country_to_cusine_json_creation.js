// ========================================================================================================================================
// country to adjectival form, cuisine id lookup table creation
// ========================================================================================================================================
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

const cityIDs = [280, 306, 279, 281, 292, 286, 1105, 90, 287, 283, 61, 89, 259, 51, 294, 289, 260, 256, 300, 288, 282, 302, 787, 334, 277, 68, 291, 601, 295, 296, 298, 303, 305, 285, 70, 301];
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
// ========================================================================================================================================
// end of country to adjectival form, cuisine id lookup table creation
// ========================================================================================================================================