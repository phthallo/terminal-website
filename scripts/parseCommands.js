import { sanitise, onpaste, asciiArt } from "./utils.js";
import { hyfetch } from "./hyfetch.js";
import { genTimestamp, renderFact, checkTime } from "./index.js";

let knight = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠶⠀⠀⠀⠀⠀⣈⣿⣦⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⡿⠋⠀⠀⠀⠀⠀⠹⣿⣿⡆⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣤⣤⣴⣤⣤⣄⠀⢠⣿⣿⠇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⣾⠋⠈⢻⣿⡝⠁⠀⢻⣿⣿⠋⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠈⣿⣄⣠⣿⣿⣧⣀⣠⣿⣿⣿⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⡿⠟⠀⣀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣷⡾⠿⠛⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⡿⠓⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⡀⠀⠀⠀⠀⠀
    ⠀⣰⡟⠉⣼⣿⠟⣡⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀⠀
    ⢠⣿⠀⠀⣿⣿⣾⠿⠛⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡛⠻⠑⡀
    ⠈⣿⠀⡼⢿⡏⠀⠀⠀⠹⣿⡆⠉⠻⣿⣿⣿⣿⣿⡻⢿⣿⠷⠞⠁
    ⠀⢸⠇⠀⠈⡇⠀⠀⠀⠀⠘⢿⡄⠀⠸⡏⠀⠀⠉⡇⠀⠹⢦⡄⠀
    ⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠸⠁⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
var inputHistory = [""]
var currentPos = -1
var prideActivated = false
var voidActivated = false
document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("keyup", focusText, false);
document.addEventListener("paste", onpaste, false);

var consol = document.getElementById("console");

function focusText(e) {
    var keyCode = e.keyCode;
    if(keyCode==13){
        var text = consol.querySelector("div:last-child .text-input");
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
            currentPos = -1
            inputHistory.splice(inputHistory.length-1, 0, textField.innerText)
            parseTextInput(textField.innerText);
        }
    } 
    var latestTextField = consol.querySelector("div:last-child .text-input");
    if (keyCode == 38){
        e.preventDefault();
        currentPos --
        if (typeof inputHistory[inputHistory.length + currentPos] !== "undefined"){
            latestTextField.textContent = inputHistory[inputHistory.length + currentPos]
        } else {
            currentPos ++
        }
    } 
    if (keyCode == 40){
        e.preventDefault();
        currentPos ++
        if (typeof inputHistory[inputHistory.length + currentPos] !== "undefined"){
            latestTextField.textContent = inputHistory[inputHistory.length + currentPos]
        } else {
            currentPos --
}
    }

}

function parseTextInput(tex){
    var text = sanitise(tex);
    var [command, parameter] = text.split(" ");
    switch(command) {
        case "cat":
            cat(parameter);
            break;
        case "ls":
            ls();
            break;
        case "rm":
            terminalOutput(`rm: cannot perform '${text}': Permission denied<p>`);
            break;
        case "sudo":
            terminalOutput(`<img class="post-content" src="assets/hk.png"></img>`);
            break;
        case "clear":
            terminalOutput("clear", true);
            break;
        case "help":
            help();
            break;
        case "hyfetch":
            let localReplace = true;
            if (prideActivated){
                var localFlagColours = ['#9b4b4b','#ac8453','#aca653','#2b5a37','#536eac','#55305a'];
            } 
            if (voidActivated) {
                var localFlagAscii = knight;
            }
            let themed = hyfetch({distroAscii: localFlagAscii, flagColours: localFlagColours, replace: localReplace});
            terminalOutput(`<div class = "hyfetch"><div class = "distro">${(themed[0]).join("")}</div><div class = "specs">${themed[1]}</div>`)
            renderFact();
            checkTime();
            break;
        case "pride":
            hyfetch({flagColours:['#9b4b4b','#ac8453','#aca653','#2b5a37','#536eac','#55305a']});
            prideActivated = true;
            terminalOutput("<p>Happy Pride!</p>");
            break;
        case "rawr":
            let dino = `
               __
              / _)
     _.----._/ /
    /         /
 __/ (  | (  |
/__.-'|_|--|_| 
`
            terminalOutput(asciiArt(dino)+'<a href = "https://github.com/hackclub/dinosaurs?tab=readme-ov-file#hack-club-dinosaurs">Orpheus</a> says hi.<p>');
            break;
        case "pyflagoras":
            pyflagoras(parameter);
            break;
        case "void":
            hyfetch({distroAscii: knight, replace: true})
            voidActivated = true;
            terminalOutput("<p>No voice to cry suffering.</p>");
        break;

        default: 
            terminalOutput(`-bash: ${text}: command not found<p>`);
    }
}

function cat(file){
    if ((["about_me", "contacts",  "projects", "about_site"].includes(file))){
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
    terminalOutput("<p>about_me  contacts  projects  about_site<p>");
}

function help(){
    let commands = {
        "ls": "Lists all files in the current working directory",
        "cat [file]": "Outputs the contents of [file] to the terminal",
        "clear": "Resets the terminal; clears it of all past commands",
        "hyfetch": "Prints system information [<a href = 'https://github.com/hykilpikonna/hyfetch'>neofetch</a> with pride flags <3]"
    }
    let paired = []
    console.log(Object.values(commands))
    for (let i = 0; i < Object.keys(commands).length; i++){
        paired.push(`
        <div class = "project-wrapper">
            <div class= "project-title">
            ${Object.keys(commands)[i]}
            </div>
            <div class = "project-desc">
                ${Object.values(commands)[i]}
                <p>
            </div>
        </div>`)
    }
    console.log(paired)
    terminalOutput(`<hr></hr> ${paired.join("")} <p>There may be more commands ;)`);
}

function pyflagoras(parameter){
    if (!(parameter)){
        terminalOutput(`
usage: pyflagoras [-h] [-f FLAG] [-n NAME] [--verbose] [--svg] [--version] [-l] image<p>
pyflagoras: error: the following arguments are required: image<p>`)
    } else {
        terminalOutput("🏳️‍🌈 Redirecting user to phthallo/pyflagoras... <p>")
        window.location.href = "https://github.com/phthallo/pyflagoras";
    }
}

function terminalOutput(output, clear=false){
    prompt =  `<span class = "console-input">
        <b>phthallo</b>@<b>hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>
    </span>`
    if (clear){
        consol.innerHTML  = ('<div id = "">' + prompt + '</div>');
    } else {
        consol.innerHTML += ('<div id = "">' + output + '</div>');
        consol.innerHTML  += ('<div id = "">' + prompt + '</div>');
    }
}

