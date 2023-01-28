if (!!window.ActiveXObject || "ActiveXObject" in window) { //is IE?
    alert('朋友，上古浏览器不支持呢~');
}
let divTyping = document.getElementById('xf_type')
let i = 0,
    timer = 0,
    str = '想让每个人都快乐，全网同名' //text
function typing() {
    if (i <= str.length) {
        divTyping.innerHTML = str.slice(0, i++) + '_'
        timer = setTimeout(typing, 150) //time
    } else {
        divTyping.innerHTML = str
        clearTimeout(timer)
    }
}

typing()
var binft = function (r) {
    function t() {
        return b[Math.floor(Math.random() * b.length)]
    }
    function e() {
        return String.fromCharCode(94 * Math.random() + 33)
    }
    function n(r) {
        for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
            var l = document.createElement("span");
            l.textContent = e(),
                l.style.color = t(),
                n.appendChild(l)
        }
        return n
    }
    function i() {
        var t = o[c.skillI];
        c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")),
            r.textContent = c.text,
            r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))),
            setTimeout(i, d)
    }
    var l = "",
        o = ["摸鱼三小时，学习一分钟","学习使我快乐(除了考试需要的)","我学习呢，来找我吧","我有很多好康的，欢迎来撩","全网同名(有可能)","咕咕咕(啄)咕~","为什么编程不像scratch一样好学！！！","欢迎你来到我的家乡，大庆","我要当UP主，爷爷奶奶可高兴了，给我一只鸽子","1+1+4-5+1+4=6","改造格林菲尔德市ing~","有可能以后会开MC服务器","我有MC正版啦(跳)","如果你在MC服务器里游荡，看见yhn666_CN就有可能是我","如果你网上冲浪看到yhn666也有可能是我","我相信你不会上涩涩网站的吧","为什么我的头像是一只兔子呢(还是屁股)","高中太难啦(悲)","平常睡大觉，考试就发懵","我在打这些字的时候我在家答卷子呢","手机在手，学习没有","(拿刀)(对准卷子)(waste)","啥啥不会","米环7yyds","f**k you,dingtalk","我的网课完成啦","c,t,r,l,music","只因你太美，电脑都卡退","噩梦1000米","当你在学习的时候，你在玩","我烦语文","嗨害嗨","︵︵","奥利给干了兄弟们","我还有个邮箱yhn@ikun.email","1×9-1-9+8-1+0=6","接下来是抽象文学","〇⺀   <∧﹥","音乐(鸡你太美)","︿︿","懂了没？","我家哥哥下蛋你别吃","︹︹","ikun","我有开团许可证(悲)","十分甚至九分傻","口区","︷︷","彳亍","占戈哥欠走己","︽︽","你觉得哪种中分最好看？",].map(function (r) {
            return r 
        }),
        a = 2,
        g = 1,
        s = 5,
        d = 75,
        b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
        c = {
            text: "",
            prefixP: 10,
            skillI: 0,
            skillP: 0,
            direction: "forward",
            delay: a,
            step: g
        };
    i()
};
binft(document.getElementById('xf_txt'));
