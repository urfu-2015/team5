$('.form__search_submit').submit(function (event) {
    var name = $('.form__search').val();
    $.ajax({
        type: "GET",
        url: '/quests/search',
        dataType: "text",
        data: {
            text: name
        },
        success: function () {
            if (name.length !== 0) {
                location = '/quests/search?text=' + name;
            } else {
                location = '/';
            }
        }
    });
});
