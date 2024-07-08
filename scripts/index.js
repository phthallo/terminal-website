import { hyfetch } from "./hyfetch.js";
var consol = document.getElementById("console");

window.setInterval(function() {
    var elem = consol;
    elem.scrollTop = elem.scrollHeight;
  }, 2000);

let x = hyfetch();

export function genTimestamp() {
    let time = new Date();
    let hours = String(time.getHours()).padStart(2, '0');
    let minutes = String(time.getMinutes()).padStart(2, '0');
    let seconds = String(time.getSeconds()).padStart(2, '0');
    return (`(${hours}:${minutes}:${seconds})`)
}

let timeOnLoad = new Date();

setInterval(function checkTime() {
    let nowTime = new Date();
    let upTime = Math.floor((nowTime - timeOnLoad)/60000);
    if (upTime == 1){
        document.querySelectorAll(".uptime").innerText = upTime + " min";
    } else {
        document.querySelectorAll(".uptime").innerText = upTime + " mins";
    }
    return checkTime;
  }(), 60000);

export function funFact() {
    return fetch(`assets/facts.html`)
    .then((res => res.text()))
    .then((text) => {
        let allFacts = (text.split("\r\n"));
        let nodes = document.querySelectorAll(".funfact");
        nodes[nodes.length-1].innerHTML = allFacts[Math.floor(Math.random()*allFacts.length)]
        text = allFacts[Math.floor(Math.random()*allFacts.length)];
});}


funFact()
    .then(fact=>console.log(fact))
    .then(finalFact => console.log(finalFact));

consol.querySelector("#l1 .console-input").innerHTML = `
        <b>phthallo</b>@<b>hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>`

