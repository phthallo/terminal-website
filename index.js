document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("keydown", focusText, false);
document.addEventListener("onload", focusText, false);

var consol = document.getElementById("console");

function focusText(e) {
    var text = consol.querySelector("div:last-child .text-input");
    console.log(text);
    text.focus();
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if(keyCode==13 && document.activeElement.isContentEditable) {
        const textField = document.activeElement;
        textField.setAttribute("contenteditable", false);
        e.preventDefault();
        parseTextInput(textField.innerText);
        console.log("Enter key was pressed while cursor was inside an editable text field!");
    }
    if(keyCode==13 & !(document.activeElement.isContentEditable)){
        console.log("Enter key was pressed when cursor was not inside an editable text field!")
    }
}
function parseTextInput(text){
    [command, parameter] = text.split(" ");
    console.log(`Command is ${command}`)
    console.log(`Parameter is ${parameter}`)
    if (command=="cat"){
        cat(parameter);
    } else {
        consol.innerHTML += `<div id = "">-bash: ${text}: command not found <br> <br> </div>`;
    }
    cat("load_text");
}

function cat(file){
    if ((["about_me", "load_text", "projects"].includes(file))){
        fetch(`files/${file}.html`)
        .then((res => res.text()))
        .then((text) => {
            consol.innerHTML += ('<div id = "">' + text + '</div>');
        });
    } else {
        consol.innerHTML += `<div id = "">cat: ${file}: No such file or directory <br> <br> </div>`;
    }
}