let appId = "bbb5cfc3ac08d0c85c9a045aea566854";
let units = "metric";
let lang = "hu";
let lat = "47.5";
let lon = "19.08333"
let latLon = [47.5, 19.08];
getLocation();

let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon[0] + "&lon=" + latLon[1] + "&appid=" + appId + "&units=" + units + "&lang=" + lang;

function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        data => data.json(),
        err => console.error(err)
    );
}

getServerData(url).then(
    data => {
        console.log(data)
        weatherObj = data;
        createWeather();
    }


);

function getLocation() {
    if (navigator.geolocation != "") {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {
    console.log("hello");
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
    latLon = [position.coords.latitude, position.coords.longitude]
    return latLon
};


function createWeather() {

    let rain = 0;
    for (let r in weatherObj.minutely) {
        rain = rain + weatherObj.minutely[r].precipitation
    };

    document.querySelector("#alert").innerHTML=weatherObj.alerts[0].event
    
    document.querySelector("h1").innerHTML = getTimeFromEpox(weatherObj.current.dt);
    document.querySelector("h4").innerHTML = "A következő órában várható eső: " + rain.toFixed(1) + " mm";
    //document.querySelector(".card").innerHTML = weatherObj.alerts[0].description

    let ikon = document.querySelector(".icon");
    let attr = ("img/openweather/" + weatherObj.current.weather[0].icon + "@2x.png");
    ikon.setAttribute("src", attr);
    ikon.setAttribute("title", weatherObj.current.weather[0].description)

    let a = document.querySelector("#temp");
    a.innerHTML = weatherObj.timezone + " " + weatherObj.current.temp.toFixed() + `&#8451`;

    let b = document.querySelector("#sunrise");
    let sunriseHour = new Date(weatherObj.current.sunrise * 1000).getHours();
    sunriseHour = frontZero(sunriseHour);
    let sunriseMinute = new Date(weatherObj.current.sunrise * 1000).getMinutes();
    sunriseMinute = frontZero(sunriseMinute);
    b.innerHTML = "Napkelte:" + " " + sunriseHour + ":" + sunriseMinute;

    let c = document.querySelector("#sunset");
    let sunsetHour = new Date(weatherObj.current.sunset * 1000).getHours();
    sunsetHour = frontZero(sunsetHour);
    let sunsetMinute = new Date(weatherObj.current.sunset * 1000).getMinutes();
    sunsetMinute = frontZero(sunsetMinute);
    c.innerHTML = "Napnyugta:" + " " + sunsetHour + ":" + sunsetMinute;
};


function getTimeFromEpox(epoxTime) {
    epoxTime = new Date(epoxTime * 1000);
    hours = frontZero(epoxTime.getHours());
    minutes = frontZero(epoxTime.getMinutes());
    regionalTime = hours + ":" + minutes;
    return regionalTime
};

function frontZero(time) {
    if (time < 10) {
        time = "0" + time
    };
    return time;
};

