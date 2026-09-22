/*===========
   SKYLINE — a tiny vanilla-JS weather app

   Data: 2026
   Open-Meteo
   No API key required.=========== */


/*   DOM HELPERS*/

const $ = (selector) => document.querySelector(selector);

const content = $("#content");
const cityInput = $("#cityInput");


/*   APP STATE*/

let unit = "C";

let lastData = null;


/*   WEATHER CODES*/

const WEATHER = {
    0: {
        label: "clear sky",
        icon: "sun"
    },

    1: {
        label: "mostly clear",
        icon: "sun-cloud"
    },

    2: {
        label: "partly cloudy",
        icon: "sun-cloud"
    },

    3: {
        label: "overcast",
        icon: "cloud"
    },

    45: {
        label: "foggy",
        icon: "fog"
    },

    48: {
        label: "icy fog",
        icon: "fog"
    },

    51: {
        label: "light drizzle",
        icon: "rain"
    },

    53: {
        label: "drizzle",
        icon: "rain"
    },

    55: {
        label: "heavy drizzle",
        icon: "rain"
    },

    56: {
        label: "freezing drizzle",
        icon: "rain"
    },

    57: {
        label: "freezing drizzle",
        icon: "rain"
    },

    61: {
        label: "light rain",
        icon: "rain"
    },

    63: {
        label: "rain",
        icon: "rain"
    },

    65: {
        label: "heavy rain",
        icon: "rain"
    },

    66: {
        label: "freezing rain",
        icon: "rain"
    },

    67: {
        label: "freezing rain",
        icon: "rain"
    },

    71: {
        label: "light snow",
        icon: "snow"
    },

    73: {
        label: "snow",
        icon: "snow"
    },

    75: {
        label: "heavy snow",
        icon: "snow"
    },

    77: {
        label: "snow grains",
        icon: "snow"
    },

    80: {
        label: "rain showers",
        icon: "rain"
    },

    81: {
        label: "rain showers",
        icon: "rain"
    },

    82: {
        label: "violent showers",
        icon: "rain"
    },

    85: {
        label: "snow showers",
        icon: "snow"
    },

    86: {
        label: "snow showers",
        icon: "snow"
    },

    95: {
        label: "thunderstorm",
        icon: "storm"
    },

    96: {
        label: "thunder + hail",
        icon: "storm"
    },

    99: {
        label: "thunder + hail",
        icon: "storm"
    }
};


function weatherInfo(code) {
    return WEATHER[code] || {
        label: "unsettled",
        icon: "cloud"
    };
}


/*   SKY BACKGROUND*/

function skyFor(icon, isDay) {

    const skies = {

        sun: {
            day: ["#79acdd", "#cfe7f7"],
            night: ["#0b1b3a", "#24345c"]
        },

        "sun-cloud": {
            day: ["#8fb4dd", "#dce8f2"],
            night: ["#16223e", "#2c3a5c"]
        },

        cloud: {
            day: ["#93a5b8", "#dfe5ea"],
            night: ["#232c3a", "#3a4658"]
        },

        fog: {
            day: ["#a9afb5", "#dde1e4"],
            night: ["#2c2f34", "#454a51"]
        },

        rain: {
            day: ["#5c7286", "#93a6b6"],
            night: ["#1c2733", "#354254"]
        },

        snow: {
            day: ["#c3d3e0", "#eef4f9"],
            night: ["#2a3242", "#464f63"]
        },

        storm: {
            day: ["#3b4051", "#6a6f82"],
            night: ["#15161f", "#35384a"]
        }

    };

    const pick = skies[icon] || skies.cloud;

    const [a, b] = isDay
        ? pick.day
        : pick.night;

    const textColor = isDay
        ? "#16233a"
        : "#eef2f8";

    return {
        a,
        b,
        textColor
    };
}


