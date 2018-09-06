$(document).ready(function () {

    $(".btn").on("click", function (event) {
        event.preventDefault();
        displayCountries();
    });

});

function displayCountries() {

        var country = $("#countrySearch").val().trim();
        console.log(country);
        // var country = "dominica";
        var queryURL = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var name = response[0].name;
            var flag = $("<img>").attr("src", response[0].flag);
        
            var nativeName = response[0].nativeName;
           

            $(".col s6").empty();

            $(".name").text("Name: " + response[0].name);
            $(".capital").text("Capital: " + response[0].capital);
            $(".region").text("Region: " + response[0].region);
            $(".population").text("Population: " + response[0].population);
            $(".nativeName").text("Native name: " + response[0].nativeName);
            $(".currencies").text("Currency: " + response[0].currencies[0].name);
            $(".languages").text("Languages: " + response[0].languages[0].nativeName);

            console.log(name);
            console.log(nativeName);
            console.log(response[0].flag);

            $("#resultsArea").append(flag);

        });
    

}
