function checkCheckin() {
    var pictureId = $(this).closest('.quest__one-picture').attr('data-id');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
    });
    var location = '';
    $.ajax({
        type: "POST",
        url: '/checkin/' + pictureId,
        data: {
            location: location
        },
        success: checkinAccept
    });
}

function checkinAccept() {
    //Если чекин!!!
}

function removeQuest() {
    var id = $('.quest').data('id');
    $.post({
        url: '/quests/remove/' + id,
        success: onRemoveSuccess
    });
}

function onRemoveSuccess() {
    document.location = '/quests';
}

$(window).load(function () {
    $('.quest__manage__remove').click(removeQuest);
    $('.checkin__button').click(checkCheckin)
});