function applySky(icon, isDay) {

    const {
        a,
        b,
        textColor
    } = skyFor(icon, isDay);

    document.documentElement.style.setProperty(
        "--sky-a",
        a
    );

    document.documentElement.style.setProperty(
        "--sky-b",
        b
    );

    document.documentElement.style.setProperty(
        "--text-on-sky",
        textColor
    );
}


/*   WEATHER ICONS*/

function iconSvg(kind) {

    const icons = {

        sun: `
      <svg viewBox="0 0 100 100">
        <g
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="#f6c343"
            stroke="#e8a93a"
          />

          <path d="
            M50 10v10
            M50 80v10
            M10 50h10
            M80 50h10
            M22 22l7 7
            M71 71l7 7
            M78 22l-7 7
            M29 71l-7 7
          "/>
        </g>
      </svg>
    `,

        "sun-cloud": `
      <svg viewBox="0 0 100 100">

        <circle
          cx="38"
          cy="34"
          r="15"
          fill="#f6c343"
          stroke="#e8a93a"
          stroke-width="3"
        />

        <path
          d="
            M20 68
            c-8 0-14-6-14-13
            c0-6 5-12 12-13
            c2-9 10-15 19-15
            c10 0 18 7 20 16
            c7 1 12 7 12 14
            c0 8-7 14-15 14
            H20z
          "
          fill="#f4f7fa"
          stroke="#c7d0da"
          stroke-width="3"
          stroke-linejoin="round"
        />

      </svg>
    `,

        cloud: `
      <svg viewBox="0 0 100 100">

        <path
          d="
            M24 72
            c-10 0-17-7-17-16
            c0-8 6-14 14-16
            c2-11 12-19 24-19
            c12 0 22 9 24 20
            c9 1 15 8 15 17
            c0 9-8 16-18 16
            H24z
          "
          fill="#e7edf3"
          stroke="#adb9c6"
          stroke-width="3"
          stroke-linejoin="round"
        />

      </svg>
    `,

        rain: `
      <svg viewBox="0 0 100 100">

        <path
          d="
            M24 58
            c-10 0-17-7-17-16
            c0-8 6-14 14-16
            c2-11 12-19 24-19
            c12 0 22 9 24 20
            c9 1 15 8 15 17
            c0 9-8 16-18 16
            H24z
          "
          fill="#d7e0e8"
          stroke="#9aa8b6"
          stroke-width="3"
          stroke-linejoin="round"
        />

        <g
          stroke="#5c7286"
          stroke-width="4"
          stroke-linecap="round"
        >
          <path d="M30 76l-5 12"/>
          <path d="M50 76l-5 12"/>
          <path d="M70 76l-5 12"/>
        </g>

      </svg>
    `,

        snow: `
      <svg viewBox="0 0 100 100">

        <path
          d="
            M24 58
            c-10 0-17-7-17-16
            c0-8 6-14 14-16
            c2-11 12-19 24-19
            c12 0 22 9 24 20
            c9 1 15 8 15 17
            c0 9-8 16-18 16
            H24z
          "
          fill="#eaf1f7"
          stroke="#b9c8d6"
          stroke-width="3"
          stroke-linejoin="round"
        />

        <g fill="#8fa8c0">
          <circle cx="28" cy="80" r="3.5"/>
          <circle cx="50" cy="86" r="3.5"/>
          <circle cx="72" cy="80" r="3.5"/>
        </g>

      </svg>
    `,

        fog: `
      <svg viewBox="0 0 100 100">

        <path
          d="
            M28 44
            c-9 0-15-6-15-14
            c0-7 5-12 12-14
            c2-9 10-15 19-15
            c9 0 17 6 19 14
            c8 1 13 7 13 14
            c0 8-7 14-16 14
            H28z
          "
          fill="#dde1e4"
          stroke="#a7adb2"
          stroke-width="3"
          stroke-linejoin="round"
        />

        <g
          stroke="#8b9199"
          stroke-width="4.5"
          stroke-linecap="round"
        >
          <path d="M16 66h68"/>
          <path d="M22 80h56"/>
          <path d="M30 94h40"/>
        </g>

      </svg>
    `,

        storm: `
      <svg viewBox="0 0 100 100">

        <path
          d="
            M24 52
            c-10 0-17-7-17-16
            c0-8 6-14 14-16
            c2-11 12-19 24-19
            c12 0 22 9 24 20
            c9 1 15 8 15 17
            c0 9-8 16-18 16
            H24z
          "
          fill="#6a6f82"
          stroke="#4b4f5f"
          stroke-width="3"
          stroke-linejoin="round"
        />

        <path
          d="
            M54 58
            l-14 20
            h10
            l-8 18
            l22-24
            H54
            l10-14
            z
          "
          fill="#f6c343"
          stroke="#d99f2c"
          stroke-width="2.5"
          stroke-linejoin="round"
        />

      </svg>
    `

    };

    return icons[kind] || icons.cloud;
}


