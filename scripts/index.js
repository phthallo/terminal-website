var consol = document.getElementById("console");

window.setInterval(function() {
    var elem = consol;
    elem.scrollTop = elem.scrollHeight;
  }, 5000);

function genTimestamp() {
    time = new Date();
    hours = String(time.getHours()).padStart(2, '0');
    minutes = String(time.getMinutes()).padStart(2, '0');
    seconds = String(time.getSeconds()).padStart(2, '0');
    return (`(${hours}:${minutes}:${seconds})`)
}

timeOnLoad = new Date();

setInterval(function checkTime() {
    nowTime = new Date();
    upTime = Math.floor((nowTime - timeOnLoad)/60000);
    if (upTime == 1){
        document.querySelector("#uptime").innerText = upTime + " min";
    } else {
        document.querySelector("#uptime").innerText = upTime + " mins";
    }
    return checkTime;
  }(), 60000);

function funFact() {
    fetch(`assets/facts.html`)
    .then((res => res.text()))
    .then((text) => {
        allFacts = (text.split("\r\n"));
        document.querySelector("#funfact").innerHTML = allFacts[Math.floor(Math.random()*allFacts.length)]
});}

funFact();
consol.querySelector("#l1 .console-input").innerHTML = `
        <b>phthallo</b>@<b>hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>`

    
