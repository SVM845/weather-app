# 🌤️ Skyline

A small, minimal weather app built with **HTML, CSS, and vanilla JavaScript**.

Search for a city, check the current weather, see the upcoming forecast, switch between Celsius and Fahrenheit, or use your current location.

No backend. No framework. No API key.

## ✨ Features

* 🌍 Search weather by city
* 📍 Use browser geolocation
* 🌡️ Current temperature
* 🤒 Feels-like temperature
* 💧 Humidity
* 💨 Wind speed
* 📅 Multi-day forecast
* °C / °F temperature toggle
* 🌙 Different visuals for day and night
* 🎨 Weather-based background gradients
* ☁️ Custom weather illustrations
* 💾 Remembers your last searched city
* 📱 Responsive design
* ♿ Respects reduced-motion preferences

## 🛠️ Built With

* HTML5
* CSS3
* Vanilla JavaScript
* Open-Meteo API
* Geolocation API
* LocalStorage
* Google Fonts

## 📁 Project Structure

```text
skyline/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    └── script.js
```

## 🌦️ Weather Data

Weather data comes from **Open-Meteo**.

The app uses:

* Geocoding API for finding cities
* Forecast API for current weather
* WMO weather codes for weather conditions

Open-Meteo doesn't require an API key for this project.

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/skyline.git
```

Go into the project:

```bash
cd skyline
```

Then open `index.html` in your browser.

For the best development experience, use a local server such as **VS Code Live Server**.

## 📍 Location Access

The location button uses the browser's built-in Geolocation API.

Your browser will ask for permission before sharing your location.

If location access isn't available, you can simply search for a city manually.

## 🎨 Design

Skyline intentionally avoids the typical "weather dashboard" look.

Instead of putting everything inside a giant rounded card, the interface uses:

* Asymmetric layout
* Notebook-inspired search controls
* Dashed dividers
* Weather-reactive gradients
* Hand-drawn-style SVG illustrations
* Simple typography
* Subtle grain texture

The goal was to keep the interface feeling like a **small personal weather tool**, rather than another generic dashboard.


## 🔮 Possible Improvements

Some things that could be added later:

* Hourly forecast
* Sunrise and sunset
* Air quality
* More detailed weather information
* Favorite cities
* Weather animations
* Better location naming
* Loading animations
* PWA / installable app support
* Automatic weather refresh

## 📄 License

This project is open source and available under the MIT License.
