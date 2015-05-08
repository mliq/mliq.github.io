$(document).ready(function(){

    $('.contact').on('click', function(){
       $('.contacts').show();
    });

    $('.closebutton').on('click',function(){
        $(this).parent().hide();
    });

    $('.projects').on('click', function(){
        $('.nav2').show();
    });

    $('.project1').on('click', function(){
        $('.showoff').show();
    });

});