var isFileApi = (window.Blob && window.File &&
window.FileList && window.FileReader);

function setValidator() {
    $.validator.addMethod('hasOneStation', function () {
        return $('.redo-quest-form').find('.redo-quest-form__station').length > 0;
    });
    $.validator.addMethod('photoExists', function (value) {
        return (value && value.length > 0);
    });
}

function validateQuestForm() {
    $('.redo-quest-form').validate({
        rules: {
            'redo-quest-form__name': {
                required: true,
                maxlength: 100
            },
            'redo-quest-form__description': {
                required: true,
                maxlength: 400
            },
            'pictureFiles[]': {
                photoExists: true
            },
            'redo-quest-form__name-station': {
                required: true,
                maxlength: 100
            },
            'redo-quest-form__description-station': {
                required: true,
                maxlength: 400
            },
            'redo-quest-form__hidden-checker': {
                hasOneStation: true
            }
        },
        messages: {
            'redo-quest-form__name': {
                maxlength: 'Более 100 символов',
                required: 'Введите назавание'
            },
            'redo-quest-form__description': {
                maxlength: 'Более 400 символов',
                required: 'Введите описание'
            },
            'pictureFiles[]': {
                photoExists: 'Добавьте фото'
            },
            'redo-quest-form__hidden-checker': {
                hasOneStation: 'Необходимо добавить хотя бы одну станцию'
            },
            'redo-quest-form__name-station': {
                required: 'Введите название станции',
                maxlength: 100
            },
            'redo-quest-form__description-station': {
                required: 'Введите описание станции',
                maxlength: 400
            }
        },
        focusInvalid: false,
        errorPlacement: function (errorLabel, element) {
            var warningContainer;
            if (element.is('.redo-quest-form__hidden-checker')) {
                warningContainer = $('.redo-quest-form').find('.redo-quest-form__error-container_no-quest');
            } else {
                warningContainer = element.parent().find('.redo-quest-form__error-container');
            }
            warningContainer.append(errorLabel);
        },
        highlight: function (element) {
            $(element).prev().prev().removeClass('redo-quest-form__error-container_empty');
        },
        unhighlight: function (element) {
            $(element).prev().addClass('redo-quest-form__error-container_empty');
        },
        submitHandler: function () {
            console.log('submit');
        }
    });
}

var createPhotoDiv = function (opts) {
    var newPhotoDiv = $('<div>');
    newPhotoDiv.addClass('redo-quest-form__station');
    var hasMadeAnotherDiv;
    newPhotoDiv.removeClass('manage-quest__template');
    newPhotoDiv.html($('.manage-quest__template').html());
    //обработчик на удаление
    newPhotoDiv.find('.manage-quest__removephoto').click(function () {
        newPhotoDiv.next().remove();
        newPhotoDiv.remove();
    });

    var fileInput = newPhotoDiv.find('.manage-quest__pic-input');

    fileInput.on('change', function () {
        if (isFileApi) {
            loadImage(
                this.files[0],
                function (img) {
                    fileInput.parent().find('.quest-form__img-place').html('');
                    $(img).addClass('redo-quest-form__image');
                    fileInput.parent().find('.quest-form__img-place').append(img);
                },
                {maxHeight: 130}
            );
        }
    });
    var idPrefix = Date.now() + '-';
    newPhotoDiv.find('*').filter(function (i, el) {
        return $(el).attr('id') !== undefined;
    }).each(function (i, el) {
        $(el).attr('id', idPrefix + $(el).attr('id'));
    });
    if (opts) {
        fillPhotoDiv(newPhotoDiv, opts);
    }
    return newPhotoDiv;
};

var fillPhotoDiv = function ($div, opts) {
    $div.find('.manage-quest__pictureName').attr('value', opts.name);
    $div.find('.manage-quest__pictureDescription').attr('value', opts.description);
    $div.find('.quest-form__pic-container').show();
    $div.find('.manage-quest__picImg').attr('src', opts.url);
    $div.find('.manage-quest__pic-input').hide();
    $div.find('.manage-quest__pictureId').attr('value', opts.id);
};

var appendPhotoDiv = function (div) {
    var photoplace = $('.manage-quest__photoplace');
    photoplace.append(div);
    photoplace.append($('<hr class="featurette-divider">'));
};

var onLoad = function () {
    if (!$('.manage-quest__form').length) {
        return;
    }
    setValidator();
    validateQuestForm();

    existingPhotos.forEach(function (photo) {
        appendPhotoDiv(createPhotoDiv(photo));
    });
    $('.manage-quest__addphoto').click(function () {
        appendPhotoDiv(createPhotoDiv());
    });
    appendPhotoDiv(createPhotoDiv());
};

$(document).ready(onLoad);
