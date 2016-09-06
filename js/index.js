var UoM = "imperial";

var loc;
var latitude = 0;
var longitude = 0;
var cityName = "";

$(document).ready( function() {
  $.getJSON("http://ipinfo.io/json", function(ipApi) {
    cityName = ipApi.city + ", " + ipApi.region + " " +ipApi.postal + ", " + ipApi.country;
    loc = ipApi.loc.split(",");
    latitude = parseFloat(loc[0]);
    longitude = parseFloat(loc[1]);
    
    $("#City").html(cityName);
    
    if (ipApi.country == "US") {
      UoM = "imperial"
    } else {
      UoM = "imperial"
    }
  });

  $("#changeUnits").on("click", function() {
    switch (UoM) {
      case "imperial":
        UoM = "metric";
        break;
      case "metric":
        UoM = "imperial";
        break;
    }
    getWeather();
  });

  getWeather();
});

function getWeather () {
  var weatherURL = "http://api.openweathermap.org/data/2.5/weather?";
  
  weatherURL += "lat=" + latitude
  weatherURL += "&lon=" + longitude
  weatherURL += "&units=" + UoM
  weatherURL += "&APPID=96992fc450680db604b2b74de6a24bee&callback=?"
  $.getJSON(weatherURL , function(json) {    
    $("#Icon").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    $("#Weather").html(json.weather[0].description);
    $("#Temp").html("Temperature: " + json.main.temp.toFixed(0) + tempUnits());
    $("#Pres").html("Barometer: " + barometricPressure(json.main.pressure));
    $("#Humidity").html("Humidity: " + json.main.humidity + "%");
    $("#Windspeed").html("Wind Speed: " + json.wind.speed + windspeedUnits());
  });
}

function tempUnits() {
  switch (UoM) {
    case "imperial":
      return " F";
      break;
    case "metric":
      return " C";
      break;
  }
}

function windspeedUnits() {
  switch (UoM) {
    case "imperial":
      return " mph";
      break;
    case "metric":
      return " m/s";
      break;
  }
}

function barometricPressure(pascals) {
  switch (UoM) {
    case "imperial":
      return  (pascals * 0.02953).toFixed(2) + " inHg";
      break;
    case "metric":
      return (pascals).toFixed(0) + " Pa";
      break;
  } 
}