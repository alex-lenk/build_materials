$(document).ready(function () {
    var windowWidth = $(window).width();

    if (windowWidth > 575) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('body').addClass('nav-panel__fixed');
            } else {
                $('body').removeClass('nav-panel__fixed');
            }

            if ($(this).scrollTop() > 450) {
                $('body').addClass('nav-panel__fly');
            } else {
                $('body').removeClass('nav-panel__fly');
            }
        });
    }
});
