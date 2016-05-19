function displayWarning(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status == 401) {

    }
}

function savComment() {
    var content = $(this)
        .closest('.comment__edit')
        .find('.comment__text ')
        .val();
    if ($.trim(content) === '') {
        return;
    }
    var commentId = $(this).closest('.comment').attr('data-id');
    $.ajax({
        type: "PUT",
        url: '/comment/' + commentId,
        data: {
            content: content
        },
        success: updateComment.bind(this),
        error: displayWarning.bind(this)
    });
}

function updComment() {
    $(this).closest('.comment').children().hide();
    var editForm = $(this).siblings('.comment__edit');
    var text = $(this).siblings('.comment__content').text();
    editForm.show();
    editForm.find('.comment__text').val(text);
}

function delComment() {
    var commentId = $(this).closest('.comment').attr('data-id');
    $.ajax({
        type: "DELETE",
        url: '/comment/' + commentId,
        success: deleteComment.bind(this),
        error: displayWarning.bind(this)
    });
}

function addComment() {
    var content = $(this)
        .closest('.comment__form')
        .find('.comment__content ')
        .val();
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
        success: createComment.bind(this),
        error: displayWarning.bind(this)
    });
}

function createComment(data) {
    $(this)
        .closest('.comment__form')
        .find('.comment__content ')
        .val('');
    var commentsBlock = $(this).closest('.quest-form').prev();
    //проверка, что находимся в модальном окне
    var isModal = [].find.call($(this).parents(), function (elem) {
        return elem.className.match('modal-content');
    });
    var modalComment = isModal ? ' comment_modal' : '';
    var newCommentDiv = $('<div>', {
        'class': 'comment' + modalComment,
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
        'type': 'button',
        'class': 'comment__button-del btn btn-default quest-form__button'
    });
    newDelButton.click(delComment);
    var newUpdButton = $('<button>', {
        'text': 'Изменить комментарий',
        'type': 'button',
        'class': 'comment__button-upd btn btn-default quest-form__button'
    });
    newUpdButton.click(updComment);

    var newEditDiv = $('<div>', {
        'class': 'comment__edit quest-form'
    });
    var newTextDiv = $('<div>', {
        'class': 'floating-label-form-group quest-form__form-elem'
    });
    var newLabel = $('<label>', {
        'class': 'quest-form__input-name',
        'text': 'Изменение комментария',
        'for': 'description'
    });
    var newText = $('<textarea>', {
        'class': 'form-control comment__text',
        'rows': '2',
        'placeholder': 'Изменение комментария'
    });
    newLabel.appendTo(newTextDiv);
    newText.appendTo(newTextDiv);
    newTextDiv.appendTo(newEditDiv);
    var newSavButton = $('<button>', {
        'text': 'Сохранить изменения',
        'type': 'button',
        'class': 'comment__button-sav btn btn-default quest-form__button'
    });
    newSavButton.click(savComment);
    newSavButton.appendTo(newEditDiv);

    setFloatingLabel(newEditDiv);

    newDelButton.appendTo(newCommentDiv);
    newUpdButton.appendTo(newCommentDiv);
    newEditDiv.appendTo(newCommentDiv);
    newUserDiv.appendTo(newCommentDiv);
    newContentDiv.appendTo(newCommentDiv);
    newCommentDiv.appendTo(commentsBlock);
}

function deleteComment() {
    $(this).closest('.comment').remove();
}

function updateComment(data) {
    $(this)
        .closest('.comment')
        .find('.comment__content ')
        .text(data.content);
    $(this).closest('.comment').children().show();
    $(this).closest('.comment__edit').hide();
}

$('.comment__button-add').click(addComment);
$('.comment__button-del').click(delComment);
$('.comment__button-upd').click(updComment);
$('.comment__button-sav').click(savComment);
