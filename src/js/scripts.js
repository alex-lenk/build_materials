$(document).ready(function () {
    var windowWidth = $(window).width(),
        social = $('.social-fixed'),
        scrollToTop = $('.scroll-to-top');

    if (windowWidth > 575) {
        $('.social-fixed, .scroll-to-top').css('left', windowWidth);

        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('body').addClass('nav-panel__fixed');
            } else {
                $('body').removeClass('nav-panel__fixed');
            }

            if ($(this).scrollTop() > 450) {
                social.fadeIn();
                scrollToTop.fadeIn();
                $('body').addClass('nav-panel__fly');
            } else {
                social.fadeOut();
                scrollToTop.fadeOut();
                $('body').removeClass('nav-panel__fly');
            }
        });


        /* BEGIN Script scroll to top  */
        scrollToTop.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
        /* END Script scroll to top  */
    }
});
/*

/!* BEGIN запрет копирования с сайта *!/
document.ondragstart = noselect;
// запрет на перетаскивание
document.onselectstart = noselect;
// запрет на выделение элементов страницы
document.oncontextmenu = noselect;

// запрет на выведение контекстного меню
function noselect() {
    return false;
}

//запретить на сайте нажатие CTRL+SHIFT+I и F12
document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};
/!* END *!/*/
