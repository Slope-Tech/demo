// custom script to set the active class for the main menu
define([ 'jquery', 'jquery/ui' ], function($) {
    $(document).ready(function() { console.log('js 3-15-22');
         
        var url = window.location.href; //sets the variable "url" to the pathname of the current window
        var lastChar = url.substr(url.length - 1);
        if (lastChar == '/') {
            url = url.substring(0, url.length - 1);
        }
        //$('.main-navigation a.active').removeClass('active');
        $('.main-navigation a').each(function() {
            url2 = $(this).attr('href');
            if (typeof url2 !== 'undefined') {
                if (url2.substr(url2.length - 1) == '/') {
                    url2 = url2.substring(0, url2.length - 1);
                }
            }
            if (url2 == url) {
                $(this).parent('li').addClass('active');
                $(this).parents('li.level0').addClass('has-active');
            }
        });
    });
});


