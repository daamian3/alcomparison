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

var logActive = false;

function login(){
    if(logActive) $('#loginBackground').fadeIn();

    else{
        $.ajax({
            type: 'POST',
            url: '../login_external',
            success: function(response) {
                var object = $('#login');
                object.html(response);

                $('#loginClose').on('click', function(){
                    $('#loginBackground').fadeOut();
                });

                logActive = true;
                $('#loginBackground').fadeIn();
                checkLog();
            }
        });
    }
}

var scene = $('#scene').get(0);
var parallaxInstance = new Parallax(scene);

$('.help').hide();

$(document).ready(function() {
    $('#helpShow').on('click', function(){
        $('.help').fadeIn('slow');
    });

    $('#loginShow').on('click', function(){
        login();
    });

    $('#loginBackground').hide();
});