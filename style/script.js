//Date information of the current day
let today = new Date();
let date = today.getDate();
let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
let year = today.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[today.getMonth()];
let day = days[today.getDay()];
let currentweekday = document.querySelector("#current-weekday");
let currentdate = document.querySelector("#current-date");
let currenttime = document.querySelector("#current-time");
currentweekday.innerHTML = `${day}`;
currentdate.innerHTML = `${date}.${month}.${year}`;
currenttime.innerHTML = `${hours}:${minutes}`;

//Display the name of the searched city and Inserting the real data of searched city
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let searchedCity = document.querySelector("#searched-city");
  if (searchInput.value) {
    searchedCity.innerHTML = `${searchInput.value}`;
    let apiKey = "3aacdf70afc33650631ca99d10ae4afe";
    let units = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.innerHTML}&units=${units}`;
    axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  } else {
    searchedCity.innerHTML = null;
    alert("Please type a city or click the current Location button");
  }
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currenttemperature = document.querySelector("#current-temperature");
  currenttemperature.innerHTML = `${temperature}`;
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${description}`;
  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed} km/h`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity} %`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//add button for current location

function showLocTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let currentLocationCity = document.querySelector("#searched-city");
  currentLocationCity.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let currenttemperature = document.querySelector("#current-temperature");
  currenttemperature.innerHTML = `${temperature}`;
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${description}`;
  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed} km/h`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity} %`;
}
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3aacdf70afc33650631ca99d10ae4afe";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(showLocTemperature);
}

function Location() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrentLoc = document.querySelector(
  "#search-button-current-location"
);
buttonCurrentLoc.addEventListener("click", Location);
