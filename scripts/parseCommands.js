import { sanitise, onpaste, asciiArt } from "./utils.js";
import { hyfetch } from "./hyfetch.js";
import { genTimestamp, renderFact, checkTime, autoScroll } from "./index.js";

const knight = `
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

const dino = `
               __
              / _)
     _.----._/ /
    /         /
 __/ (  | (  |
/__.-'|_|--|_| 
`

const prideColours = ['#9b4b4b','#ac8453','#aca653','#2b5a37','#536eac','#55305a']


const files  = {
    "": ["about_me.md", "about_site.md", "contact.md", "projects.md"],
    "blog": ["boreal_express.md"]
}

const subfolders = {
    "": ["blog"],
    "blog": [""]
}

const commands = {
    "ls": ls,
    "sudo": `<img class="post-content" src="assets/hk.png"></img>`,
    "cd": cd,
    "help": help,
    "clear": 0,
    "rawr": asciiArt(dino)+'<a href = "https://github.com/hackclub/dinosaurs?tab=readme-ov-file#hack-club-dinosaurs">Orpheus</a> says hi.',
    "cat": cat,
    "pyflagoras": pyflagoras,
    "rm": rm,
    "hyfetch": commandHyfetch,
    "pride": pride,
    "void": commandVoid,
}

const commandsHelp = {
    "ls": "Lists all files in the current working directory",
    "cd [folder]": "Change the current working directory to [folder]",
    "cat [file]": "Outputs the contents of [file] to the terminal",
    "clear": "Resets the terminal; clears it of all past commands",
    "hyfetch": "Prints system information [<a href = 'https://github.com/hykilpikonna/hyfetch'>neofetch</a> with pride flags <3]"
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
    if (! (folderegex.test( tex.split(/ (.+)/)[1]) )){
        var text = sanitise(tex.toLowerCase());
    } else {
        var text = tex.toLowerCase();
    }
    let [command, parameter, _] = text.split(/ (.+)/);
    if (command in commands){
        if (typeof commands[command] == "string"){
            terminalOutput(commands[command])
        } else if (commands[command] == 0)  {
            terminalOutput("", true)
        } else {
            commands[command](parameter)
        }
    } else {
        terminalOutput(`-bash: ${text}: command not found`);
    }
}

function ls(){
    let output = ""
    if (subfolders[cwd].filter((el) => el != "").length){
        console.log(subfolders[cwd].filter((el) => el != ""))
        output += `<span class = "directory">${subfolders[cwd].join("</span><span class = 'directory'>")}</span>`
    }
    if (files[cwd].filter((el) => el != "").length){
        output += ` <span>${files[cwd].join("</span><span>")}</span>`
    }
    terminalOutput(`<span class = "files">
       ${output}
       </span>`)
}

function cd(path){
    if (!((Object.keys(files).includes(path)) || (path == "..") || (path === undefined))){
            terminalOutput(`-bash: cd: ${path}: No such file or directory`);
    } else {
        if ((path == ".." || path === undefined)){
            cwd = ""
        } else {
            cwd = path
        }
        terminalOutput("");
    }
}

function cat(file){
    let localcwd = cwd + file.substring(0, file.lastIndexOf('/')); 
    let localfile = file.substring(file.lastIndexOf('/')+1);
    if (files[localcwd] === undefined || !(files[localcwd].includes(localfile))){
        terminalOutput(`${file}: No such file or directory`)
    } else if (files[localcwd].includes(localfile)){
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
    for (let i = 0; i < Object.keys(commandsHelp).length; i++){
        paired.push(`
        <div class = "project-wrapper">
            <div class= "project-title">
            ${Object.keys(commandsHelp)[i]}
            </div>
            <div class = "project-desc">
                ${Object.values(commandsHelp)[i]}
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
        var fileFlagColours = prideColours;
    } 
    if (voidActivated) {
        var fileFlagAscii = knight;
    }
    let themed = hyfetch({distroAscii: fileFlagAscii, flagColours: fileFlagColours});
    terminalOutput(`<div class = "hyfetch"><div class = "distro">${(themed[0]).join("")}</div><div class = "specs">${themed[1]}</div>`)
    renderFact();
    checkTime();
}

function pride(){
    if (voidActivated){
        var fileFlagAscii = knight;
    }
    hyfetch({distroAscii: fileFlagAscii, flagColours:['#9b4b4b','#ac8453','#aca653','#2b5a37','#536eac','#55305a']});
    prideActivated = true;
    terminalOutput("Happy Pride!");
}

function commandVoid(){
    if (prideActivated){
        var fileFlagColours = prideColours;
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

