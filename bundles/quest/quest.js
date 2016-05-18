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
        $(this).remove();
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
    $('.quest-start__button').click(startQuest);
    $('.quest-end__button').click(endQuest);
    $('.quest-reset__button').click(resetQuest);
});

function startQuest() {
    var id = $('.quest').data('id');
    $.post({
        url: '/quests/start/' + id,
        success: onStartSuccess.bind(this)
    });
}

function endQuest() {
    var id = $('.quest').data('id');
    $.post({
        url: '/quests/end/' + id,
        success: onEndSuccess.bind(this)
    });
}

function resetQuest() {
    var id = $('.quest').data('id');
    $.post({
        url: '/quests/reset/' + id,
        success: onResetSuccess
    });
}

function onStartSuccess() {
    $(this).unbind();
    $(this).text('Закончить квест');
    $(this).click(endQuest);
}

function onEndSuccess() {
    $(this).unbind();
    $(this).text('Начать квест');
    $(this).click(startQuest);
}

function onResetSuccess() {
    $('.quest-checkins__amount').each(function () {
        var checkinsAmount = $(this).text().split('/');
        checkinsAmount[0] = 0;
        $(this).text(checkinsAmount.join('/'));
    });
    $('.quest-card__state-photo').each(function () {
        if ($(this).text().trim() === 'Этап пройден') {
            var newDiv = $('<div>', {
                'class': 'quest-form__centred-container'
            });
            var newButton = $('<button>', {
                'text': 'Пройти этап',
                'type': 'button',
                'class': 'quest-form__button quest__checkin'
            });
            newButton.click(checkinHandler);
            newButton.appendTo(newDiv);
            $(this)
                .closest('.quest-card__attributes_relative')
                .before(newDiv);
        }
        $(this).text('Этап не пройден');
    });
}
