document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("click", checkCaretLocation, false);
const caret_el = document.querySelector("#caret");


function caret_state(state) {
    document.getElementById("caret").hidden = !state;
    console.log(`Caret visibility was set to ${!state}!`)
}

function checkCaretLocation(e){
    if (document.activeElement.isContentEditable) {
        caret_state(false);
        console.log("Click was inside editable text field!");
    } else {
        caret_state(true);
        console.log("Click was outside editable text field!");

    }
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if(keyCode==13 && document.activeElement.closest("[contenteditable]")) {
        const text_field = document.querySelector("#text-input");
        text_field.setAttribute("contenteditable", false);
        e.preventDefault();
        caret_state(false);
        console.log("Enter key was pressed while cursor was inside an editable text field!");
    }
    if(keyCode==13 & !(document.activeElement.closest("[contenteditable]"))){
        console.log("Enter key was pressed when cursor was not inside an editable text field!")
    }
}

