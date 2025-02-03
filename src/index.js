const myLocation = document.getElementById("myLocation");

var endpoint = 'http://ip-api.com/json/24.48.0.1?fields=status,message,city';

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.status !== 'success') {
            console.log('query failed: ' + response.message);
            return
        }

        myLocation.innerHTML = "You are at: " + response.city;

        if (myLocation.countryCode == "US") {
            myLocation.innerHTML = "Redirecting to Google...";
        } 

    }
};
xhr.open('GET', endpoint, true);
xhr.send();

// let weather = document.getElementById("weather");
// let weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q={Johannesburg}&appid={2e0f0affa2f1dffc3136bd15e05a3af8}}`
// document.getElementById("name").innerHTML = "Johannesburg";