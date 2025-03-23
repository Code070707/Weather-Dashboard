const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherDetails = document.getElementById('weather-details');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeatherData(cityName);
    }
});

async function getWeatherData(cityName) {
    const url = https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            displayWeatherData(data);
        } else {
            weatherDetails.innerHTML = <p>Error: ${data.message}</p>;
        }
    } catch (error) {
        weatherDetails.innerHTML = '<p>An error occurred. Please try again.</p>';
    }
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = http://openweathermap.org/img/w/${iconCode}.png;

    weatherDetails.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${description}">
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${description}</p>
    `;
}
