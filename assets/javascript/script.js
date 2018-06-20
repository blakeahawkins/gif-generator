console.log($("#alyssa").attr("data-queen"));

var queens = ["Katya Zamolodchikova", "Latrice Royale", "Alyssa Edwards"];

function displayQueenGifs() {
    var queen = $(this).attr("data-queen");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        queen + " drag&api_key=EgPKg0pospqz8ODGdLst6pW5XemXTtkN&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var queenDiv = $("<div>");

            var p = $("<p>");

            p.text(results[i].rating);

            var queenImage = $("<img>");
            queenImage.attr("src", results[i].images.fixed_height.url);

            queenDiv.append(p);
            queenDiv.append(queenImage);
            $("#gifs-appear-here").prepend(queenDiv);
        }
    });
};
function renderButtons() {
    $("#button-div").empty();
    for(i = 0; i < queens.length; i++) {
        var a = $("<button>");
        a.addClass("queen-btn");
        a.attr("data-queen", queens[i]);
        a.text(queens[i]);
        $("#button-div").append(a);
    }
}

$("#add-queen").on("click", function(event) {
    event.preventDefault();
    var queen = $("#queen-input").val().trim();
    queens.push(queen);
    renderButtons();
});

$(document).on("click", ".queen-btn", displayQueenGifs);

renderButtons();