/*   TEMPERATURE FORMATTING*/

function fmtTemp(celsius) {

    const value = unit === "C"
        ? celsius
        : celsius * 9 / 5 + 32;

    return Math.round(value);
}


/*   RENDER*/

function render() {

    if (!lastData) {
        return;
    }

    const {
        place,
        current,
        daily,
        isDay
    } = lastData;

    const info = weatherInfo(
        current.weather_code
    );

    applySky(
        info.icon,
        isDay
    );


    /*       Day names*/

    const dayNames = daily.time.map(
        (iso, index) => {

            if (index === 0) {
                return "today";
            }

            const date = new Date(
                iso + "T00:00:00"
            );

            return date
                .toLocaleDateString(
                    undefined,
                    {
                        weekday: "short"
                    }
                )
                .toLowerCase();
        }
    );


    /*       Forecast*/

    const forecastHtml = daily.time
        .map((iso, index) => {

            const dInfo = weatherInfo(
                daily.weather_code[index]
            );

            return `
        <div class="fday">

          <div class="dname">
            ${dayNames[index]}
          </div>

          ${iconSvg(dInfo.icon)}

          <div class="frange">
            <b>
              ${fmtTemp(
                daily.temperature_2m_max[index]
            )}°
            </b>

            <span class="lo">
              ${fmtTemp(
                daily.temperature_2m_min[index]
            )}°
            </span>
          </div>

        </div>
      `;
        })
        .join("");


    /*       Main content */

    content.innerHTML = `

    <main>

      <div>

        <p class="place">
          ${place.name}

          <span class="dot">·</span>

          ${place.country}
        </p>


        <div class="temp-row">

          <div class="temp-big">
            ${fmtTemp(
        current.temperature_2m
    )}
          </div>

          <div class="temp-unit">
            °${unit}
          </div>

        </div>


        <p class="condition">
          ${info.label},
          feels like
          ${fmtTemp(
        current.apparent_temperature
    )}°
        </p>


        <div class="meta-line">

          <div>
            <b>
              ${Math.round(
        current.relative_humidity_2m
    )}%
            </b>

            <small>
              humidity
            </small>
          </div>


          <div>
            <b>
              ${Math.round(
        current.wind_speed_10m
    )} km/h
            </b>

            <small>
              wind
            </small>
          </div>


          <div>
            <b>
              ${fmtTemp(
        daily.temperature_2m_max[0]
    )}°
              /
              ${fmtTemp(
        daily.temperature_2m_min[0]
    )}°
            </b>

            <small>
              today's range
            </small>
          </div>

        </div>

      </div>


      <div class="illustration">
        ${iconSvg(info.icon)}
      </div>

    </main>


    <div class="forecast">

      <h2>
        next few days
      </h2>

      <div class="forecast-row">
        ${forecastHtml}
      </div>

    </div>


    <footer>

      <span>
        data from open-meteo.com
      </span>

      <span>
        last checked
        ${new Date().toLocaleTimeString(
        undefined,
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    )}
      </span>

    </footer>
  `;
}


