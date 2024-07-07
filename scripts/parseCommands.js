import { sanitise, onpaste } from "./utils.js";
var inputHistory = [""]
var currentPos = -1
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
        console.log(inputHistory.length + currentPos)
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
            break
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
    terminalOutput(`
<hr></hr>
<div class = "project-wrapper">
    <div class= "project-title">
        ls
    </div>
    <div class = "project-desc">
        - Lists all files in the current working directory.
        <p>
    </div>
</div>
<div class = "project-wrapper">
    <div class= "project-title">
        cat [filename]
    </div>
    <div class = "project-desc">
        - Outputs the contents of [filename] to the terminal.
        <p>
    </div>
</div>
<div class = "project-wrapper">
    <div class= "project-title">
        clear
    </div>
    <div class = "project-desc">
        - Resets the terminal; clears it of all past commands.
        <p>
    </div>
</div>
<p>There may be more commands ;)`)
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