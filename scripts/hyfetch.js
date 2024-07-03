function hyfetch(distroAscii, flagColours){
    colouredLines = []
    lines = distroAscii.split("\n"); // .length = the amount of lines the distroAscii is
    lengthofEach = Math.floor(lines.length/flagColours.length);
    for (let i = 0; i < flagColours.length; i++){
            for (const j in (lines.slice(lengthofEach*(i-1), i*lengthofEach))){
                nextLine = (lines.slice(lengthofEach*(i-1), i*lengthofEach)[j]);
                colouredLines.push(`<pre style = "color: ${flagColours[i-1]}">${nextLine}</pre>`);
            }
        }
    difference  = lines.length - (lengthofEach*flagColours.length);
    for (let i = (difference+2); i >= 0; i--){
        colouredLines.push(`<pre style = "color: ${flagColours[flagColours.length-1]}">${lines[lines.length-1-i]}</pre>`);
    }
    return colouredLines;
    }

colouredAscii = (hyfetch(`
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
    `, ["#915346", "#c8a58d", "#FFFFFF", "#ad8a9f", "#6e3557"]))

for (const i in colouredAscii){
    document.querySelector("#distro").innerHTML += colouredAscii[i];
}


