 const WEATHER_API_KEY = 
   async function fetchLocation() {
            try {
                // Fetch location dynamically from ip-api (No API key required)
                const locationResponse = await fetch("http://ip-api.com/json/");
                const locationData = await locationResponse.json();

                if (locationData.status !== "success") throw new Error("Location detection failed");

                const { city, country, lat, lon } = locationData;

                document.getElementById("location").innerText = `You are in: ${city}, ${country}`;

                fetchWeather(lat, lon);
            } catch (error) {
                console.error("Error fetching location:", error);
                document.getElementById("location").innerText = "Unable to detect location.";
                document.getElementById("weather-container").innerHTML = "<p>Could not fetch weather data.</p>";
            }
        }

        async function fetchWeather(lat, lon) {
            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
                const weatherData = await weatherResponse.json();

                if (weatherData.cod !== 200) throw new Error(weatherData.message);

                const { temp } = weatherData.main;
                const { description } = weatherData.weather[0];

                document.getElementById("weather").innerHTML = `
                    <h2>Weather in ${weatherData.name}</h2>
                    <p>Temperature: ${temp}°C</p>
                    <p>Condition: ${description}</p>
                `;
            } catch (error) {
                console.error("Error fetching weather:", error);
                document.getElementById("weather-container").innerHTML = "<p>Unable to fetch weather data.</p>";
            }
        }

        // Start process
        fetchLocation();
