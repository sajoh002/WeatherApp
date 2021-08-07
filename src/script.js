function formatDate() {
  let date = new Date();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#city-title").innerHTML = response.data.name;
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date-time").innerHTML = formatDate();
}

function Search(city, units) {
  let apiKey = "979b0f0f351a5c4ea430dfe10b13b53f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let units = "imperial";
  Search(city, units);
}

function changeTempUnits(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function changeToCelsius(event) {
  event.preventDefault();
  let city = document.querySelector("#city-title").innerHTML;
  let units = "metric";
  document.querySelector(".units").innerHTML = "C";

  Search(city, units);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-title").innerHTML;
  let units = "imperial";
  document.querySelector(".units").innerHTML = "F";

  Search(city, units);
}

function getCurrentLocation(position) {
  let apiKey = "979b0f0f351a5c4ea430dfe10b13b53f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function currentCity() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let newSearch = document.querySelector("#city-search");
newSearch.addEventListener("submit", handleSearch);

let degreesCelsius = document.querySelector("#celsius-temp");
degreesCelsius.addEventListener("click", changeToCelsius);

let degreesFahrenheit = document.querySelector("#fahrenheit-temp");
degreesFahrenheit.addEventListener("click", changeToFahrenheit);

let currentCitySearch = document.querySelector("#current-city-search");
currentCitySearch.addEventListener("click", currentCity);

Search("New York", "imperial");
