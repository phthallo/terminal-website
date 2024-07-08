import { funFact, renderFact } from "./index.js"
let distro = `
          _,met$$$$$gg.
       ,g$$$$$$$$$$$$$$$P.
     ,g$$P"        "\""Y$$.".
    ,$$P'              \`$$$.
   ',$$P       ,ggs.     \`$$b:
   \`d$$'     ,$P"'   .    $$$
    $$P      d$'     ,    $$P
    $$:      $$.   -    ,d$$'
    $$;      Y$b._   _,d$P'
    Y$$.    \`.\`"Y$$$$P"'
    \`$$b      "-.__
     \`Y$$                            
      \`Y$$.
        \`$$b.
          \`Y$$b.
             \`"Y$b._
                 \`"\""
`


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

export function hyfetch({distroAscii=distro, flagColours=["#915346", "#c8a58d", "#FFFFFF", "#ad8a9f", "#6e3557"],  replace=true} = {}){
    let colouredLines = []
    let lines = distroAscii.split("\n"); // .length = the amount of lines the distroAscii is
    let lengthofEach = Math.floor(lines.length/flagColours.length);
    for (let i = 0; i < flagColours.length; i++){
            for (const j in (lines.slice(lengthofEach*(i-1), i*lengthofEach))){
                let nextLine = (lines.slice(lengthofEach*(i-1), i*lengthofEach)[j]);
                colouredLines.push(`<pre style = "color: ${flagColours[i-1]}">${nextLine}</pre>`);
            }
        }
    let difference  = lines.length - (lengthofEach*flagColours.length);
    for (let i = (difference+2); i >= 0; i--){
        colouredLines.push(`<pre style = "color: ${flagColours[flagColours.length-1]}">${lines[lines.length-1-i]}</pre>`);
    }
    if (replace){
      document.querySelectorAll(".distro").forEach(x => x.innerHTML = colouredLines.join(""));
      document.querySelectorAll(".specs").forEach(x => x.innerHTML = specs);
      renderFact()
    } else {
        return [colouredLines, specs];
    }
}
