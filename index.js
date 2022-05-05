'use strict'

// const weatherBlock = document.
const weatherBlock = document.querySelector('#weather')

async function loadWeather(e) {
    weatherBlock.innerHTML = `
        <div class="weather__loading">
            <img src="loaders/loader3.gif" alt="Loading...">
        </div>`;
        
    const server = 'https://api.openweathermap.org/data/2.5/weather?units=matric&q=Kyiv&appid=13b6f5d409a93e71b1119f3dddbef5cf';
    const response = await fetch(server, {
        method: 'GET',
    });
     
    const responseResult = await response.json();
     
    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.messege;
    }
}

function getWeather(data) {
    // обробляємо та виводимо дані
    console.log(data);
    
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;
        
    const template = `
    <div calss="weather__header" id="weather__header">
        <div class="weather__main">
            <div class="weather__city">${location}</div>
                <div class="weather__status">${weatherStatus}</div>
            </div>
            <div class="weather__icon">
                <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__fell-like">Fells like: ${feelsLike}</div>
    </div>
    `
    
    weatherBlock.innerHTML = template;
}


if (weatherBlock) {
    loadWeather();
}