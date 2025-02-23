let appId = "bbb5cfc3ac08d0c85c9a045aea566854";
let units = "metric";
let lang = "hu";
let latLon = [47.56, 18.34];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon[0] + "&lon=" + latLon[1] + "&appid=" + appId + "&units=" + units + "&lang=" + lang;

getLocation();


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
};

function getd() {
    getServerData(url).then(
        data => {
            console.log(data)
            weatherObj = data;
            createWeather();
        }


    );
};



function getLocation() {
    if (navigator.geolocation != "")
        navigator.geolocation.getCurrentPosition(showPosition, error);
    else {
        console.log("Geolocation is not supported by this browser.");
        error();
    }
};

function error(errc){
    console.log (errc.message);
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon[0] + "&lon=" + latLon[1] + "&appid=" + appId + "&units=" + units + "&lang=" + lang;
    getd();
};


function showPosition(position) {
    latLon = [position.coords.latitude, position.coords.longitude];
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon[0] + "&lon=" + latLon[1] + "&appid=" + appId + "&units=" + units + "&lang=" + lang;
    accuracy = (position.coords.altitude);
    getd();
};


function createWeather() {
    weatherObj.alerts ? weatherAlerts() : document.querySelector("#alert").innerHTML = "Nincs riasztás";
    foreCast();
    hourly();


    let rain = 0;
    for (let r in weatherObj.minutely) {
        rain = rain + weatherObj.minutely[r].precipitation / 24
    };

    //fok = "rotateZ(" + weatherObj.current.wind_deg + "deg" + ")";
    document.querySelector(".sc").style.transform = "rotateZ(" + weatherObj.current.wind_deg + "deg" + ")";
    document.querySelector(".mn").style.transform = "rotateZ(" + weatherObj.current.wind_deg + "deg" + ")";

    document.querySelector("h1").innerHTML = getTimeFromEpox(weatherObj.current.dt) + " " + latLon;
    document.querySelector("h4").innerHTML = "A következő órában várható csapadékk: " + rain.toFixed(1) + " mm/h";

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

function foreCast() {
    for (let k in weatherObj.daily) {
        bt = document.createElement("div");
        bt.setAttribute("class", "col border rounded border-success");
        document.querySelector("#foreCast").appendChild(bt);
        bt.innerHTML = weatherObj.daily[k].temp.day.toFixed() + `&#8451` + "<br>" + dayNames[new Date(weatherObj.daily[k].dt * 1000).getUTCDay()];
        imgs = document.createElement("img");
        imgs.setAttribute("class", "figure-img img-fluid rounded icon rounded border border-danger data-toggle='tooltip'");
        imgs.setAttribute("src", "img/openweather/" + weatherObj.daily[k].weather[0].icon + "@2x.png")
        bt.appendChild(imgs)
    };
};

function weatherAlerts() {
    document.querySelector("#alert").innerHTML = weatherObj.alerts[0].event
    document.querySelector(".card").innerHTML = weatherObj.alerts[0].description
};

function hourly() {
    for (let k in weatherObj.hourly) {
        bt = document.createElement("div");
        bt.setAttribute("class", "col-1 border rounded border-warning");
        document.querySelector("#hourly").appendChild(bt);
        bt.innerHTML = getTimeFromEpox(weatherObj.hourly[k].dt) + "<br>" + weatherObj.hourly[k].temp.toFixed() + `&#8451`;
        imgs = document.createElement("img");
        imgs.setAttribute("class", "figure-img img-fluid rounded icon rounded border border-danger data-toggle='tooltip'");
        imgs.setAttribute("src", "img/openweather/" + weatherObj.hourly[k].weather[0].icon + "@2x.png")
        bt.appendChild(imgs)
    };
};