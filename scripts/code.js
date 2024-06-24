document.addEventListener("keydown", code, false);

const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
var streak = 0;
function code(e){
  if (e.keyCode == sequence[streak]){
    streak ++;
    if (streak == sequence.length){
        var audio = new Audio("assets/wow_so_secret.webm");
        audio.play();
    } 
  } else {
    streak = 0;
  }
}