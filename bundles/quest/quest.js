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
    $('.quest-start__button').click(startQuest);
});

function startQuest() {
    var id = $('.quest').data('id');
    $.post({
        url: '/quests/start/' + id,
        success: onStartSuccess
    });
}

function onStartSuccess(data) {
    alert(JSON.stringify(data));
}
