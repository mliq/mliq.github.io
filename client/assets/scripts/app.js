
var contact;

$.ajax({
    url: 'contact',
    success: function (res) {
        contact = res;
        console.log(res);
    }
});

$(window).scroll(function(){
    if ( $window.scrollTop() > 250 ) {
        $('topbar').addClass('sticky');
    } else {
        $('topbar').removeClass('sticky');
    }
});

$(document).ready(function(){

    $('body').on('click', '.contact', function(){
        $('.menuHere').empty().append(contact);
        $('.menuHere').slideDown();
        //$('.contacts').slideDown();
    });

    $('.closebutton').on('click',function(){
        $(this).parent().slideUp();
    });

    $('.projects').on('click', function(){
        $('.nav2').slideDown();
    });

    $('.project1').on('click', function(){
        $('.showoff').slideDown();
    });


});