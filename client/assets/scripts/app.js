
var contact, projects;

$.ajax({
    url: 'contact',
    success: function (res) {
        contact = res;
    }
});

$.ajax({
    url: 'projects',
    success: function (res) {
        projects = res;
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
        $('.menuHere').empty().hide().append(contact);
        $('.menuHere').slideDown();
        //$('.contacts').slideDown();
    });
    $('body').on('click', '.projects', function(){
        $('.menuHere').empty().hide().append(projects);
        $('.menuHere').slideDown();
        //$('.contacts').slideDown();
    });

    $('body').on('click', '.project1',function(){
        console.log('works');
        $('.showoff').slideDown();
    });

    $('body').on('click','.closebutton',function(){
        $(this).parent().slideUp();
    });

});