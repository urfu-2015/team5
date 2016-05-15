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