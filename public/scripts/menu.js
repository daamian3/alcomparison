const menu = $(".homepage__menu");

$(window).on("resize", function() {
    if($(document).width() > 768) menu.css("display", "flex");
    else if(menu.css('display') != 'none' && (window.innerHeight > window.innerWidth)) menu.css("display", "flex");
    else if($(document).width() < 768 && menu.css('display') != 'none') $("#open").click();
});

function menu_slide(direction){
    if(direction == "up"){
        menu.fadeOut({ duration: 350, queue: false }).slideUp(350);
        return false;
    }
    else if(direction == "down"){
        menu.fadeIn({ duration: 350, queue: false }).css('display', 'none').slideDown(350);
        return true;
    }
}

$("#open").on("click", function(){
    if(menu.css('display') == 'none'){
        menu_slide("down");
        $(this).addClass("exit");
    }
    else{
        $(this).removeClass("exit");
        menu_slide("up");
    }

});

function menuSticky(){

    var NavY = $('.homepage__header').offset().top;
    var Nav2Y = $('.homepage__middle').offset().top;

    $( window ).resize(function() {
        NavY = $('.homepage__header').offset().top;
        Nav2Y = $('.homepage__middle').offset().top;
    });

    var stickyNav = function(){
        var ScrollY = $(window).scrollTop();
        var width = $(window).width();

        if (ScrollY > NavY) {

            if (ScrollY < Nav2Y) {
                width = $(window).width();
                $('.homepage__header').addClass('sticky');
                $('.homepage__header').css("opacity", "1");
            }
            else{
                $('.homepage__header').css("opacity", "0");
            }
        }
        else {
            $('.homepage__header').removeClass('sticky');
            $('.homepage__logo').fadeIn();
        }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });

    $(window).resize(function() {
        var width = $(window).width();
        if (width < 768){
            $('.homepage__header').addClass('sticky');
        }
    });
}

$(window).on("load", function(){
    menuSticky();
});
