
var resume;

$.ajax({
    url: 'resume',
    success: function (res) {
        resume = res;
        console.log(res);
    }
});

$window.scroll(function(){
    if ( $window.scrollTop() > 250 ) {
        $('topbar').addClass('sticky');
    } else {
        $('topbar').removeClass('sticky');
    }
});

$(document).ready(function(){

    $('.contact').on('click', function(){
       $('.contacts').slideDown();
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