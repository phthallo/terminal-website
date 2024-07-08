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
export function checkTime() {
    let nowTime = new Date();
    let upTime = Math.floor((nowTime - timeOnLoad)/60000);
    if (upTime == 1){
        document.querySelectorAll(".uptime").forEach(x => x.innerText = upTime + " min");
    } else {
        document.querySelectorAll(".uptime").forEach(x => x.innerText = upTime + " mins")
    }
    return checkTime;
}
setInterval(checkTime(), 60000);


export async function funFact() {
    const res = await fetch('assets/facts.html', {});
    const text = await res.text();
    return await (text.split("\r\n"))[Math.floor(Math.random()* (text.split("\r\n")).length)];
}

export async function renderFact() {
    let fact = await (funFact());
    let nodes = document.querySelectorAll(".funfact");
    nodes[nodes.length-1].innerHTML = fact    
}


consol.querySelector("#l1 .console-input").innerHTML = `
        <b>phthallo</b>@<b>hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>`

