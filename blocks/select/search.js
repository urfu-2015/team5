$('.form__search_submit').submit(function (event) {
    event.preventDefault();
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
                window.location = '/quests/search?text=' + name;
            } else {
                window.location = '/quests';
            }
        },
        error: function () {
            console.log("sorry");
        }
    });
});
