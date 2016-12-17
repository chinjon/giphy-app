// API REPO:  https://github.com/Giphy/GiphyAPI

window.onload = function() {

  var searchTerms = ["cats", "basketball"];

}


$('#clear').on("click", function(e) {
  e.preventDefault();
  $("#showGIFS").empty();
})


$("#search").on("click", function(e){

  e.preventDefault();

  var userQuery = $('#inputBox').val();
  console.log(userQuery);

  var key = "&api_key=dc6zaTOxFJmzC";
  var limit = "&limit=5"
  var reqUrl = "http://api.giphy.com/v1/gifs/search?q="+userQuery+limit+key;
  console.log(reqUrl);
  $.ajax({
    url: reqUrl,
    method: "GET"
  }).done(function(response){

    console.log(response.data[0].images["fixed_height"].url);
    var imgLink = response.data[0].images["fixed_height"].url;
    var newImg = $('<img>');

    newImg.attr('src', imgLink);
    $('#showGIFS').append(newImg);

  })


})
