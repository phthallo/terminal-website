var currentRoom = "outside"
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
    console.log("What do you want to do next? go (inside()/outside())")
}

function inside(){
    switch(currentRoom){
        case("outside"):
            console.log("You open the door. It's dark inside, but there's a faint light in the middle.")
            console.log("What do you want to do next? look (closer()/outside())")
            currentRoom = "consoleRoom"
            break;
        case("TARDISMain"):
            console.log("You cautiously approach one of the entrances in the room. As you enter, the lights turn on.")
            console.log("What do you want to do next? look (inside())")
            currentRoom = "TARDISHallway"
            break;
        case("TARDISHallway"):
            console.log("The lights pulse gently as you pass through the entrance of the hallway. You can see two doors to your right and left.")
            console.log("What do you want to do next? try the door on the (left() / right())")
            break;
    }
}

function left(){
    switch(currentRoom){
        case("TARDISHallway"):
            console.log("It's locked.")
            inside()
            break;
    }
}

function outside(){
    switch(currentRoom){
        case("consoleRoom"):
        case("outside"):
            console.log("You look away from the TARDIS. When you look back, it's gone.")
            currentRoom = "gameOver"
            break;
}
}

function closer(){
    switch(currentRoom){
        case("consoleRoom"):
            console.log("As you approach the console, the lights flash. Suddenly, the door shuts behind you! ")
            console.log("What do you want to do next? look (inside()) / inspect()")
            currentRoom = "TARDISMain"
            break;
    }
}

function inspect(){
    switch(currentRoom){
        case("TARDISMain"):
            console.log("You look carefully at the controls in front of you. Two things stand out: a lever and a button.")
            console.log("What do you want to do next? use (lever()) / button())")
    }
}