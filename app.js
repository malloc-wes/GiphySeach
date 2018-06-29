$( document ).ready(function() {

// initial array:
var entry = ["Barack Obama", "Donald Trump", "John F Kennedy", "FDR", "Bill Clinton", "George W Bush", "Ronald Reagan","Nixon", "Bernie Sanders"];

//display the buttons with function:

function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < entry.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("president");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", entry[i]);
		gifButton.text(entry[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

//add new buttons:

function addNewButton() {
	$("#addGif").on("click", function() {
		var president = $("#entryInput").val().trim();
		if (president == ""){
			return false;//no blank buttons
		}
		entry.push(president);

		displayGifButtons();
		return false;
		});
}

//remove last button:
function removeLastButton() {
	$("removeGif").on("click", function() {
		topic.pop(president);
		displayGifButtons();
		return false;
	});

}

//display the gifs:

function displayGifs() {
	var president = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + president + "&api_key=dc6zaTOxFJmzC&limit=8";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifsView").empty();
		//show results of gifs
		var results = response.data;
		if (results == ""){
			alert("GIF for this entry couldn't be found!");	
		}
		for (var i = 0; i<results.length; i++){
			//put gifs in a div
			var gifDiv = $("<div1>");
			//pull rating of gif
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			//pull gif
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			//paused images
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			//animated images
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
			//how images come in, already paused
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			//add new div to existing divs
			$("#gifsView").prepend(gifDiv);
		}
	});
}


//populate list of created entries
displayGifButtons();
addNewButton();
removeLastButton();



//listeners:
$(document).on("click", ".president", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});
