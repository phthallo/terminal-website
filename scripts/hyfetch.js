import { renderFact } from "./index.js"
import * as config from "./config.js"

let specs = ` 
<b>phthallo</b>@<b>hackclub.app</b>
<br>---------------------<br>
<b>OS: </b>Debian GNU/Linux 12.5 (bookworm) x86_64<br>
<b>Host: </b>Virtual Machine Hyper-V UEFI Release v4.0<br>
<b>Kernel: </b>6.1.0-21-amd64<br>
<b>Uptime: </b><span class = "uptime">0 mins</span><br>
<b>Resolution: </b>1920x1080<br>
<b>DE: </b>GNOME 43.9 (wayland)<br>
<b>VIM: </b>Mutter<br>
<b>WPI Theme: </b>Adwaita<br>
<b>Theme: </b>Adwaita [GTK2/3]<br>
<b>Terminal: </b>gnome-terminal<br>
<b>CPU: </b>Intel i5-10210U (1) @ 2.111GHz<p>

<b>Fun fact! </b><span class = "funfact"></span><p>
<b>Need help? </b> Type 'help' to get started!<p>
  <span class = "palette tangrey">&nbsp;&nbsp;&nbsp;</span><!--
--><span class = "palette neutralgrey">&nbsp;&nbsp;&nbsp;</span><!--
--><span class = "palette lightgrey">&nbsp;&nbsp;&nbsp;</span><!--
--><span class = "palette pink">&nbsp;&nbsp;&nbsp;</span><!--
--><span class = "palette peach">&nbsp;&nbsp;&nbsp;</span><!--
--><span class = "palette blue">&nbsp;&nbsp;&nbsp;</span><!---
--><span class = "palette lightblue">&nbsp;&nbsp;&nbsp;</span>`

export function hyfetch({distroAscii=config.DISTRO, flagColours=config.COLOURSDEFAULT, initial=false,  replace=true} = {}){
    let colouredLines = []
    let lines = distroAscii.split("\n"); // .length = the amount of lines the distroAscii is
    let lengthofEach = Math.floor(lines.length/flagColours.length); // lines that each colour should take up
    for (let i = 1; i < flagColours.length; i++){ 
            for (const j in (lines.slice(lengthofEach*(i-1), i*lengthofEach))){ // for each segment of lines (segments contain lengthofEach no. lines) 
                let nextLine = (lines.slice(lengthofEach*(i-1), i*lengthofEach)[j]); // for each line in that segment
                colouredLines.push(`<pre style = "color: ${flagColours[i-1]}">${nextLine}</pre>`); // colour and push
            }
        }
    let difference  = lines.length - (lengthofEach*flagColours.length); // sometimes length of the colours provided means it doesn't divide nicely
    for (let i = (difference+lengthofEach-1); i >= 0; i--){ // append the remainder onto the end so that the last colour has more
        colouredLines.push(`<pre style = "color: ${flagColours[flagColours.length-1]}">${lines[lines.length-1-i]}</pre>`);
    }
    if (initial){
      document.querySelectorAll(".distro").forEach(x => x.innerHTML = colouredLines.join(""));
      document.querySelectorAll(".specs").forEach(x => x.innerHTML = specs);
      renderFact();
    } else if (replace) {
      document.querySelectorAll(".distro").forEach(x => x.innerHTML = colouredLines.join(""));
      return [colouredLines, specs]
    } else {
        return [colouredLines, specs];
    }
}
