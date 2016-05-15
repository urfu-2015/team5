$('.form__search_submit').submit(function (event) {
    var name = $('.form__search').val();
    $.ajax({
        type: "GET",
        url: 'quests/search',
        dataType: "text",
        data: {
            text: name
        }
    }).done(function () {
    });
});
