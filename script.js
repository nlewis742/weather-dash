// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
var d5 = document.getElementById("d5");
var recentSearches = document.getElementById("past-searches");
var search = document.getElementById("search")
var userInput = document.getElementById("searched-text")

var today = dayjs();
var futureDay = [];
var searched = [];


// $('#d1').text()

for (let i = 0; i <= 5; i++) {
  let nextDay = dayjs(today).add(i, "day");
  console.log(nextDay.format("YYYY-MM-DD"));
  futureDay.push(nextDay);
}

console.log(futureDay);
$("#d1").text(futureDay[1]);
$("#d2").text(futureDay[2]);
$("#d3").text(futureDay[3]);
$("#d4").text(futureDay[4]);
$("#d5").text(futureDay[5]);
$("#currentDay").text(today.format("MMM D, YYYY"));

function renderSearched() {
  recentSearches.innerHTML = "";
  
  for (var i = 0; i < searched.length; i++) {
    var city = searched[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i)

    recentSearches.appendChild(li);
  }
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem("searched"))||[];

  if (storedCities !== null) {
    searched = storedCities;
  }

  renderSearched(storedCities);
}

function searchedCities() {
localStorage.setItem("searched", JSON.stringify(searched));
}
console.log(searched);

search.addEventListener("click", function(event) {
  event.preventDefault ();

  var city = userInput.value.trim();
console.log(city);
  if (city === "") {
    return;
  }

searched.push(city)
userInput.value = "";

searchedCities ();
renderSearched ();

});

