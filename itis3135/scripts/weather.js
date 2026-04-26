async function getWeather(city) {
    const url = "https://weather-proxy.freecodecamp.rocks/api/city/" + city;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Weather data:", data);
        return data;
    } catch (error) {
        console.log("Weather error:", error);
        return null;
    }
}

function setText(id, text) {
    document.getElementById(id).textContent = text;
}

function getFlowerSuggestion(temp, humidity, windSpeed) {
    if (temp > 85) {
        return "General Flower Tip: Hot weather can dry flowers quickly. Water early in the morning.";
    }

    if (temp < 45) {
        return "General Flower Tip: Cold weather may damage sensitive blooms. Cover plants or move pots indoors.";
    }

    if (humidity > 75) {
        return "General Flower Tip: High humidity can increase mildew risk. Give flowers space for airflow.";
    }

    if (windSpeed > 15) {
        return "General Flower Tip: Strong wind can bend stems. Move potted flowers to a protected area.";
    }

    return "General Flower Tip: This looks like comfortable blooming weather.";
}

async function showWeather(city) {
    setText("location", "Location: Loading...");
    setText("weather-main", "Weather: Loading...");
    setText("main-temperature", "Temperature: Loading...");
    setText("feels-like", "Feels Like: Loading...");
    setText("humidity", "Humidity: Loading...");
    setText("wind", "Wind: Loading...");
    setText("wind-gust", "Wind Gust: Loading...");

    const data = await getWeather(city);

    if (!data || data.cod === "404") {
        alert("Something went wrong, please try again later.");
        return;
    }

    const weather = data.weather && data.weather[0] ? data.weather[0] : {};
    const main = data.main ? data.main : {};
    const wind = data.wind ? data.wind : {};

    setText("location", "Location: " + (data.name || city));
    setText("weather-main", "Weather: " + (weather.main || "N/A"));
    setText("main-temperature", "Temperature: " + (main.temp ?? "N/A") + "°F");
    setText("feels-like", "Feels Like: " + (main.feels_like ?? "N/A") + "°F");
    setText("humidity", "Humidity: " + (main.humidity ?? "N/A") + "%");
    setText("wind", "Wind: " + (wind.speed ?? "N/A") + " mph");
    setText("wind-gust", "Wind Gust: " + (wind.gust ?? "N/A") + " mph");

    setText(
        "general-flower-tip",
        getFlowerSuggestion(main.temp, main.humidity, wind.speed)
    );
}

document.getElementById("get-weather-btn").addEventListener("click", function () {
    const city = document.getElementById("city-select").value;

    if (!city) {
        alert("Please choose a city first.");
        return;
    }

    showWeather(city);
});