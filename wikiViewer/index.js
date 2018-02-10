
$(document).ready(function() {
    document.getElementById("searchBox").hidden = true;

    $("#searchBox").keypress(function(key) {
        if (key.keyCode == 13) {
            searchWiki();
        }
    });
});

function showSearch() {
    document.getElementById("searchBox").hidden = false;
    document.getElementById("searchIcon").hidden = true;
}

function searchRandom() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function searchWiki() {
    var searchText = document.getElementById("searchBox").value;

    $.getJSON("https://en.wikipedia.org/w/api.php?callback=?", 
    {
        "action":"query",
        "format":"json",
        "srsearch":searchText,
        "list":"search"
    }).done(function(data) {
        document.getElementById("searchHelpText").hidden = true;

        var boxes = "";
        var results = data["query"]["search"];
        for (i in results) {
            boxes = boxes + 
            '<div class="row justify-content-md-center results">' +
                '<div class="offset-md-1">' +
                    '<h3>' + results[i]["title"] + '</h3>' +
                    '<p>' + results[i]["snippet"] + '</h3>' +
                '</div>' +
            '</div>';
        }
        document.getElementById("searchResults").innerHTML = boxes;
    });
}
