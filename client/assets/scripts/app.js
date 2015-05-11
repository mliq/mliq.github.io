var contact, projects, project1, projectTemplate, projectNumber = 0;

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


function showProj(projNum) {
    var dataFile = 'project' + projNum + '.json';

    $.ajax({
        url: 'projectTemplate',
        success: function (res) {
            projectTemplate = res;

            $('.projectHere').empty().slideUp().append(projectTemplate);

            $.ajax({
                url: "project1.json",
                success: function (res) {
                    project1 = res;
                    $('.header').empty().append(project1.header);
                    $('.longText').empty().append(project1.copy);
                    $('.projectCopy').empty().append(project1.imgCopy);
                    var imageUrl = '../p/' + project1.img;
                    $('.projectImage').css('background-image', 'url(' + imageUrl + ')');
                    $('.projectHere').slideDown();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });
}


$(document).ready(function () {

    $('body').on('click', '.contact', function () {
        $('.menuHere').empty().hide().append(contact);
        $('.menuHere').slideDown();
        //$('.contacts').slideDown();
    });
    $('body').on('click', '.projects', function () {
        $('.menuHere').empty().hide().append(projects);
        $('.menuHere').slideDown();
        //$('.contacts').slideDown();
    });

    $('body').on('click', '.project1', function () {
        showProj("1");
        $('.showoff').slideDown();
        projectNumber = 1;
    });

    $('body').on('click', '.closebutton', function () {
        $(this).parent().parent().slideUp();
    });
    $('body').on('click', '.name', function () {
        $.ajax({
            url: 'patterns',
            success: function (res) {
                var imageUrl = '../img/' + res;
                $('.band2').css('background-image', 'url(' + imageUrl + ')');
            }
        });
    });
});