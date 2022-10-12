var cityFormEl = document.querySelector('#city-form');
var cityButtonsContainerEL = document.querySelector('#city-buttons-container');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
var APIKey = "b577339e9250e36ef369eb66eef9b999";
var citiesArray; 

document.addEventListener('DOMContentLoaded', loadOldSearchButtons);

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityData(city);
        saveCityName(city);
        loadOldSearchButtons();
        weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
};

function getCityData(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayCity(data);
                    getCoordinates(data.coord.lat, data.coord.lon);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather');
        });

};

function displayCity(data) {
    var todaysWeatherContainerEl = document.createElement('div');
    var cityHeaderEl = document.createElement('h3');

    var icon = "";
    if (data.weather[0].main === "Rain") {
        icon = " 🌧";
    }
    if (data.weather[0].main === "Clear") {
        icon = " 🌞";
    }
    if (data.weather[0].main === "Clouds") {
        icon = " ☁️";
    }
    if (data.weather[0].main === "Snow") {
        icon = " 🌨";
    }
    if (data.weather[0].main === "Thunderstorm") {
        icon = " ⛈️";
    }
    if (data.weather[0].main === "Drizzle") {
        icon = " 🌦";
    }
    if (data.weather[0].main === "Atmosphere") {
        icon = " 🌫";
    }
    ;

    cityHeaderEl.textContent = data.name + " (" + (moment().format("MM/DD/YYYY")) + ") " + data.weather[0].main + icon;

    todaysWeatherContainerEl.classList = 'today-weather-container';
    cityHeaderEl.classList = 'city-header';

    todaysWeatherContainerEl.appendChild(cityHeaderEl);
    weatherContainerEl.appendChild(todaysWeatherContainerEl);

}

function clearPage() {
    weatherContainerEl.textContent = '';
    cityInputEl.value = '';
}

function createCityButton(cityName) {
    var oldCityButtonEl = document.createElement('button');
    oldCityButtonEl.textContent = cityName;
    oldCityButtonEl.classList = 'btn city-button';
    oldCityButtonEl.style = "text-transform: capitalize";
    oldCityButtonEl.dataset.city = cityName;
    cityButtonsContainerEL.appendChild(oldCityButtonEl);
    oldCityButtonEl.addEventListener('click', function() {
        var thisCity = this.getAttribute('data-city');
        clearPage();
        getCityData(thisCity);
    })
}
function getCoordinates(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayCurrentWeather(data);
                    displayFiveDayForecast(data);
                });
            }
        });
}

function displayCurrentWeather(data) {
    var cityHeaderEl = document.querySelector('.city-header');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvIndexEl = document.createElement('p');

    tempEl.textContent = "Temperature: " + data.current.temp + " °F";;
    windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
    humidityEl.textContent = "Humidity: " + data.current.humidity + " %";
    uvIndexEl.textContent = "UV Index: " + data.current.uvi;

    uvIndexEl.classList = 'uv-index'

    cityHeaderEl.appendChild(tempEl);
    cityHeaderEl.appendChild(windEl);
    cityHeaderEl.appendChild(humidityEl);
    cityHeaderEl.appendChild(uvIndexEl);
    changeUviColor(data);
};

function changeUviColor(data) {
    var uvIndexEl = document.querySelector('.uv-index');
    var uvi = data.current.uvi;
    if (uvi < 3) {
        uvIndexEl.style.backgroundColor = 'green';
        uvIndexEl.style.color = "white";
        uvIndexEl.style.width = "10rem";
    }
    if (uvi > 2 && uvi < 6) {
        uvIndexEl.style.backgroundColor = 'yellow';
        uvIndexEl.style.color = "black";
        uvIndexEl.style.width = "10rem";
    }
    if (uvi > 5) {
        uvIndexEl.style.backgroundColor = 'red';
        uvIndexEl.style.color = "white";
        uvIndexEl.style.width = "10rem";
    }
}

function displayFiveDayForecast(data) {
    var fiveDayForecastContainerEl = document.createElement('div');
    var fiveDayHeaderEl = document.createElement('h2');
    var fiveDaysOnlyBoxEl = document.createElement('div');

    fiveDayHeaderEl.textContent = "5 Day Forecast";

    fiveDayForecastContainerEl.classList = 'fiveday-container';
    fiveDayHeaderEl.classList = 'fiveday-header';
    fiveDaysOnlyBoxEl.classList = 'fivedaysonly-box';

    fiveDayForecastContainerEl.appendChild(fiveDayHeaderEl);
    fiveDayForecastContainerEl.appendChild(fiveDaysOnlyBoxEl);
    weatherContainerEl.appendChild(fiveDayForecastContainerEl);

    var dayArray = [0, 1, 2, 3, 4]
    for (var i = 0; i < dayArray.length; i++) {
        var dayContainerEl = document.createElement('div');
        var dateEl = document.createElement('p');  
        var iconEl = document.createElement('p');  
        var tempEl = document.createElement('p');  
        var windEl = document.createElement('p');  
        var humidityEl = document.createElement('p');  

        var icon = "";
        if (data.daily[i].weather[0].main === "Rain") {
            icon = "🌧";
        }
        if (data.daily[i].weather[0].main === "Clear") {
            icon = "🌞";
        }
        if (data.daily[i].weather[0].main === "Clouds") {
            icon = "☁️";
        }
        if (data.daily[i].weather[0].main === "Snow") {
            icon = "🌨";
        }
        if (data.daily[i].weather[0].main === "Thunderstorm") {
            icon = "⛈️";
        }
        if (data.daily[i].weather[0].main === "Drizzle") {
            icon = " 🌦";
        }
        if (data.daily[i].weather[0].main === "Atmosphere") {
            icon = "🌫";
        }
        ;

        var dayForward = "";
        var dayForwardArray = [1, 2, 3, 4, 5]
        dayForward = moment().add((dayForwardArray[i]), 'days').format("MM/DD/YYYY");

        dateEl.textContent = dayForward;
        iconEl.textContent = icon + " " + data.daily[i].weather[0].main;
        tempEl.textContent = "Temp: " + data.daily[i].temp.day + " °F";
        windEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + " %";

        dayContainerEl.classList = 'day-container';

        dayContainerEl.appendChild(dateEl);
        dayContainerEl.appendChild(iconEl);
        dayContainerEl.appendChild(tempEl);
        dayContainerEl.appendChild(windEl);
        dayContainerEl.appendChild(humidityEl);
        fiveDaysOnlyBoxEl.appendChild(dayContainerEl);
    }

}

function saveCityName(city) {
    if (!citiesArray.includes(city.toLowerCase())) {
        citiesArray.push(city.toLowerCase());
        localStorage.setItem('cities', JSON.stringify(citiesArray));
    }
}

function removeChilds(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

function loadOldSearchButtons() {
    removeChilds(cityButtonsContainerEL);
    if (localStorage.getItem('cities') === null) {
        citiesArray = []; 
    }
    else {
        citiesArray = JSON.parse(localStorage.getItem('cities'));
    }
    citiesArray.forEach((city) => createCityButton(city));
}
cityFormEl.addEventListener('submit', formSubmitHandler);