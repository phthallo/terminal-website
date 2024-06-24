export function sanitise(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }
  
export function onpaste(e){
    e.preventDefault();
    var text = "";
    if (e.clipboardData && e.clipboardData.getData) {
      text = e.clipboardData.getData("text/plain");
    } else if (window.clipboardData && window.clipboardData.getData) {
      text = window.clipboardData.getData("Text");
    }
    document.execCommand("insertHTML", false, text);
}

