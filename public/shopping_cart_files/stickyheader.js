require([
    'jquery'
], function ($) {
    var offset = 150;
    $(window).scroll(function () {
        if ($(window).scrollTop() >= offset) {
            $('.page-header').addClass('sticky');
        } else {
            $('.page-header').removeClass('sticky');
        }
    });
});
