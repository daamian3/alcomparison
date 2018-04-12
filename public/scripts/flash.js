$(document).ready(function() {
    $('.przyciemnienie').click(function() {
        $(this).fadeOut('slow');
    });

    $('.flash-notice, .flash-success, .flash-warning').click(function() {
        $(this).fadeOut('slow');
        $(this).parent().fadeOut('slow');
    });
});