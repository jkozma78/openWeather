let c=Math.floor(Math.random()*3);
let warn="";

switch (c) {
    case 0:
        warn="Az olajcsere évente, vagy 10000 km-enként ajánlott!";
        break;
    case 1:
        warn="Az autószereléshez mindenki ért, de jól, csak az LZS Szervíz!";
        break;
    case 2:
        warn="Ne felejtse időben lecserélni gumiabroncsait, figyelje az időjárás előrejelzést!";
        break;
    default: warn="Alapártelmezett szöveg";
        
}

document.querySelector(".info").innerHTML=warn;

let users=[
    {name:"Person1", age: 21},
    {name:"Person2", age: 24},
    {name:"Person3", age: 61},
    {name:"Person4", age: 19},
    {name:"Person5", age: 41},
    {name:"Person6", age: 23},
];

let table = document.querySelector("#demoTable");
for ( let i = 0; i < users.length; i++ ) {
  let tr = document.createElement("tr");
  for ( let data of Object.values(users[i]) ) {
    let td = document.createElement("td");
    td.innerHTML = data;
    
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

let a=document.createElement("button");
a.setAttribute("class","btn btn-primary")
a.innerHTML="neve";
table.appendChild(a);
let s=document.querySelector("button.btn.btn-primary");
s.addEventListener("click",kattt);

function kattt(){
    alert("katt");
}

// let weather=api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bbb5cfc3ac08d0c85c9a045aea566854
