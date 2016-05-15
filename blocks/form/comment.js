function updComment() {
    //Изменение комментария
}

function delComment() {
    var commentId = $(this).closest('.comment').attr('data-id');
    $.ajax({
        type: "DELETE",
        url: '/comment/' + commentId,
        success: deleteComment.bind(this)
    });
}

function addComment() {
    var content = $(this).parent().parent().find('.comment__new').val();
    if ($.trim(content) === '') {
        return;
    }
    var questId = $(this).closest('.quest').attr('data-id');
    var pictureId = $(this).closest('.quest__one-picture').attr('data-id');
    $.ajax({
        type: "POST",
        url: '/comment',
        data: {
            content: content,
            quest_id: questId,
            picture_id: pictureId
        },
        success: createComment.bind(this)
    });
}

function createComment(data) {
    $(this).parent().parent().find('.comment__new').val('');
    var commentsBlock = $(this).parent().parent().parent().parent().find('.comments');
    console.log($(this).parents());
    var newCommentDiv = $('<div>', {
        'class': 'comment comment_modal',
        'data-id': data.id
    });
    var newUserDiv = $('<div>', {
        'class': 'comment__user',
        'text': data.user
    });
    var newContentDiv = $('<div>', {
        'class': 'comment__content',
        'text': data.content
    });
    var newDelButton = $('<button>', {
        'text': 'Удалить комментарий',
        'class': 'comment__button-del btn btn-default quest-form__button'
    });
    newDelButton.click(delComment);
    var newUpdButton = $('<button>', {
        'text': 'Изменить комментарий',
        'class': 'comment__button-upd btn btn-default quest-form__button'
    });
    newUpdButton.click(updComment);
    newDelButton.appendTo(newCommentDiv);
    newUpdButton.appendTo(newCommentDiv);
    newUserDiv.appendTo(newCommentDiv);
    newContentDiv.appendTo(newCommentDiv);
    newCommentDiv.appendTo(commentsBlock);
}

function deleteComment() {
    $(this).closest('.comment').remove();
}

$('.comment__button-add').click(addComment);
$('.comment__button-del').click(delComment);
$('.comment__button-upd').click(updComment);
