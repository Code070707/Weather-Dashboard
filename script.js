const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');

const apiKey = '02f029f64a6dd97d1a395a50163fd9b4'; // Replace with your OpenWeatherMap API key

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    } else {
        errorMessage.textContent = "Please enter a city name.";
        clearWeatherInfo();
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            errorMessage.textContent = "City not found.";
            clearWeatherInfo();
        } else {
            errorMessage.textContent = "";
            cityName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            description.textContent = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
            weatherIcon.alt = data.weather[0].description;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorMessage.textContent = "An error occurred while fetching weather data.";
        clearWeatherInfo();
    }
}

function clearWeatherInfo() {
    cityName.textContent = "";
    temperature.textContent = "";
    humidity.textContent = "";
    description.textContent = "";
    weatherIcon.src = "";
    weatherIcon.alt = "";
}
