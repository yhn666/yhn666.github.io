function isMobile(){var isMobile={Android:function(){return navigator.userAgent.match(/Android|Linux/i)?true:false;},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)?true:false;},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false;},Windows:function(){return navigator.userAgent.match(/IEMobile/i)?true:false;},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows());}};return isMobile.any();}

/**
 * 广告
 * @type {HTMLElement}
 */
(function ($, window, document) {

    function addAdd(ad) {
        var myAdScript = document.createElement('script');
        myAdScript.src = ad.src;
        if(ad.id) {
            myAdScript.id = ad.id;
        }
        myAdScript.async = true;
        myAdScript.defer = true;
        try {
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(myAdScript, s);
        } catch (e) {
            console.log(e)
        }
    }

    /*{
        id: 2415719,
        src: 'https://www.abcdlm.com/c.aspx?action=c&c1=7&c2=191&c3=&c4=2&c5=AdCode_sjdb&c6=640x200&c7=2&c8=1&c9=&c10=&c50=2415719'
    },{
        id: 1901101,
            src: 'https://d.ytop8.com/z.aspx?action=c&z1=7&z2=7187&z3=&z4=2&z5=d58footm&z6=640x150&z7=1&z8=1&z9=&z10=&z50=1901101'
    },{
        src: '//s6.pcshuju.com/gs.php?id=6525'
    },{
        src: 'http://wm.lrswl.com/page/?s=316805'
    }*/
    var ads = [{
        id: 1901101,
        src: 'https://d.ytop8.com/z.aspx?action=c&z1=7&z2=7187&z3=&z4=2&z5=d58footm&z6=640x150&z7=1&z8=1&z9=&z10=&z50=1901101',
        mode: 'mobile'
    }, {
        id: 2456569,
        src: 'https://d.ytop8.com/z.aspx?action=c&z1=7&z2=7187&z3=&z4=2&z5=AdCode_self&z6=-360x60&z7=1&z8=1&z9=&z10=&z50=2456569',
        mode: 'pc'
    }];

    for (let i = 0; i < ads.length; i++) {
        var ad = ads[i];

        if(isMobile()) {
            if (ad.mode == 'mobile') {
                addAdd(ad);
            }
        } else {
            if (ad.mode == 'pc') {
                addAdd(ad);
            }
        }
    }

    var cnt = 0;
    var timer = window.setInterval(function () {
        cnt++;
        if($("[id^=sjdb_div_]").length > 0) {
            $("[id^=sjdb_div_]").css("visibility", "hidden");
        }
        if ($("[id=f22]").length > 0) {
            $("[id=f22]").css("visibility", "hidden");
        }

        var node = $('div[id][style]').filter(function(){
            return 'fixed' == $(this).css('position') && $.isNumeric($(this).attr("id"))
        });
        if(node.length > 0) {
            node.css("visibility", "hidden");
        }

        if ($("#down_boxcode").length > 0) {
            $("#down_boxcode").css("visibility", "hidden");
        }

        if($(".main>h2.headline").length > 0) {
            $(".main>h2.headline").parent().css("visibility", "hidden");
        }
        if(cnt > 30) {
            window.clearInterval(timer);
        }
    }, 150)

})(jQuery, window, document);
