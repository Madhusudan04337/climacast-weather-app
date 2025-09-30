document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'b41be0722c611bdc5f710af33c8bd4b8';
    let currentUnit = 'metric'; 
    let timeInterval = null;

    const elements = {
        loader: document.getElementById('loader'),
        content: document.getElementById('content'),
        initialView: document.getElementById('initial-view'),
        mainContent: document.getElementById('main-content'),
        cityName: document.getElementById('city-name'),
        currentDate: document.getElementById('current-date'),
        currentTime: document.getElementById('current-time'),
        weatherIcon: document.getElementById('weather-icon'),
        temperature: document.getElementById('temperature'),
        weatherDescription: document.getElementById('weather-description'),
        humidity: document.getElementById('humidity'),
        windSpeed: document.getElementById('wind-speed'),
        suggestionsContainer: document.getElementById('suggestions-container'),
        citySearch: document.getElementById('city-search'),
        errorMessage: document.getElementById('error-message'),
        forecastContainer: document.getElementById('forecast-container'),
        unitToggle: document.getElementById('unit-toggle'),
        locationBtn: document.getElementById('location-btn'),
        themeToggle: document.getElementById('theme-toggle'),
    };

    const iconSVG = {
        "Thunderstorm": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.25 2.25c-.414 0-.75.336-.75.75v5.25h-1.5a.75.75 0 00-.671 1.126l3.75 5.25a.75.75 0 001.342 0l3.75-5.25a.75.75 0 00-.671-1.126h-1.5V3a.75.75 0 00-.75-.75h-3z" /><path fill-rule="evenodd" d="M12 1.5a.75.75 0 01.75.75v6h1.75a2.25 2.25 0 011.983 3.326l-3.75 5.25a2.25 2.25 0 01-3.966 0l-3.75-5.25A2.25 2.25 0 018.5 8.25H10.5V2.25A.75.75 0 0112 1.5zm-2.25 8.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clip-rule="evenodd" /></svg>`,
        "Drizzle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 01-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V6.31l-6.22 6.22a.75.75 0 01-1.06-1.06l7.5-7.5z" /></svg>`,
        "Rain": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9-4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd" /></svg>`,
        "Snow": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.06 1.06L5.636 5.197a.75.75 0 010-1.06zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.06l1.59-1.591a.75.75 0 011.062 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25A.75.75 0 014.5 12zm1.136 7.864a.75.75 0 010-1.06l1.591-1.592a.75.75 0 011.06 1.06l-1.591 1.591a.75.75 0 01-1.06 0zm12.728 0a.75.75 0 01-1.06 0l-1.592-1.591a.75.75 0 011.06-1.06l1.592 1.591a.75.75 0 010 1.06zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75.75zm-2.25-6.345a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0z" clip-rule="evenodd" /></svg>`,
        "Atmosphere": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.25-4.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM12 12.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" clip-rule="evenodd" /></svg>`,
        "Clear": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6.166 7.758a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75z" /></svg>`,
        "Clouds": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.422 9.014a5.25 5.25 0 00-9.488-2.678 6 6 0 00-6.684 7.402.75.75 0 00.932.618 7.502 7.502 0 0113.88-3.322 4.5 4.5 0 014.28 4.766.75.75 0 101.48-.232 6 6 0 00-11.422-4.554z"/></svg>`,
        "Default": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.84-.447-1.713-.447-2.553 0l-5.535 2.943a.75.75 0 000 1.348l5.535 2.943c.84.447 1.713.447 2.553 0l5.535-2.943a.75.75 0 000-1.348l-5.535-2.943z" clip-rule="evenodd" /></svg>`
    };
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6.166 7.758a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75z" /></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.462 1.685-6.58 4.29-8.47a.75.75 0 01.818.162z" clip-rule="evenodd" /></svg>`;
    
    const weatherIconMap = { "Thunderstorm": "Thunderstorm", "Drizzle": "Drizzle", "Rain": "Rain", "Snow": "Snow", "Mist": "Atmosphere", "Smoke": "Atmosphere", "Haze": "Atmosphere", "Dust": "Atmosphere", "Fog": "Atmosphere", "Sand": "Atmosphere", "Ash": "Atmosphere", "Squall": "Atmosphere", "Tornado": "Atmosphere", "Clear": "Clear", "Clouds": "Clouds" };
    const weatherSuggestions = {
        "Thunderstorm": [{ emoji: "🏠", text: "Stay indoors and stay safe." },{ emoji: "🔌", text: "Unplug sensitive appliances." },],
        "Drizzle": [{ emoji: "🧥", text: "A light jacket would be perfect." },{ emoji: "🚶", text: "Enjoy a peaceful, misty walk." },],
        "Rain": [{ emoji: "☔", text: "Don't forget your umbrella!" },{ emoji: "🚗", text: "Drive carefully, roads are slippery." },{ emoji: "☕", text: "Perfect weather for a warm drink." },],
        "Snow": [{ emoji: "🧤", text: "Bundle up! Wear warm gloves." },{ emoji: "☃️", text: "Great day to build a snowman!" },{ emoji: "❄️", text: "Watch your step on icy patches." },],
        "Clear": [{ emoji: "☀️", text: "Beautiful day to go outside!" },{ emoji: "😎", text: "Protect your eyes with sunglasses." },{ emoji: "💧", text: "Stay hydrated." },],
        "Clouds": [{ emoji: "☁️", text: "Great day for outdoor activities." },{ emoji: "📷", text: "Cloudy days offer great lighting for photos." },],
        "Extreme": [{ emoji: "🥵", text: "Very hot! Stay cool and hydrated." },{ emoji: "🥶", text: "Extreme cold! Layer up." },],
        "Default": [{ emoji: "🤔", text: "Check local news for advisories." },{ emoji: "👍", text: "Have a wonderful day!" },]
    };

    const fetchWeatherData = async (url) => {
        showLoader(true);
        showError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            elements.initialView.classList.add('hidden');
            elements.mainContent.classList.remove('hidden');

            updateCurrentWeatherUI(data.list[0], data.city);
            updateForecastUI(data.list);
        } catch (error) {
            console.error("Error fetching weather:", error);
            showError(`Error: ${error.message}. Please check city or API key.`);
        } finally {
            showLoader(false);
        }
    };
    
    const getWeatherByCoords = (lat, lon) => {
        if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
            showError("Please add your OpenWeatherMap API key.");
            showLoader(false);
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
        fetchWeatherData(url);
    };

    const getWeatherByCity = (city) => {
        if (!city) return;
        if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
            showError("Please add your OpenWeatherMap API key.");
            showLoader(false);
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${currentUnit}`;
        fetchWeatherData(url);
    };

    const updateCurrentWeatherUI = (currentData, cityInfo) => {
        if (timeInterval) clearInterval(timeInterval);
        const timezoneOffset = cityInfo.timezone; 
    
        const updateLocalTime = () => {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const localTime = new Date(utc + (timezoneOffset * 1000));
            elements.currentTime.textContent = localTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            elements.currentDate.textContent = localTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        };
        updateLocalTime();
        timeInterval = setInterval(updateLocalTime, 1000);

        const tempUnit = currentUnit === 'metric' ? '&deg;C' : '&deg;F';
        const windUnit = currentUnit === 'metric' ? 'km/h' : 'mph';
        const windSpeed = currentUnit === 'metric' ? (currentData.wind.speed * 3.6).toFixed(1) : currentData.wind.speed.toFixed(1);

        elements.cityName.textContent = `${cityInfo.name}, ${cityInfo.country}`;
        elements.temperature.innerHTML = `${Math.round(currentData.main.temp)}${tempUnit}`;
        elements.weatherDescription.textContent = currentData.weather[0].description;
        elements.humidity.textContent = `${currentData.main.humidity}%`;
        elements.windSpeed.textContent = `${windSpeed} ${windUnit}`;
        
        const mainWeather = currentData.weather[0].main;
        const iconKey = weatherIconMap[mainWeather] || "Default";
        elements.weatherIcon.innerHTML = iconSVG[iconKey];
        updateSuggestions(mainWeather, currentData.main.temp);
    };

    const updateForecastUI = (forecastList) => {
        elements.forecastContainer.innerHTML = '';
        const dailyForecasts = forecastList.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
        
        dailyForecasts.forEach(day => {
            const tempUnit = currentUnit === 'metric' ? '&deg;C' : '&deg;F';
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const mainWeather = day.weather[0].main;
            const iconKey = weatherIconMap[mainWeather] || "Default";
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card animate-fade-in';
            forecastCard.innerHTML = `
                <p class="font-semibold">${dayName}</p>
                <div>${iconSVG[iconKey]}</div>
                <p class="font-bold">${Math.round(day.main.temp)}${tempUnit}</p>
                <p class="forecast-desc">${day.weather[0].description}</p>
            `;
            elements.forecastContainer.appendChild(forecastCard);
        });
    };

    const updateSuggestions = (weather, temp) => {
        let suggestions = weatherSuggestions[weather] || weatherSuggestions.Default;
        let tempInCelsius = (currentUnit === 'imperial') ? (temp - 32) * 5/9 : temp;

        if (tempInCelsius > 32) {
            suggestions = [weatherSuggestions.Extreme[0], ...suggestions];
        } else if (tempInCelsius < 0) {
             suggestions = [weatherSuggestions.Extreme[1], ...suggestions];
        }
        elements.suggestionsContainer.innerHTML = '';
        suggestions.slice(0, 3).forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'suggestion-item animate-fade-in';
            div.innerHTML = `<span>${suggestion.emoji}</span><span>${suggestion.text}</span>`;
            elements.suggestionsContainer.appendChild(div);
        });
    };

    const showLoader = (isLoading) => {
        elements.loader.classList.toggle('hidden', !isLoading);
    };

    const showError = (message) => {
        if (message) {
            elements.errorMessage.textContent = message;
            elements.errorMessage.classList.remove('hidden');
        } else {
            elements.errorMessage.classList.add('hidden');
        }
    };

    const toggleUnits = () => {
        currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
        elements.unitToggle.innerHTML = currentUnit === 'metric' ? '&deg;C' : '&deg;F';

        const currentCity = elements.cityName.textContent;
        if (currentCity && currentCity !== '--') {
            getWeatherByCity(currentCity.split(',')[0]);
        }
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            showLoader(true);
            navigator.geolocation.getCurrentPosition(
                (position) => getWeatherByCoords(position.coords.latitude, position.coords.longitude),
                (error) => {
                    showLoader(false);
                    if (error.code === error.PERMISSION_DENIED) {
                        showError("Location access denied. Please enable it or search for a city.");
                    } else {
                        showError("Could not get your location. Please use the search bar.");
                    }
                    console.warn("Geolocation error:", error.message);
                }
            );
        } else {
            showError("Geolocation is not supported. Please search for a city.");
            console.warn("Geolocation not supported.");
        }
    };

    const setupThemeToggle = () => {
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                elements.themeToggle.innerHTML = sunIcon;
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                elements.themeToggle.innerHTML = moonIcon;
            }
        };

        elements.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
        });

        const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode
        applyTheme(savedTheme);
    };

    elements.citySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getWeatherByCity(e.target.value);
    });

    elements.unitToggle.addEventListener('click', toggleUnits);
    elements.locationBtn.addEventListener('click', handleGetCurrentLocation);

    const init = () => {
        setupThemeToggle();
    };

    init();
});

