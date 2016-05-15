$('.js-quest-add-like').click(toggleLikeQuest);
function toggleLikeQuest(e) {
    var $button = $(this);
    var valueLike = $($button.parent('.js-quest-attributes').find('.js-quest-value-like'));
    var existUserLike = $button.data('like-id');
    var questId = $button.data('id');
    if (existUserLike) {
        $.ajax({
            url: '/quest/' + questId + '/like/' + existUserLike,
            type: 'DELETE'
        });
        $button.data('like-id', '');
        valueLike.html(+valueLike.html() - 1);
    } else {
        $.post('/quest/' + questId + '/like').then(
            function (data) {
                if (data._id) {
                    $button.data('like-id', data._id);
                    valueLike.html(+valueLike.html() + 1);
                }
            }
        );
    }
    $button.find('.quest-card__like-disable').toggleClass('grayscale');
}
