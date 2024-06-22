document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("keyup", focusText, false);

var consol = document.getElementById("console");
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
        <b>phthallo@hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>`

function focusText(e) {
    var keyCode = e.keyCode;
    if(keyCode==13){
        var text = consol.querySelector("div:last-child .text-input");
        console.log(text);
        text.focus();
    }
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 13){ 
        if (!((document.activeElement.textContent).trim())){ // If enter is being pressed when the editable field is empty
            e.preventDefault();
        } else if (document.activeElement.isContentEditable) {
            const textField = document.activeElement;
            textField.setAttribute("contenteditable", false);
            e.preventDefault();
            parseTextInput(textField.innerText);
            console.log("Enter key was pressed while cursor was inside an editable text field!");
        }
        }
}
function parseTextInput(text){
    [command, parameter] = text.split(" ");
    console.log(`Command is ${command}`)
    console.log(`Parameter is ${parameter}`)
    if (command=="cat"){
        cat(parameter);
    } else if (command=="ls") {
        ls();
    } else if (command=="rm"){
        terminalOutput(`rm: cannot perform '${text}': Permission denied<p>`);
    } else if (command=="sudo") {
        terminalOutput(`<img src=assets/hk.png width=45%></img><p>`);
    } else if (command=="help") {
        help();
    } else {
        terminalOutput(`-bash: ${text}: command not found<p>`);
    }
}

function cat(file){
    if ((["about_me", "contacts",  "projects"].includes(file))){
        fetch(`files/${file}.html`)
        .then((res => res.text()))
        .then((text) => {
            terminalOutput(text);
        });
    } else if (!(file)){
        terminalOutput(`cat: missing file operand<p>`)
    } else {
        terminalOutput(`${file}: No such file or directory<p>`)
    }
}

function ls(){
    terminalOutput("<p>about_me  contacts  projects<p>");
}

function help(){
    terminalOutput(`<p>Some other commands you might want to try are:<p>
        <b>ls:</b> list all files.<p>
        <b>cat [filename]:</b> read a file.<p>
        There might be more ;)`)
}

function terminalOutput(output){
    prompt =  `<span class = "console-input">
        <b>phthallo@hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>
    </span>`
    consol.innerHTML += ('<div id = "">' + output + '</div>');
    consol.innerHTML  += ('<div id = "">' + prompt + '</div>');
}