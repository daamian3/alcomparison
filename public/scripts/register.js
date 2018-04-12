function scrollTo(object){
    $('html, body').animate({
        scrollTop: object.offset().top
    }, 1000);
    return false;
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

function register(){
    $.ajax({
        type: 'POST',
        url: '../register',
        success: function(response) {
            var object = $('#forms');
            object.html(response); //render
            scrollTo(object); //przeskroluj do formularza
            checkPassword();

            $('#register__close').click(function() { //zamykanie
                $(this).parent().slideUp('slow');
                scrollTo($('body'));
            });

            var width = $('.register__username').outerWidth();
            $('.register__progress').css('width', width);
            $('.register__submit').css('width', width);

            $(window).resize(function() {
                width = $('.register__username').outerWidth();
                $('.register__progress').css('width', width);
                $('.register__submit').css('width', width);
            });
        }
    });
}

function login(){
    $.ajax({
        type: 'POST',
        url: '../login',
        success: function(response) {
            var object = $('#forms');
            object.html(response);
            scrollTo(object);
        }
    });
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

    $('#register').on('click', function(){ register(); });

});
