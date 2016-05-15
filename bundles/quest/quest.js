//Повесить на кнопку начало выполнения квеста
function checkinHandler() {
    $(this).hide();
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(checkCheckin);
    } else {
        //Где то надо сказать что геолокации нет
    }
}

function checkCheckin() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var location = position.coords.latitude + ';' + position.coords.longitude;
        $('.quest__one-picture').each(function () {
            $.ajax({
                type: "POST",
                url: '/checkin/' + $(this).attr('data-id'),
                data: {
                    location: location
                },
                success: checkinAccept
            });
        });
    });
}

function checkinAccept(data) {
    if (data.content === true) {
        //Отметить чекин для картинки с data-id=data.picture_id
    }
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
});
