// weather-app/script.js

// Ganti dengan API Key OpenWeatherMap Anda
const API_KEY = '11160c45aa65a0c29f30c83000a9abf6'; // Pastikan ini API Key Anda yang valid
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const forecastDisplay = document.getElementById('forecast-display');
const errorMessage = document.getElementById('error-message');

async function getWeatherData(city) {
    errorMessage.textContent = '';
    weatherDisplay.innerHTML = '<p class="placeholder-text">Loading current weather...</p>';
    forecastDisplay.innerHTML = ''; // Bersihkan perkiraan sebelumnya

    try {
        // Panggil API Cuaca Saat Ini
        const currentWeatherUrl = `${CURRENT_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const currentWeatherResponse = await fetch(currentWeatherUrl);

        if (!currentWeatherResponse.ok) {
            if (currentWeatherResponse.status === 404) {
                throw new Error('City not found. Please check the spelling.');
            } else if (currentWeatherResponse.status === 401) {
                throw new Error('API Key is invalid or not active. Please check your OpenWeatherMap API key.');
            } else {
                throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
            }
        }
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

        // Panggil API Perkiraan Cuaca
        const forecastUrl = `${FORECAST_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            throw new Error(`Failed to fetch forecast: HTTP error! status: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDisplay.innerHTML = '';
        forecastDisplay.innerHTML = '';
        errorMessage.textContent = `Error: ${error.message}`;
    }
}

// Fungsi untuk menampilkan cuaca saat ini
function displayCurrentWeather(data) {
    if (!data || data.cod === '404') {
        errorMessage.textContent = 'City not found. Please try again.';
        weatherDisplay.innerHTML = '';
        return;
    }

    const { name, sys, main, weather, wind } = data;
    const iconCode = weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIconClass = getWeatherIconClass(iconCode);

    weatherDisplay.innerHTML = `
        <div class="weather-info">
            <h2>${name}, ${sys.country}</h2>
            <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon-img">
            <p class="temperature">${Math.round(main.temp)}&deg;C</p>
            <p class="description">${weather[0].description}</p>
            <div class="details">
                <div class="detail-item">
                    <strong>${main.humidity}%</strong>
                    <p>Humidity</p>
                </div>
                <div class="detail-item">
                    <strong>${wind.speed} m/s</strong>
                    <p>Wind Speed</p>
                </div>
                <div class="detail-item">
                    <strong>${main.pressure} hPa</strong>
                    <p>Pressure</p>
                </div>
            </div>
        </div>
    `;
    // --- PENAMBAHAN/PERBAIKAN FADE-IN UNTUK CURRENT WEATHER ---
    const weatherInfoElement = weatherDisplay.querySelector('.weather-info');
    if (weatherInfoElement) {
        weatherInfoElement.classList.add('fade-in');
    }
    // -----------------------------------------------------------
}

// Fungsi untuk menampilkan perkiraan cuaca 5 hari
function displayForecast(data) {
    if (!data || !data.list || data.list.length === 0) {
        forecastDisplay.innerHTML = '<p>No forecast data available.</p>';
        return;
    }

    let forecastHtml = '<h2>5-Day Forecast</h2><div class="forecast-cards">';
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });

        // Ambil hanya satu perkiraan per hari (misal: pukul 12 siang atau yang terdekat)
        // Ini bisa disempurnakan untuk mengambil suhu min/max harian
        // Untuk demo, kita ambil item pertama untuk setiap hari
        const hour = date.getHours();
        if (!dailyForecasts[day] || (hour >= 12 && hour < 15 && new Date(dailyForecasts[day].dt * 1000).getHours() < 12)) {
             dailyForecasts[day] = item;
        }
    });

    for (const day in dailyForecasts) {
        const item = dailyForecasts[day];
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const weatherIconClass = getWeatherIconClass(iconCode);

        forecastHtml += `
            <div class="forecast-card">
                <h3>${day}</h3>
                <img src="${iconUrl}" alt="${item.weather[0].description}" class="forecast-icon">
                <p class="forecast-temp">${Math.round(item.main.temp)}&deg;C</p>
                <p class="forecast-desc">${item.weather[0].description}</p>
            </div>
        `;
    }

    forecastHtml += '</div>';
    forecastDisplay.innerHTML = forecastHtml;

    // --- PENAMBAHAN/PERBAIKAN FADE-IN UNTUK FORECAST ---
    const forecastCardsElement = forecastDisplay.querySelector('.forecast-cards');
    if (forecastCardsElement) {
        forecastCardsElement.classList.add('fade-in');
    }
    // ---------------------------------------------------
}

// Fungsi opsional untuk mapping ikon OpenWeatherMap ke Font Awesome
function getWeatherIconClass(iconCode) {
    switch (iconCode) {
        case '01d': return 'fas fa-sun'; // clear sky day
        case '01n': return 'fas fa-moon'; // clear sky night
        case '02d':
        case '02n': return 'fas fa-cloud-sun'; // few clouds
        case '03d':
        case '03n': return 'fas fa-cloud'; // scattered clouds
        case '04d':
        case '04n': return 'fas fa-cloud-meatball'; // broken clouds
        case '09d':
        case '09n': return 'fas fa-cloud-showers-heavy'; // shower rain
        case '10d':
        case '10n': return 'fas fa-cloud-sun-rain'; // rain
        case '11d':
        case '11n': return 'fas fa-bolt'; // thunderstorm
        case '13d':
        case '13n': return 'fas fa-snowflake'; // snow
        case '50d':
        case '50n': return 'fas fa-smog'; // mist
        default: return 'fas fa-cloud'; // default icon
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        localStorage.setItem('lastSearchedCity', city);
    } else {
        errorMessage.textContent = 'Please enter a city name.';
        weatherDisplay.innerHTML = '';
        forecastDisplay.innerHTML = '';
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
        cityInput.value = lastCity;
        getWeatherData(lastCity);
    } else {
        weatherDisplay.innerHTML = '<p class="placeholder-text">Enter a city to see the weather.</p>';
        forecastDisplay.innerHTML = '';
    }
});