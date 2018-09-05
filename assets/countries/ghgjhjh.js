$(document).ready(function () {

    $("#country-search").on("click", function (event) {
        event.preventDefault();
        displayCountries();
    });

});

function displayCountries() {

        var country = $("#country").val().trim();
        console.log(country);
        // var country = "dominica";
        var queryURL = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var name = response[0].name;
            var flag = $("<img>").attr("src", response[0].flag); // --> REVISAR!!!!
            var capital = response[0].capital;
            var region = response[0].region;
            var subregion = response[0].subregion
            var population = response[0].population;
            var nativeName = response[0].nativeName;
            var currencies = response[0].currencies[0].name;
            var languages = response[0].languages[0].nativeName;

            // var imgURL = response[0].flag;
            // var flag = $("<img>").attr("src", imgURL);

            console.log(name);
            console.log(subregion);
            console.log(nativeName);
            console.log(response[0].flag);

            $("#countries-view").empty();
            $("#countries-view").append(name + flag + capital + region + subregion + population + nativeName + currencies + languages);
            $("#countries-view").append(flag);

        });

    

}
