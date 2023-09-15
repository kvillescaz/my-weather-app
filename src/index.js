function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#day-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");
  let cityInput = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", search);

function clickCelsius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  tempDisplay.innerHTML = 38;
}

function clickFahrenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  tempDisplay.innerHTML = 101;
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", clickCelsius);
let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", clickFahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let apiKey = "9f921881fe13b734a2d1d626ff55e198";
let city = "Phoenix";
let lat = `position.coords.latitude`;
let lon = `position.coords.longitude`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
}
let h1 = document.querySelector("#city");
h1.innerHTML = city;

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}
function searchLocation(position) {
  let apiKey = "9f921881fe13b734a2d1d626ff55e198";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
searchLocation(city);
