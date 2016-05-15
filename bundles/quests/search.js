$('.form__search_submit').click(function (event) {
    var name = $('.form__search').val();
    $.ajax({
        type: "GET",
        url: '/quests',
        dataType: "text",
        data: {
            text: name
        },
        success: function () {
        }
    });
});
