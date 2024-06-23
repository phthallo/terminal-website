
document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("keyup", focusText, false);

var consol = document.getElementById("console");

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
    //text = sanitise(text);
    [command, parameter] = text.split(" ");
    console.log(`Command is ${command}`)
    console.log(`Parameter is ${parameter}`)
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
            terminalOutput(`<img src=assets/hk.png width=45%></img><p>`);
            break;
        case "clear":
            prompt = `<span class = "console-input">
        <b>phthallo@hackclub.app</b> <span class = "timestamp">${genTimestamp()}:~$</span>
        <span class = "text-input"  spellcheck="false" contenteditable = "true"></span>
    </span>`;
            consol.innerHTML  = ('<div id = "">' + prompt + '</div>');
            break;
        case (command=="help"):
            help();
            break
        default: 
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