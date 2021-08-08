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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
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

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let icon = null;
      if (
        (forecastDay.weather[0].icon === "50d") |
        (forecastDay.weather[0].icon === "50n")
      ) {
        icon = `${forecastDay.weather[0].icon}.png`;
      } else {
        icon = `${forecastDay.weather[0].icon}.svg`;
      }
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 forecast-1">
        <div class="forecast-day"><h5>${formatForecastDay(
          forecastDay.dt
        )}</h5></div>
        <div>
          <img
            src="images/${icon}"
            alt="${forecastDay.weather[0].description}"
            class="forecast-icon"
          />
        </div>
        <div class="forecast-temp">
          <span class="forecast-high">${Math.round(
            forecastDay.temp.max
          )}°</span>/<span
            class="forecast-low">
            ${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-title").innerHTML = response.data.name;
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date-time").innerHTML = formatDate();
  let icon = response.data.weather[0].icon;
  if ((icon === "50d") | (icon === "50n")) {
    document
      .querySelector("#current-weather-icon")
      .setAttribute("src", `images/${icon}.png`);
  } else {
    document
      .querySelector("#current-weather-icon")
      .setAttribute("src", `images/${icon}.svg`);
  }

  getForecast(response.data.coord);
}

function Search(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  Search(city);
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

let apiKey = "979b0f0f351a5c4ea430dfe10b13b53f";

let currentCitySearch = document.querySelector("#current-city-search");
currentCitySearch.addEventListener("click", currentCity);

Search("New York", "imperial");
