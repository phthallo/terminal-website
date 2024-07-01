var currentRoom = ""
var gameStarted = false
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
Do you want to play a game?`)

Object.defineProperty(window, 'yes', {
    get: function () {
        console.log("What do you want to do next? look (inside/outside)")
        gameStarted = true
    }
})

if (gameStarted == true){
        Object.defineProperty(window, 'inside', {
        get: async function () {
            console.log("You open the door. It's dark inside, but there's a faint light in the middle.")
            console.log("What do you want to do next? look (closer/outside)")
            let currentRoom = await new Promise(function(resolve) {
                resolve("mainConsole");
            });
        }
    });
    Object.defineProperty(window, 'outside', {
        get: async function () {
            console.log("You look away from the TARDIS. Nothing but inconspicous grass.")
            console.log("When you look back, the TARDIS has disappeared.")
            let currentRoom = await new Promise(function(resolve) {
                resolve("gameOver");
            });
        }
    });

    
    }
    if (currentRoom == "mainConsole"){
        console.log("You are inside")
        Object.defineProperty(window, 'closer', {
            get: async function () {
                console.log("You walk inside and move closer to the main console. There's a faint whirring sound.")
                currentRoom = "con"
            }
        })
    }
