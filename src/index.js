const myLocation = document.getElementById("myLocation");
const weatherElement = document.getElementById("weather");

function fetchLocation() {
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            let userIP = data.ip;
            return fetch(`http://ip-api.com/json/${userIP}?fields=status,message,city,countryCode`);
        })
        .then(response => response.json())
        .then(locationData => {
            if (locationData.status !== "success") {
                myLocation.innerHTML = "Location not found.";
                return;
            }
            myLocation.innerHTML = `You are at: ${locationData.city}, ${locationData.countryCode}`;
        })
        .catch(error => {
            console.error("Error fetching location:", error);
            myLocation.innerHTML = "We are unable to get your location.";
        });
}

function fetchWeather() {
    const apiKey = "2e0f0affa2f1dffc3136bd15e05a3af8";
    const city = "Your Area";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(weatherData => {
            if (weatherData.cod !== 200) {
                weatherElement.innerHTML = "Weather data not available.";
                return;
            }
            weatherElement.innerHTML = `Weather in ${weatherData.name}: ${weatherData.weather[0].description}, ${weatherData.main.temp}°C`;
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            weatherElement.innerHTML = "Unable to get weather.";
        });
}

fetchLocation();
fetchWeather();
