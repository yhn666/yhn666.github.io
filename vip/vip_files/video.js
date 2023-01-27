var menubtn = document.getElementsByClassName('aim-menu')[0];
var menu = document.getElementsByClassName('aim-topbar-nav')[0];
menubtn.onclick = function () {
    var style = menu.style;
    style.display = style.display == "block" ? "none" : "block";
}
$(function () {
    $.get("https://v1.hitokoto.cn", null, function (a) {
        $(".intro-siteinfo").html(a.hitokoto + " —— <strong>" + a.from + "</strong>")
    }, "JSON");
});

function handleJiexi() {
    var diz = document.getElementById("url").value;
    var jkurl = document.getElementById("jk");
    var jk = document.getElementById("jk").selectedIndex;
    var jkv = jkurl.options[jk].value;
    var cljurl = document.getElementById("player");
    cljurl.src = jkv + diz
}

function getkey(button) {
    if (event.keyCode == 13) {
        event.returnValue = false;
        document.getElementById('bf').click();
    }
};
