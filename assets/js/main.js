// API REPO:  https://github.com/Giphy/GiphyAPI
var searchTerms = ["cats", "basketball"];




for(var i = 0; i < searchTerms.length;i++){
  var newBttn = $('<button>');
  newBttn.attr("data-search", searchTerms[i]);
  newBttn.addClass("btn");
  newBttn.addClass("searchButtons");
  newBttn.text(searchTerms[i]);
  $('#searchButtonsContainer').append(newBttn);
}

$('#submitTerm').on("click", function(e){
  e.preventDefault();

  var userTerm = $('#submitBox').val();

  if(searchTerms.indexOf(userTerm) < 0) {
    searchTerms.push(userTerm);
  }

})



$('#clear').on("click", function(e) {
    e.preventDefault();
    $("#showGIFS").empty();
})


$("#search").on("click", function(e) {

    e.preventDefault();

    var userQuery = $('#inputBox').val();
    searchTerms.push(userQuery);

    var key = "&api_key=dc6zaTOxFJmzC";
    var limit = "&limit=5"
    var reqUrl = "http://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;
    console.log(reqUrl);
    $.ajax({
        url: reqUrl,
        method: "GET"
    }).done(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].images["fixed_height"].url);
            var animateLink = response.data[i].images["fixed_height"].url;
            // var imgLink = response.data[0].images["fixed_height_still"].url; // gets the still version of gif
            var stillLink = response.data[i].images["fixed_height_still"].url;
            var newImg = $('<img>');

            newImg.attr('src', stillLink);
            newImg.attr('data-animate', animateLink);
            newImg.attr('data-still', stillLink);
            newImg.attr('data-state', "still")
            newImg.addClass('gif');
            $('#showGIFS').append(newImg);
        }

        $('.gif').on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr('src', $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr('src', $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        });

    })



})
