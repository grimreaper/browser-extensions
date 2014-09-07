console.log("Background Page Exists");
var s = document.createElement('script');
s.src = chrome.extension.getURL('select_content.js');
console.log("Loading source from " + s.src);
s.onload = function() {
    console.log("Unloading myself");
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);
