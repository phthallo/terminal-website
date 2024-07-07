var currentRoom = "outside"
var inventory = []
console.log(`
            _.--._
            _|__|_
_____________|__|_____________
.-'______________________________'-.
| |________POLICE___BOX__________| |
|  |============================|  |
|  | .-----------..-----------. |  |
|  | |  _  _  _  ||  _  _  _  | |  |
|  | | | || || | || | || || | | |  |
|  | | |_||_||_| || |_||_||_| | |  |
|  | | | || || | || | || || | | |  |
|  | | |_||_||_| || |_||_||_| | |  |
|  | |  _______  ||  _______  | |  |
|  | | |       | || |       | | |  |
|  | | |       | || |       | | |  |
|  | | |       | || |       | | |  |
|  | | |_______| || |_______| | |  |
|  | |  _______ @||@ _______  | |  |
|  | | |       | || |       | | |  |
|  | | |       | || |       | | |  |
|  | | |       | || |       | | |  |
|  | | |_______| || |_______| | |  |
|  | |  _______  ||  _______  | |  |
|  | | |       | || |       | | |  |
|  | | |       | || |       | | |  |
|  | | |       | || |       | | |  |
|  | | |_______| || |_______| | |  |
|  | '-----------''-----------' |  |
_|__|/__________________________\|__|_ 
'----'----------------------------'----'
*vworp vworp*
A TARDIS has materialised!
Do you want to play a game? (yes())`)

function yes(){
    console.log("What do you want to do next? (explore() / exit())")
}

function explore(){
    switch(currentRoom){
        case("outside"):
            console.log("You open the door. It's dark inside, but there's a faint light in the middle.")
            console.log("What do you want to do next? (closer())")
            currentRoom = "consoleRoom"
            break;
        case("TARDISMain"):
            console.log("You cautiously approach one of the entrances in the room. As you enter, the lights turn on.")
            console.log("What do you want to do next? (explore())")
            currentRoom = "TARDISHallway"
            break;
        case("TARDISHallway"):
            console.log("The lights pulse gently as you pass through the entrance of the hallway. You can see two doors to your right and left.")
            console.log("What do you want to do next? try the door on the (left() / right() / exit())")
            break;
        case("TARDISLibrary"):
            console.log("You enter the room.")
            if (!(inventory.includes("keycard"))){
                console.log("There's a keycard on the middle table. You put it in your pocket.")
                inventory.push("keycard")
            }
            console.log("It's quite dark. The shadows make you feel uneasy.")
            console.log("What do you want to do next? exit()")


    }
}

function left(){
    switch(currentRoom){
        case("TARDISHallway"):
            console.log("It's locked.")
            explore()
            break;
    }
}

function right(){
    switch(currentRoom){
        case("TARDISHallway"):
            console.log("The door slides open. It looks like a ... library?")
            console.log("What do you want to do next? (explore() / exit())")
            currentRoom = "TARDISLibrary"
    }
}

function exit(){
    switch(currentRoom){
        case("outside"):
            console.log("You look away from the TARDIS. When you look back, it's gone.")
            currentRoom = "gameOver"
            break;
        case("TARDISHallway"):
            currentRoom = "consoleRoom"
            closer()
            break;
        case("TARDISLibrary"):
            currentRoom = "TARDISHallway"
            explore()
            break;
}
}

function closer(){
    switch(currentRoom){
        case("consoleRoom"):
            console.log("As you approach the console, the lights flash.")
            console.log("What do you want to do next? (explore()) / inspect())")
            currentRoom = "TARDISMain"
            break;
    }
}

function inspect(){
    switch(currentRoom){
        case("TARDISMain"):
            console.log("You look carefully at the controls in front of you. Two things stand out: a lever and a button.")
            console.log("What do you want to do next? use (lever()) / button())")
            break;
            }
}

function button(){
    switch(currentRoom){
        case("TARDISMain"):
            if (!(inventory.includes("keycard"))){
                console.log("You try to press the button, but nothing happens.")
                console.log("A screen nearby flashes with a message: PERMISSION DENIED.")
                currentRoom = "consoleRoom"
                closer()
                break;

            } else {
                console.log("You press the button and hear a clicking noise.")
                console.log("The front door swings open! Grateful to be free, you walk through.")
                currentRoom = "outside"
                exit()
                break;
            }
    }
}

function lever(){
    switch(currentRoom){
        case("TARDISMain"):
            console.log("You pull the lever. There's an ominious hissing noise, and then everything goes black.")
            currentRoom = "gameOver"
            break;

    }
}