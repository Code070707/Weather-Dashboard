// Constants and variables
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');
const errorContainer = document.getElementById('error-container');

// Event listeners
searchBtn.addEventListener('click', getWeatherData);
cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});

// Function to get weather data
async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(
            https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
        );
        
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        hideError();
    } catch (error) {
        showError('Could not find weather data for this city. Please check the spelling and try again.');
        weatherContainer.classList.remove('active');
    }
}

// Function to display weather data
function displayWeatherData(data) {
    const { main, weather, wind, name } = data;
    
    // Get appropriate weather icon
    const weatherIcon = getWeatherIcon(weather[0].main);
    
    // Format temperature
    const temperature = Math.round(main.temp);
    
    // Update weather container content
    weatherContainer.innerHTML = `
        <div class="weather-header">
            <div>
                <h2>${name}</h2>
                <p>${weather[0].description}</p>
            </div>
            <div class="temperature">${temperature}°C</div>
        </div>
        <div class="weather-icon">
            ${weatherIcon}
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <i class="fas fa-thermometer-half"></i>
                <div>
                    <p>Feels Like</p>
                    <p>${Math.round(main.feels_like)}°C</p>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-tint"></i>
                <div>
                    <p>Humidity</p>
                    <p>${main.humidity}%</p>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-wind"></i>
                <div>
                    <p>Wind Speed</p>
                    <p>${wind.speed} m/s</p>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-compress-alt"></i>
                <div>
                    <p>Pressure</p>
                    <p>${main.pressure} hPa</p>
                </div>
            </div>
        </div>
    `;
    
    weatherContainer.classList.add('active');
}

// Function to get weather icon based on weather condition
function getWeatherIcon(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            return '<i class="fas fa-sun" style="color: #FFD700;"></i>';
        case 'clouds':
            return '<i class="fas fa-cloud" style="color: #A9A9A9;"></i>';
        case 'rain':
        case 'drizzle':
            return '<i class="fas fa-cloud-rain" style="color: #6495ED;"></i>';
        case 'thunderstorm':
            return '<i class="fas fa-bolt" style="color: #FFD700;"></i>';
        case 'snow':
            return '<i class="fas fa-snowflake" style="color: #FFFFFF;"></i>';
        case 'mist':
        case 'fog':
        case 'haze':
            return '<i class="fas fa-smog" style="color: #D3D3D3;"></i>';
        default:
            return '<i class="fas fa-cloud" style="color: #A9A9A9;"></i>';
    }
}

// Function to show error message
function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.add('active');
}

// Function to hide error message
function hideError() {
    errorContainer.classList.remove('active');
}
