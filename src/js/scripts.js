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
