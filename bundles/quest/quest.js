function checkinHandler() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(checkCheckin.bind(this));
    } else {
        //Где то надо сказать что геолокации нет
    }
}

function checkCheckin(position) {
    var pictureId = $(this)
        .closest('.modal')
        .prev()
        .attr('data-id');
    var location = position.coords.latitude + ';' + position.coords.longitude;
    $.ajax({
        type: "POST",
        url: '/checkin/' + pictureId,
        data: {
            location: location
        },
        success: checkinAccept.bind(this)
    });
}

function checkinAccept(data) {
    if (data.content === true) {
        $(this).hide();
        $('.quest-checkins__amount').each(function () {
            var checkinsAmount = $(this).text().split('/');
            ++checkinsAmount[0];
            $(this).text(checkinsAmount.join('/'));
        });
        $(this)
            .parent()
            .siblings('.quest-card__attributes_relative')
            .find('.quest-card__state-photo')
            .text('Этап пройден');
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
    $('.quest__checkin').click(checkinHandler);
});
