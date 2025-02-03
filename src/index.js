const myLocation = document.getElementById("myLocation");

var endpoint = 'http://ip-api.com/json/24.48.0.1?fields=status,message,city';

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var response = JSON.parse(this.responseText);
        if (response.status !== 'success') {
            console.log('query failed: ' + response.message);
            return
        }

        myLocation.innerHTML = "You are at: " + response.city + ", " + response.countryCode;

        if (myLocation.countryCode == "US") {
           window.location.href = "https://www.google.com";
        } else if (myLocation.countryCode == "CA") {
            window.location.href = "https://www.google.com";
        }

        getWeather(response.city);
    }
};
xhr.open('GET', endpoint, true);
xhr.send();

function getWeather(city ) {
    const apiKey = "2e0f0affa2f1dffc3136bd15e05a3af8";
let weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

fetch(weatherEndpoint)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let temperature = data.main.temp;
        let description = data.weather[0].description;
        let icon = data.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

        weather.innerHTML = `It is currently ${temperature} degrees with ${description} in ${city}. <img src="${iconUrl}" alt="weather icon">`;
    })
    .catch((error) => {
        console.log(error);
    });
}
