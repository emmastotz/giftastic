$(document).ready(function() {
  var cartoons = ["BOB'S BURGERS", "ADVENTURE TIME", "RICK & MORTY", "ARCHER", "FUTURAMA", "SOUTH PARK", "FAMILY GUY", "SPONGEBOB SQUAREPANTS", "BIG MOUTH", "BRICKLEBERRY"];
    
  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayCartoonInfo() {

  var cartoon = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&limit=10&apikey=BkYXM9fPVEU3f84Rrxwy7KqjtpjZa4B1";

  // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log (response);
      // Creates a div to hold the movie
      var gifDiv = $("<div>");
      
      for (var j = 0; j < 10; j++){
        // Retrieves the Rating Data
      var rating = response.data[j].rating;
      var newRating = rating.toUpperCase();
      // Creates an element to have the rating displayed
      var ratingDiv = $("<div>");
      // Displays the rating
      ratingDiv.text("RATING: " + newRating);
      // Appends the rating to the gif div
      gifDiv.append(ratingDiv);

      // Retrieves the Image URL
      var imageURL = response.data[j].url;
      // Creates an element to hold the image
      var imageDiv = $("<img>").attr("src", imageURL);
      // Appends the image to the gif div
      gifDiv.append(imageDiv);
      }
      

      // Puts the set of gifs above the previous set of gifs.
      $("#gifs-view").prepend(gifDiv);
    });

  }

  // Function for displaying movie data
  function renderButtons() {
    // Deletes the cartoons prior to adding new movies
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < cartoons.length; i++) {
      // Generates buttons for each movie in the array
      var button = $("<button>");
      // Adds a class of cartoon to our button
      button.addClass("cartoon", "btn", "btn-secondary");
      // Added a data-attribute
      //button.attr("type", "button");
      //button.attr({"type":button, "data-name":cartoons[i]});
      
      //console.log(button);
      button.attr("data-name", cartoons[i]);
      // Provided the initial button text
      button.html(cartoons[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(button);
    }
  }

  // This function handles events where the add cartoon button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var cartoon = $("#gif-input").val().trim();
    var newCartoon = cartoon.toUpperCase();
    // The cartoon from the textbox is then added to our array
    
    cartoons.push(newCartoon);

    // Calling renderButtons which handles the processing of the cartoon array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "cartoon"
  $(document).on("click", ".cartoon", displayCartoonInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});