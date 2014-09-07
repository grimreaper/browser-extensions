function pandora_div_restore(div) {
    console.log("Fixing div " + div);
    div.classList.remove("unselectable");
    div.setAttribute("unselectable", "off");
    div.removeAttribute("onmousedown");
    div.removeAttribute("onclick");
    div.removeAttribute("ondragstart");
    div.removeAttribute("onselectstart");
    div.removeAttribute("onmouseover");
}

function pandora_div_filter(div) {
    var div_1 = document.getElementsByClassName("lyricsText");
    div_1 = [].slice.call(div_1);
    var div_2 = document.getElementsByClassName("unselectable");
    div_2 = [].slice.call(div_2);

    var ret = div_1.concat(div_2);
    console.log("Found " + ret.length + " objects from filter");
    return ret;
}

function pandora_fixer() {
    var divs = pandora_div_filter();
    divs.forEach(function(div) {
        pandora_div_restore(div);
    });
}

function pandora_do_mutation(mutations) {
    console.log("In pandora_do_mutation");
    mutations.forEach(function(mutation) {
        // This is such a hack!
        pandora_fixer();
    });
}

function pandora_continuous_monitor() {
    console.log("Attempting to observe Pandora");
    var trackDetail = document.getElementById("trackDetail");
    var lyricsObserver = new MutationObserver(pandora_do_mutation);
    var config = { childList: true, attributes: false, characterData: false, subtree: true, attributeOldValue: false, characterDataOldValue: false };
    lyricsObserver.observe(trackDetail, config);
}


(function(){
    pandora_fixer();
    pandora_continuous_monitor();
})()
