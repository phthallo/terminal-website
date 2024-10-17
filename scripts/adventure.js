var currentRoom = "outside";
var inventory = [];
var info;
var steps = 0;
var libraryVisited = 0;
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
 _|__|/__________________________\\|__|_ 
'----'----------------------------'----'
*vworp vworp*
A TARDIS has materialised!
Do you want to play a game?\nOptions: yes()`)

function yes(){
    steps += 1
    info = "What do you want to do next?\nOptions: explore() / exit()"
    return info
}

function explore(){
    steps +=1
    switch(currentRoom){
        case("outside"):
            info = "You open the door. It's dark inside, but there's a faint light in the middle.\nWhat do you want to do next?\nOptions: closer()"
            currentRoom = "consoleRoom"
            break;
        case("TARDISMain"):
            info = "You cautiously approach one of the entrances in the room. As you enter, the lights turn on.\nWhat do you want to do next?\nOptions: explore()"
            currentRoom = "TARDISHallway"
            break;
        case("TARDISHallway"):
            info = "The lights pulse gently as you pass through the entrance of the hallway. You can see two doors to your right and left.\nWhat do you want to do next? try the door on the:\nOptions: left() / right() / exit()"
            break;
        case("TARDISLibrary"):
            libraryVisited += 1
            info = "You enter the room."
            if (!(inventory.includes("keycard"))){
                info += "\nThere's a keycard on the middle table. You put it in your pocket.\n"
                inventory.push("keycard")
            }
            if (libraryVisited == 2){
                info += "\nHey, who turned out the lights?\nYou try to back away from the shadows, but by then, it's too late."
                currentRoom = "gameOver";
                return info + `\nEnding: Bad\nSteps: ${steps}`
            }
            info += "\nIt's quite dark. The shadows make you feel uneasy.\nWhat do you want to do next?\nOptions: exit()"
    }
    return info
}

function left(){
    steps +=1
    switch(currentRoom){
        case("TARDISHallway"):
            info = "It's locked."
            return info + "\n" + explore();
    }
    return info;
}

function right(){
    steps += 1
    switch(currentRoom){
        case("TARDISHallway"):
            info = "The door slides open. It looks like a ... library?\nWhat do you want to do next?\nOptions: explore() / exit()"
            currentRoom = "TARDISLibrary"
    }
    return info
}

function exit(msg){
    steps += 1
    switch(currentRoom){
        case("outside"):
            info = `You look away from the TARDIS. When you look back, it's gone.`
            msg ? info += msg : info += `\nEnding: Neutral\nSteps: ${steps}`
            currentRoom = "gameOver";
            break;
        case("TARDISHallway"):
            info = "You return to the main room."
            currentRoom = "consoleRoom"
            return info + "\n" + closer()
        case("TARDISLibrary"):
            info = "With a gentle hiss, the library doors slide closed behind you."
            currentRoom = "TARDISHallway"
            return info + "\n" + explore()
        case("TARDISMain"):
            info = "You decide to look around more before interacting with the console."
            currentRoom = "consoleRoom"
            return info + "\n" + closer()
    }
    return info;
    }

function closer(){
    steps += 1
    switch(currentRoom){
        case("consoleRoom"):
            info = "As you approach the console, the lights flash.\nWhat do you want to do next?\nOptions: explore() / inspect()"
            currentRoom = "TARDISMain"
            break;
    }
    return info;
}

function inspect(){
    steps += 1
    switch(currentRoom){
        case("TARDISMain"):
            info = "You look carefully at the controls in front of you. Two things stand out: a lever and a button.\nWhat do you want to do next? use:\nOptions: lever() / button() / exit()"
            break;
            }
    return info;
}

function button(){
    steps += 1
    switch(currentRoom){
        case("TARDISMain"):
            if (!(inventory.includes("keycard"))){
                info = "You try to press the button, but nothing happens.\nA screen nearby flashes with a message: PERMISSION DENIED."
                currentRoom = "consoleRoom"
                return info + "\n" + closer();

            } else {
                info = `You press the button and hear a clicking noise.\nThe front door swings open! Grateful to be free, you walk through.`
                currentRoom = "outside"
                return info + "\n"  +exit(`\nEnding: Good\nSteps: ${steps}`);
            }
    }
    return info;
}

function lever(){
    steps+=1
    switch(currentRoom){
        case("TARDISMain"):
            info = `You pull the lever. There's an ominious hissing noise, and then everything goes black.\nEnding: Bad\nSteps: ${steps}`
            currentRoom = "gameOver"
            break;
    }
    return info;
}