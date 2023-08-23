//! from HTML
const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidityInfo = document.querySelector(".humidty");
const windInfo = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

//! Api information
const apiKey = "dd9d7f7d9ce2e4f54750d1283ff44827";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

//!Function
async function checkWeather(city) {
  //send an API request
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();

    //update the weather information, converting to dynamic
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidityInfo.innerHTML = data.main.humidity + "%";
    windInfo.innerHTML = data.wind.speed + " km/h";

    //update the weather images
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    //when enter the city name, the weather display will appear
    weather.style.display = "block";
    error.style.display = "none";
  }
}

//!Event Listener
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
