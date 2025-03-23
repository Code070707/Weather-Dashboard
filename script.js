const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
          errorMessage.textContent = "City not found";
          clearWeatherInfo();
          return;
        } else {
            errorMessage.textContent = "";
        }

        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        description.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.alt = data.weather[0].description;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorMessage.textContent = "An error occurred";
        clearWeatherInfo();
    }
}
function clearWeatherInfo(){
    cityName.textContent = "";
    temperature.textContent = "";
    humidity.textContent = "";
    description.textContent = "";
    weatherIcon.src = "";
    weatherIcon.alt = "";
}
