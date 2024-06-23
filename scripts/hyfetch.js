function hyfetch(distroAscii, flagColours){
    colouredLines = []
    lines = distroAscii.split("\n"); // .length = the amount of lines the distroAscii is
    console.log(lines);
    lengthofEach = Math.floor(lines.length/flagColours.length);
    for (const i in flagColours){
            for (const j in (lines.slice(lengthofEach*(i-1), i*lengthofEach))){
                nextLine = (lines.slice(lengthofEach*(i-1), i*lengthofEach)[j]);
                colouredLines.push(`<pre style = "color: ${flagColours[i]}">${nextLine}</pre>`);
            }
        }
    difference  = lines.length - (lengthofEach*flagColours.length);
    console.log(difference);
    for (let i = (difference+1); i >= 0; i--){
        console.log(lines[lines.length-1-i]);
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
    `, [ "#915346",
                "#c8a58d", "#FFFFFF", "#ad8a9f", "#6e3557"]))

console.log(colouredAscii.length);

for (const i in colouredAscii){
    document.querySelector("#distro").innerHTML += colouredAscii[i];
}


