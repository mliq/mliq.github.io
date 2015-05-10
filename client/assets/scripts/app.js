
var contact, projects, project1, projectNumber = 0;

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

$.ajax({
    url: 'project1',
    success: function (res) {
        project1 = res;
    }
});

$(document).ready(function(){
//
//$(window).scroll(function(){
//    if ( $window.scrollTop() > 80 ) {
//        $('topbar').addClass('sticky');
//    } else {
//        $('topbar').removeClass('sticky');
//    }
//});

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
        $('.band2').empty().append(project1);
        $('.showoff').slideDown();
        projectNumber = 1;
    });

    $('body').on('click','.closebutton',function(){
        $(this).parent().parent().slideUp();
    });

});