

document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("click", checkCaretLocation, false);
var textEditable = true;

function caretState(state) {
    console.log(`Caret visibility was set to ${state}!`)
    document.getElementById("caret").hidden = !state;
}

function checkCaretLocation(){
    if (document.activeElement.isContentEditable) {
        caretState(false);
        console.log("Click was inside editable text field!");
    } else if (textEditable) {
        caretState(true);
        console.log("Click was outside editable text field!");
    }
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if(keyCode==13 && document.activeElement.closest("[contenteditable]")) {
        const textField = document.querySelector("#text-input");
        textField.setAttribute("contenteditable", false);
        textEditable = false;
        e.preventDefault();
        caretState(false);
        parseTextInput(textField.innerText);
        console.log("Enter key was pressed while cursor was inside an editable text field!");
    }
    if(keyCode==13 & !(document.activeElement.closest("[contenteditable]"))){
        console.log("Enter key was pressed when cursor was not inside an editable text field!")
    }
}

function parseTextInput(text){
    console.log(text);
    [command, parameter] = text.split(" ");
    console.log(`Command is ${command}`)
    console.log(`Parameter is ${parameter}`)
    cat(`files/${parameter}.html`);
}

function cat(file){
    fetch(file)
        .then((res) => res.text())
        .then((text) => {
            var console = document.getElementById("console");
            console.innerHTML += text;
        })
        .catch((e) => console.error(e));
    fetch("files/load_text.html")
        .then((res) => res.text())
        .then((text) => {
            var console = document.getElementById("console");
            console.innerHTML += text;
        })
        .catch((e) => console.error(e));
}