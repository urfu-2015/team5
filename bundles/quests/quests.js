$('.js-add-like').click(toggleLikeQuest);

function toggleLikeQuest(e) {
    var $button = $(this);
    var valueLike = $($button.parent().find('.js-value-like'));
    var existUserLike = $button.data('like-id');
    var type = $button.data('type');
    var entityId = $button.data('id');
    if (existUserLike) {
        $.ajax({
            url: '/' + type + '/' + entityId + '/like/' + existUserLike,
            type: 'DELETE'
        });
        $button.data('like-id', '');
        valueLike.html(+valueLike.html() - 1);
        $button.find('.quest-card__like-disable').toggleClass('grayscale');
    } else {
        $.post('/' + type + '/' + entityId + '/like').then(
            function (data) {
                if (data._id) {
                    $button.data('like-id', data._id);
                    valueLike.html(+valueLike.html() + 1);
                    $button.find('.quest-card__like-disable').toggleClass('grayscale');
                }
            }
        );
    }
}
