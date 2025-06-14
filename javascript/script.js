function getWeather() {

    const apikey = '22eec03a2dfc87a5640a9dfd0fe2efe1'
    const city = document.getElementById(`city`).value;

    if (!city) {
        alert ("please enter city name")
        return;
    }

    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const foreCast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch (currentWeather)
    .then(response => response.json())
    .then (data => {
        displayWeather(data);
    })

    .catch (error => {
        console.error ("there was an error happend while fetching weather")
        alert ("there was an error happend while fetching weather, please try again")
    })

    fetch(foreCast)
    .then(response => response.json())
    .then(data => {
        hourlyForacast(data.list);
    })
}

function displayWeather(data) {
    const tempInfo = document.getElementById (`temp-div`)
    const weatherInfo = document.getElementById (`weather-info`)
    const weatherIcon = document.getElementById (`weather-icon`)
    const hourlyForacastdiv = document.getElementById (`hourly-forecast`)

    tempInfo.innerHTML = ``;
    weatherInfo.innerHTML = ``;
    hourlyForacastdiv.innerHTML = ``;

    if (data.cod === `404`) {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }else {
        const cityName = data.name;
        const tempeture = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempetureHtml =`
        <p>${tempeture}°C</p>
        `

        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
        `

        tempInfo.innerHTML = tempetureHtml;
        weatherInfo.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        
        showImg ()
    }
}

function hourlyForacast(hourlyData){
    const hourlyForacast = document.getElementById (`hourly-forecast`);
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item => {

        const timeDate = new Date(item.dt * 1000);
        const hour = timeDate.getHours();
        const tempeture = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
        const hourlyItem = `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${tempeture}°C</span>
        </div>
        `;
        hourlyForacast.innerHTML += hourlyItem
    });
}

function showImg () {
    const weatherIcon = document.getElementById (`weather-icon`)
    weatherIcon.style.display = `block`;
}