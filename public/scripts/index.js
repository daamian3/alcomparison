function scrollTo(object){
    $('html, body').animate({
        scrollTop: object.offset().top
    }, 1000);
    return false;
}

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

function checkReg(){

    var width = $('.register__username').outerWidth();
    $('.register__progress').css('width', width);
    $('.register__submit').css('width', width);

    $(window).resize(function() {
        width = $('.register__username').outerWidth();
        $('.register__progress').css('width', width);
        $('.register__submit').css('width', width);
    });

    var inputs = $('#register input');

    function check(inputs){
        if(	inputs[0].value == "" ||
            inputs[1].value == "" ||
            inputs[2].value == "" ||
            inputs[3].value == "" ||
            inputs[2].value != inputs[3].value) return true;
        else return false;
    }

    if(check(inputs)){
        $(".register__submit").addClass("disabled");
        $(".register__submit").prop('disabled', true);
    }
    else{
        $(".register__submit").removeClass("disabled");
        $(".register__submit").prop('disabled', false);
    }


    $("#register form").on("keyup", function(){
        if(check(inputs)){
            $(".register__submit").addClass("disabled");
            $(".register__submit").prop('disabled', true);
        }
        else{
            $(".register__submit").removeClass("disabled");
            $(".register__submit").prop('disabled', false);
        }
    });
}

function checkPassword(){
    var haslo = document.getElementsByClassName("register__password");
    var vhaslo = document.getElementsByClassName("register__password-check");
    haslo = haslo[0];
    vhaslo = vhaslo[0];

    vhaslo.addEventListener("keyup", function(){

        if(haslo.value==0) vhaslo.classList.remove('bad');
        if(haslo.value!=vhaslo.value && haslo.value!=0) vhaslo.classList.add('bad');
        else if(haslo.value!=0){
            vhaslo.classList.remove('bad');
            vhaslo.classList.add('good');
        }
    }, false);

    haslo.addEventListener("keyup", function(){

        if(haslo.value==0) vhaslo.classList.remove('bad');
        if(haslo.value!=vhaslo.value && haslo.value!=0) vhaslo.classList.add('bad');
        else if(haslo.value!=0){
            vhaslo.classList.remove('bad');
            vhaslo.classList.add('good');
        }
    }, false);

    var calculateComplexity = function (password) {

        var complexity = 0;

        var regExps = [
            /[a-z]/,
            /[A-Z]/,
            /[0-9]/,
            /.{8}/,
            /[!-//:-@[-`{-Ăż]/
        ];

        regExps.forEach(function (regexp) {

            if (regexp.test(password)) {
                complexity++;
            }
        });

        return {
            value: complexity,
            max: regExps.length
        };
    };

    var checkPasswordStregth = function (password) {

        var progress = document.querySelector('.register__progress'),
            complexity = calculateComplexity(this.value);

        progress.value = complexity.value;
        progress.max = complexity.max;

    };

    haslo.addEventListener('keyup', checkPasswordStregth);
}

function checkLog(){
    var width = $('.login__username').outerWidth();
    $('.login__submit').css('width', width);

    $(window).resize(function() {
        width = $('.login__username').outerWidth();
        $('.login__submit').css('width', width);
    });

    var inputs = $('.login input');

    function check(inputs){
        if(	inputs[0].value == "" ||
            inputs[1].value == "") return true;
        else return false;
    }

    if(check(inputs)){
        $(".login__submit").addClass("disabled");
        $(".login__submit").prop('disabled', true);
    }
    else{
        $(".login__submit").removeClass("disabled");
        $(".login__submit").prop('disabled', false);
    }

    $(".login").on("keyup", function(){
        if(check(inputs)){
            $(".login__submit").addClass("disabled");
            $(".login__submit").prop('disabled', true);
        }
        else{
            $(".login__submit").removeClass("disabled");
            $(".login__submit").prop('disabled', false);
        }
    });
}

var regActive = false;
var logActive = false;

function loginActivate(action){

    function ajax(){
        $.ajax({
            type: 'POST',
            url: '../login_external',
            success: function(response) {
                var object = $('#forms');
                object.html(response);
                scrollTo(object);

                $('#loginClose').on('click', function(){
                    $('.login').slideUp('slow');
                    scrollTo($('body'));
                });

                $('#loginLink').on("click", function(e){
                    e.preventDefault();
                    scrollTo($('#forms'));
                    $('#login').delay(800).slideDown('slow');
                });

                checkLog();

                $("#registerLink3").on("click", function(){
                    $.ajax({
                        type: 'POST',
                        url: '../register',
                        success: function(response) {
                            var object = $('#forms');
                            object.html(response);
                            scrollTo(object);

                            $('#registerClose').on("click", function(){ //zamykanie
                                $(this).parent().slideUp('slow');
                                scrollTo($('body'));
                            });

                            $('#registerLink').on("click", function(e){
                                e.preventDefault();
                                scrollTo($('#forms'));
                                $('#register').delay(800).slideDown('slow');
                            });

                            $('#registerLink2').on("click", function(e){
                                e.preventDefault();
                                scrollTo($('#forms'));
                                $('#register').delay(800).slideDown('slow');
                            });

                            checkPassword();
                            checkReg();
                        }
                    });
                });

                regActive = false;
                logActive = true;
            }
        });
    }

    function activated(){
        scrollTo($('#forms'));
        $('#login').delay(800).slideDown('slow');
    }

    $("#loginLink").on("click", function(e){
        e.preventDefault();
        if(!logActive) ajax();
        else activated();
    });

    if(action == 'login'){
        if(!logActive) ajax();
        else activated();
    }
}

function registerActivate(action){

    function ajax(){
        $.ajax({
            type: 'POST',
            url: '../register',
            success: function(response) {
                var object = $('#forms');
                object.html(response);
                scrollTo(object);

                $('#registerClose').on("click", function(){ //zamykanie
                    $(this).parent().slideUp('slow');
                    scrollTo($('body'));
                });

                $('#registerLink').on("click", function(e){
                    e.preventDefault();
                    scrollTo($('#forms'));
                    $('#register').delay(800).slideDown('slow');
                });

                $('#registerLink2').on("click", function(e){
                    e.preventDefault();
                    scrollTo($('#forms'));
                    $('#register').delay(800).slideDown('slow');
                });

                checkPassword();
                checkReg();

                regActive = true;
                logActive = false;
            }
        });
    }

    function activated(){
        scrollTo($('#forms'));
        $('#register').delay(800).slideDown('slow');
    }

    $("#registerLink, #registerLink2").on("click", function(e){
        e.preventDefault();
        if(!regActive) ajax();
        else activated();
    });

    if(action == 'register'){
        if(!regActive) ajax();
        else activated();
    }
}

$(document).ready(function() {
    $('.homepage__scroll-down').click(function() {
        var object = $('.homepage__middle');
        scrollTo(object);
    });

    $('.homepage__scroll-up').click(function() {
        var object = $('body');;
        scrollTo(object);
    });
});

$(window).on("load", function(){
    menuSticky();

    const action = location.hash.substr(1);
    loginActivate(action);
    registerActivate(action);
});