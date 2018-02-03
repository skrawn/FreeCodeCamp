var weatherJSON;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var requestURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
      $.getJSON(requestURL, function(json) {
        weatherJSON = json;
        $("#city").text(json.name + ", " + json.sys.country);
        $("#temperature").text(json.main.temp.toFixed(1) + " °");
        $("#weather").text(json.weather[0].main);
        $("#units").text("C");
        $("#icon").attr("src", json.weather[0].icon);
        $("#icon").attr("alt", json.weather[0].description);        
      });      
    });
  } else {
    $("#data").text("Cannot get location");
  }
  
  $("#units").on("click", function() {
    var temperature = weatherJSON.main.temp.toFixed(1);

    if ($("#units").text() == "C") {
      $("#units").text("F");
      temperature = Math.floor(temperature * 9 / 5 + 32);
    } else {
      $("#units").text("C");      
    }
    $("#temperature").text(temperature + " °");
  });
});
