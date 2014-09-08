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

function website_pandora() {
    pandora_fixer();
    pandora_continuous_monitor();
}

which_fixer = {
    "https?:\/\/(.*\.|)purple.com(/.*|)" : function() {},
    "https?:\/\/(.*\.|)pandora.com/.*" : website_pandora
};

function dispatch(loc) {
    console.log("Looking for match against --" + loc + "--");
    for (var key in which_fixer) {
        if (which_fixer.hasOwnProperty(key)) {
            matches = loc.match(new RegExp(key));
            if (matches != null) {
                console.log("Found match against " + key);
                which_fixer[key]();
                break;
            }
        }
    }
}


(function() {
    loc = window.location.href;
    dispatch(loc);
})()
