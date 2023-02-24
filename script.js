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
var search = document.getElementById("search");
var userInput = document.getElementById("searched-text");
var cTemp = document.getElementById("temp");
var cWind = document.getElementById("wind");
var cHumidity = document.getElementById("humidity");
var nTemp = document.querySelector("temp");

var today = dayjs();
var futureDay = [];
var searched = [];
console.log(searched);

// $('#d1').text()

//I would rather use the below because of formatting but no longer working

// for (let i = 0; i <= 5; i++) {
//   let nextDay = dayjs(today).add(i, "day");
//   console.log(nextDay.format("YYYY-MM-DD"));
//   futureDay.push(nextDay.format("YYYY-MM-DD"));
// }

// console.log(futureDay);
// $("#d1").text(futureDay[1]);
// $("#d2").text(futureDay[2]);
// $("#d3").text(futureDay[3]);
// $("#d4").text(futureDay[4]);
// $("#d5").text(futureDay[5]);
// $("#currentDay").text(today.format("MMM D, YYYY"));

// function renderSearched() {
//   recentSearches.innerHTML = "";

//   for (var i = 0; i < searched.length; i++) {
//     var city = searched[i];

//     var li = document.createElement("li");
//     li.textContent = city;
//     // li.setAttribute("data-index", i)
//     console.log(city);

//     recentSearches.appendChild(li);

//    }
// }

function init() {
  var storedCities = JSON.parse(localStorage.getItem("searched")) || [];

  if (storedCities !== null) {
    searched = storedCities;
    console.log(searched);
  }

  // Clearout the previous content 
  recentSearches.textContent = "";

  for (var i = 0; i < searched.length; i++) {
    var city = searched[i];

    var li = document.createElement("li");
    li.textContent = city;
    // li.setAttribute("data-index", i)
    console.log(city);

    recentSearches.appendChild(li);

    // renderSearched(storedCities);
  }
}

search.addEventListener("click", function (event) {
  event.preventDefault();

  var city = userInput.value.trim();
  console.log(city);
  if (city === "") {
    return;
  }
  getApi(city);

  searched.push(city);
  console.log(searched);
  userInput.value = "";

  localStorage.setItem("searched", JSON.stringify(searched));

  init();
  // renderSearched ();
});
// /comment to push

init();

var API = "6dcb91dfa0f05e0719bf5e42aee55594";

function currentDay(lat,lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
  
      let datesDiv = document.querySelectorAll(".dayCurrent > p.date");
      let iconDivs = document.querySelectorAll(".dayCurrent > p.icon > img");
      let windDivs = document.querySelectorAll(".dayCurrent > p.wind");
      let tempDivs = document.querySelectorAll(".dayCurrent > p.temp");
      let humidityDivs = document.querySelectorAll(".dayCurrent > p.humidity");

      event.preventDefault();
      
      datesDiv[0].textContent = "";
      iconDivs[0].textContent = "";
      windDivs[0].textContent = "";
      tempDivs[0].textContent = "";
      humidityDivs[0].textContent = "";

      console.log(datesDiv);
        let j = 0;

          var date = data.dt;
          console.log(dayjs(date))
          // date = date.substring(0, date.indexOf(" "));
          var temperature = data.main.temp;
          var wind = data.wind.speed;
          var humidity = data.main.humidity;

          datesDiv[j].textContent += `${dayjs(date)}`;
          iconDivs[j].src =
            "https://openweathermap.org/img/w/" +
            data.weather[0].icon +
            ".png";
          windDivs[j].innerText += " " + data.wind.speed + "mph";
          tempDivs[j].innerText += " " + data.main.temp + "F";
          humidityDivs[j].innerText += " " + data.main.humidity + "%";

        
          // cTemp.textContent = temperature;
          // cWind.textContent = wind;
          // cHumidity.textContent = humidity;
          // console.log(temperature);
          // console.log(wind);
          // console.log(humidity);
        
      
    });
  }
function forcastWeather(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // var temperature = data.list[0].main.temp;
      // var wind = data.list[0].wind.speed;
      // var humidity = data.list[0].main.humidity;

      // cTemp.textContent = temperature;
      // cWind.textContent = wind;
      // cHumidity.textContent = humidity;
      // console.log(temperature);
      // console.log(wind);
      // console.log(humidity);
  


      let datesDiv = document.querySelectorAll(".days > p.date");
      let iconDivs = document.querySelectorAll(".days > p.icon > img");
      let windDivs = document.querySelectorAll(".days > p.wind");
      let tempDivs = document.querySelectorAll(".days > p.temp");
      let humidityDivs = document.querySelectorAll(".days > p.humidity");
      // console.log(datesDiv);
      // console.log(data.list);
      let j = 0;
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("12:00:00") > 0) {
          var dayDis = "#d" + i;
          // console.log(dayDis);

          var date = data.list[i].dt_txt;
          date = date.substring(0, date.indexOf(" "));
          var temperature = data.list[i].main.temp;
          var wind = data.list[i].wind.speed;
          var humidity = data.list[i].main.humidity;

          datesDiv[j].innerText += `${date}`;
          iconDivs[j].src =
            "https://openweathermap.org/img/w/" +
            data.list[i].weather[0].icon +
            ".png";
          windDivs[j].innerText += " " + data.list[i].wind.speed + "mph";
          tempDivs[j].innerText += " " + data.list[i].main.temp + "F";
          humidityDivs[j].innerText += " " + data.list[i].main.humidity + "%";

          j++;
          // cTemp.textContent = temperature;
          // cWind.textContent = wind;
          // cHumidity.textContent = humidity;
          // console.log(temperature);
          // console.log(wind);
          // console.log(humidity);
     

        }
      }
    });
}

function getApi(city) {
  var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API}&units=imperial`;

  fetch(geocodeUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      currentDay(lat,lon);
      forcastWeather(lat, lon);
    })

    .catch(function (error) {
      console.log(error);
    });
}

// getApi ("Boston")
console.log("I am code after the fetch request");

// below is an example of a fetch function for an api
// function getApi() {
//   // replace `octocat` with anyone else's GitHub username
//   var requestUrl = 'https://api.github.com/users/octocat/repos';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         var listItem = document.createElement('li');
//         listItem.textContent = data[i].html_url;
//         repoList.appendChild(listItem);
//       }
//     });
// }

// fetchButton.addEventListener('click', getApi);


let currentDate = dayjs().format("MM/DD/YYYY");
console.log(currentDate)
