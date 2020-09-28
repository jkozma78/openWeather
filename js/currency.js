const validUrl2 = "https://api.exchangeratesapi.io/latest?base=EUR";
let selectElement = document.querySelector("#currency");
let tempData = {};
let valutanevek = { CAD: "kanadai dollár", HKD: "hong kong-i dollár", ISK: "izlandi korona", PHP: "fülöp-szigeteki peso", DKK: "dán korona", HUF: "magyar forint", CZK: "cseh korona", AUD: "ausztrál dollár", RON: "román leu", SEK: "svéd korona", IDR: "indonéz rúpia", INR: "indiai rupia", BRL: "brazíl reál", RUB: "orosz rubel", HRK: "horvát kuna", JPY: "japán jen", THB: "thai baht", CHF: "svájci frank", SGD: "szingapúri dollár", PLN: "lengyel zlotyi", BGN: "bolgár leva", TRY: "török líra", CNY: "kínai jüan", NOK: "norvég korona", NZD: "új-zélandi dollár", ZAR: "dél-afrikai rand", USD: "amerikai dollár", MXN: "mexikói peso", ILS: "izraeli shekel", GBP: "brit font", KRW: "észak-koreai won", MYR: "malajziai ringgit" };

let fetchInit2 = {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
};

fetch(validUrl2, fetchInit2).then(
    data => data.json(),
    err => console.error(err)
).then(
    datr => {
        for (let currency in datr.rates) {
            document.querySelector("#info").innerHTML="A legfrissebb "+`<i class="fas fa-euro-sign"></i>` + " árfolyamok ("+datr.date+")";
            appendOptions(currency);
            createData(currency, datr.rates[currency]);
            calculate();
        };
    },
    err => console.log(error)
);

function appendOptions(currency) {
    let option = document.createElement("option");
    if (currency == "HUF") {
        option.setAttribute("selected", "");
    }
    option.innerHTML = valutanevek[currency];
    option.setAttribute("value", currency);
    selectElement.appendChild(option);
};

selectElement.addEventListener("change", calculate);

function calculate() {
    document.querySelector("#weather").innerHTML = "1 " + `&#8364` + "=" + tempData[document.getElementById("currency").value] + " " + document.getElementById("currency").value;
};

function createData(currency, ertek) {
    tempData[currency] = ertek;
};
