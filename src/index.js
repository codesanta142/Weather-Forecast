function formatDate(timestamp) {
  let date = new Date(timestamp);
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

  return `Last updated ${day} ${hours}:${minutes}`;
}
function getTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apikey = "616b14cbd38253313b3b8852fa77335d";

  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(getTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
function showftemp(event) {
  event.preventDefault();
  clink.classList.remove("active");
  flink.classList.add("active");
  let ftemp = Math.round((celsiusTemperature * 9) / 5 + 32);

  let tempelement = document.querySelector("#temperature");
  tempelement.innerHTML = ftemp;
}
function showctemp(event) {
  event.preventDefault();
  clink.classList.add("active");
  flink.classList.remove("active");
  let tempelement = document.querySelector("#temperature");
  tempelement.innerHTML = Math.round(celsiusTemperature);
}
search("New York");
let celsiusTemperature = null;
let flink = document.querySelector("#faren-link");
flink.addEventListener("click", showftemp);
let clink = document.querySelector("#celsius-link");
clink.addEventListener("click", showctemp);