/*   GEOCODING*/

async function geocode(cityName) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(cityName)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;

    const response = await fetch(url);

    const data = await response.json();

    if (
        !data.results ||
        data.results.length === 0
    ) {
        return null;
    }

    const result = data.results[0];

    return {
        name: result.name,
        country: result.country || "",
        lat: result.latitude,
        lon: result.longitude
    };
}


/*   WEATHER API*/

async function fetchWeather(lat, lon) {

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current=` +
        `temperature_2m,` +
        `relative_humidity_2m,` +
        `apparent_temperature,` +
        `weather_code,` +
        `wind_speed_10m,` +
        `is_day` +
        `&daily=` +
        `weather_code,` +
        `temperature_2m_max,` +
        `temperature_2m_min` +
        `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "weather fetch failed"
        );
    }

    return response.json();
}


/*   LOAD CITY*/

async function loadCity(cityName) {

    content.innerHTML = `
    <div class="status">
      finding ${cityName}…
    </div>
  `;

    try {

        const place = await geocode(
            cityName
        );

        if (!place) {

            content.innerHTML = `
        <div class="status error">
          couldn't find "${cityName}"
          — try a bigger nearby city?
        </div>
      `;

            return;
        }

        await loadCoords(
            place.lat,
            place.lon,
            place.name,
            place.country
        );

        localStorage.setItem(
            "skyline-last-city",
            cityName
        );

    } catch (error) {

        console.error(error);

        content.innerHTML = `
      <div class="status error">
        something went sideways
        fetching the weather.
        try again in a sec.
      </div>
    `;
    }
}


/*   LOAD COORDINATES*/

async function loadCoords(
    lat,
    lon,
    name,
    country
) {

    content.innerHTML = `
    <div class="status">
      checking the sky…
    </div>
  `;

    const data = await fetchWeather(
        lat,
        lon
    );

    lastData = {

        place: {
            name: name || "your spot",
            country: country || ""
        },

        current: data.current,

        daily: data.daily,

        isDay:
            data.current.is_day === 1
    };

    render();
}


/*   SEARCH EVENTS*/

$("#searchBtn").addEventListener(
    "click",
    () => {

        const value =
            cityInput.value.trim();

        if (value) {
            loadCity(value);
        }
    }
);


cityInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Enter") {
            return;
        }

        const value =
            cityInput.value.trim();

        if (value) {
            loadCity(value);
        }
    }
);


/*   GEOLOCATION*/

$("#locateBtn").addEventListener(
    "click",
    () => {

        if (!navigator.geolocation) {

            content.innerHTML = `
        <div class="status error">
          your browser won't share
          location — try searching
          a city instead.
        </div>
      `;

            return;
        }

        content.innerHTML = `
      <div class="status">
        locating you…
      </div>
    `;


        navigator.geolocation.getCurrentPosition(

            (position) => {

                loadCoords(
                    position.coords.latitude,
                    position.coords.longitude,
                    "your location",
                    ""
                );

            },

            () => {

                content.innerHTML = `
          <div class="status error">
            couldn't get your location
            — mind searching a city instead?
          </div>
        `;

            }

        );
    }
);


/*   UNIT TOGGLE*/

$("#unitC").addEventListener(
    "click",
    () => {

        unit = "C";

        toggleUnitButtons();

        render();
    }
);


$("#unitF").addEventListener(
    "click",
    () => {

        unit = "F";

        toggleUnitButtons();

        render();
    }
);


function toggleUnitButtons() {

    $("#unitC").classList.toggle(
        "active",
        unit === "C"
    );

    $("#unitF").classList.toggle(
        "active",
        unit === "F"
    );
}


/*   INIT*/

const savedCity =
    localStorage.getItem(
        "skyline-last-city"
    );

loadCity(
    savedCity || "Berlin"
);