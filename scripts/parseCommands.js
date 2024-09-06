import { sanitise, onpaste, asciiArt } from "./utils.js";
import { hyfetch } from "./hyfetch.js";
import { genTimestamp, renderFact, checkTime, autoScroll } from "./index.js";
import * as config from "./config.js";

// commands and their associated actions
export const COMMANDS = {
    "ls": {
        "type": "function",
        "action": ls
        },
    "sudo": {
        "type": "output",
        "action": `<img class="post-content" src="assets/hk.png"></img>`
        },
    "cd": {
        "type": "function",
        "action": cd
        },
    "help": {
        "type": "function",
        "action": help
        },
    "clear": {
        "type": "boolean",
        "action": 0
        },
    "rawr": {
        "type": "function", 
        "action": asciiArt(config.DINO)+'<a href = "https://github.com/hackclub/dinosaurs?tab=readme-ov-file#hack-club-dinosaurs">Orpheus</a> says hi.'
        }, 
    "cat": {
        "type": "function", 
        "action": cat
        },
    "pyflagoras": {
        "type": "function", 
        "action": pyflagoras
        },
    "rm": {
        "type": "function", 
        "action": rm
        },
    "hyfetch": {
        "type": "function", 
        "action": commandHyfetch
        },
    "pride":  {
        "type": "function", 
        "action": pride
        },
    "void":  {
        "type": "function", 
        "action": commandVoid
        }
}



const folderegex = new RegExp("[A-Za-z]+/[^\/]+\.md")

var inputHistory = [""]
var currentPos = -1
var prideActivated = false
var voidActivated = false
var cwd = ""

document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("keyup", focusText, false);
document.addEventListener("paste", onpaste, false);

var consol = document.getElementById("console");


function focusText(e) {
    let keyCode = e.keyCode;
    if(keyCode==13){
        let text = consol.querySelector("div:last-child .console-input .text-input");
        text.focus();
    }
}

function keyDownTextField(e) {
    let keyCode = e.keyCode;
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
    var latestTextField = consol.querySelector("div:last-child .console-input .text-input");
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
    if (!(folderegex.test( tex.split(/ (.+)/)[1]) )){
        var text = sanitise(tex.toLowerCase());
    } else {
        var text = tex.toLowerCase();
    }
    let [command, parameter, _] = text.split(/ (.+)/);
    command = command.trim();
    if (command in COMMANDS){
        if (COMMANDS[command]["type"] == "output"){
            terminalOutput(COMMANDS[command]["action"])
        } else if (COMMANDS[command]["type"] == "boolean")  {
            terminalOutput("", true)
        } else {
            COMMANDS[command]["action"](parameter)
        }
    } else {
        terminalOutput(`-bash: ${text}: command not found`);
    }
}

function ls(){
    let output = ""
    if (config.SUBFOLDERS[cwd].filter((el) => el != "").length){
        output += `<span class = "directory">${config.SUBFOLDERS[cwd].join("</span><span class = 'directory'>")}</span>`
    }
    if (config.FILES[cwd].filter((el) => el != "").length){
        output += ` <span>${config.FILES[cwd].join("</span><span>")}</span>`
    }
    terminalOutput(`<span class = "files">
       ${output}
       </span>`)
}

function cd(path){
    let output = ""
    if (config.FILES[cwd].includes(path)){ // this doesn't account for cd foo/bar/etc but since i don't have any nested subfolders, it's not an issue... for now.
        output = `-bash: cd: ${path}: Not a directory`
    } else if ((path == ".." || path === undefined )){
            cwd = ""
    } else if (config.SUBFOLDERS[cwd].includes(path)) {
            cwd = path
    } else {
        output = `-bash: cd: ${path}: No such file or directory`
    }
    terminalOutput(output);
}


function cat(file){
    let localcwd = cwd + file.substring(0, file.lastIndexOf('/')); 
    let localfile = file.substring(file.lastIndexOf('/')+1);
    if (config.FILES[localcwd] === undefined){
        terminalOutput(`cat: ${file}: No such file or directory`)
    } else if (config.SUBFOLDERS[localcwd].includes(file)){
        terminalOutput(`cat: ${file}: Is a directory`)
    } else if (config.FILES[localcwd].includes(localfile)){
        fetch(`files/${localcwd}/${localfile}`)
        .then((res => res.text()))
        .then((text) => {
            terminalOutput(text);
        });
    } else if (!(file)){
        terminalOutput(`cat: missing file operand`)
    } else {
        // stuff
    }
}

function help(){
    let paired = []
    for (let i = 0; i < Object.keys(COMMANDSHELP).length; i++){
        paired.push(`
        <div class = "project-wrapper">
            <div class= "project-title">
            ${Object.keys(COMMANDSHELP)[i]}
            </div>
            <div class = "project-desc">
                ${Object.values(COMMANDSHELP)[i]}
                <p>
            </div>
        </div>`)
    }
    terminalOutput(`<hr></hr> ${paired.join("")} <p>There may be more commands ;)`);
}

function pyflagoras(parameter){
    if (!(parameter)){
        terminalOutput(`
usage: pyflagoras [-h] [-f FLAG] [-n NAME] [--verbose] [--svg] [--version] [-l] image<p>
pyflagoras: error: the following arguments are required: image`)
    } else {
        terminalOutput("🏳️‍🌈 Redirecting user to phthallo/pyflagoras... ")
        window.location.href = "https://github.com/phthallo/pyflagoras";
    }
}

function rm(parameter){
    terminalOutput(`rm: cannot perform 'rm ${parameter}': Permission denied`)
}

function commandHyfetch(){
    if (prideActivated){
        var fileFlagColours = config.COLOURS;
    } 
    if (voidActivated) {
        var fileFlagAscii = config.KNIGHT;
    }
    let themed = hyfetch({distroAscii: fileFlagAscii, flagColours: fileFlagColours});
    terminalOutput(`<div class = "hyfetch"><div class = "distro">${(themed[0]).join("")}</div><div class = "specs">${themed[1]}</div>`)
    renderFact();
    checkTime();
}

function pride(){
    if (voidActivated){
        var fileFlagAscii = config.KNIGHT;
    }
    hyfetch({distroAscii: fileFlagAscii, flagColours:['#9b4b4b','#ac8453','#aca653','#2b5a37','#536eac','#55305a']});
    prideActivated = true;
    terminalOutput("Happy Pride!");
}

function commandVoid(){
    if (prideActivated){
        var fileFlagColours = config.COLOURS;
    }
    hyfetch({distroAscii: knight, flagColours: fileFlagColours})
    voidActivated = true;
    terminalOutput("No voice to cry suffering.");

}


function terminalOutput(output, clear=false){
    if (cwd){
        var localcwd = "/" + cwd
    } else {
        var localcwd = cwd
    }
    let prompt =  `<div class = "console-input">
        <b>phthallo</b>@<b>hackclub.app</b> <span class = "timestamp">${genTimestamp()}</span>:<span class = "directory">~${localcwd}</span>$
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>
    </div>`
    if (clear){
        consol.innerHTML  = ('<div id = "">' + prompt + '</div>');
    } else {
        consol.innerHTML += ('<div id = "">' + output + '</div>');
        consol.innerHTML  += ('<div id = "">' + prompt + '</div>');
    }
    autoScroll();
    let text = consol.querySelector("div:last-child .text-input");
    text.focus();

}

