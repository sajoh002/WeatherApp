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
  fahrenheitTemp = response.data.main.temp;
  currentHigh = response.data.main.temp_max;
  currentLow = response.data.main.temp_min;
  document.querySelector("#current-temp").innerHTML =
    Math.round(fahrenheitTemp);
  document.querySelector("#high-temp").innerHTML = Math.round(currentHigh);
  document.querySelector("#low-temp").innerHTML = Math.round(currentLow);
  document.querySelector("#city-title").innerHTML = response.data.name;
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date-time").innerHTML = formatDate();
  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-weather-icon")
    .setAttribute("alt", `${response.data.weather[0].main}`);
}

function Search(city) {
  let apiKey = "979b0f0f351a5c4ea430dfe10b13b53f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  Search(city);
}

function changeToCelsius(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(
    ((fahrenheitTemp - 32) * 5) / 9
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    ((currentHigh - 32) * 5) / 9
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    ((currentLow - 32) * 5) / 9
  );
  document.querySelector(".units").innerHTML = "C";
  degreesFahrenheit.classList.remove("active");
  degreesCelsius.classList.add("active");
}

function changeToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML =
    Math.round(fahrenheitTemp);
  document.querySelector("#high-temp").innerHTML = Math.round(currentHigh);
  document.querySelector("#low-temp").innerHTML = Math.round(currentLow);
  document.querySelector(".units").innerHTML = "F";
  degreesCelsius.classList.remove("active");
  degreesFahrenheit.classList.add("active");
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

let fahrenheitTemp = null;
let currentHigh = null;
let currentLow = null;

let currentCitySearch = document.querySelector("#current-city-search");
currentCitySearch.addEventListener("click", currentCity);

Search("New York", "imperial");
