const apiKey = '02f029f64a6dd97d1a395a50163fd9b4'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
    const cityName = cityInput.value.trim();
    
    if (!cityName) {
        showError('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(
            https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric
        );

        if (!response.ok) throw new Error('City not found.');

        const data = await response.json();
        displayWeather(data);
        hideError();
    } catch (error) {
        showError(error.message);
        hideWeatherInfo();
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;

    document.getElementById('city-name').textContent = name;
    document.getElementById('weather-description').textContent =
        weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('humidity').textContent = main.humidity;

    const iconCode = weather[0].icon; // Example "01d"
    document.getElementById(
        'weather-icon'
    ).src = https://openweathermap.org/img/wn/${iconCode}@2x.png;

    weatherInfo.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function hideWeatherInfo() {
    weatherInfo.classList.add('hidden');
}
