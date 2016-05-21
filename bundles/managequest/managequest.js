var isGeoApi = (navigator.geolocation !== undefined);

var isFileApi = (window.Blob && window.File &&
window.FileList && window.FileReader);

function setValidator() {
    $.validator.addMethod('hasOneStation', function () {
        return $('.redo-quest-form').find('.redo-quest-form__station').length > 0;
    });
    $.validator.addMethod('photoExists', function (value) {
        return (value && value.length > 0);
    });
    $.validator.addMethod('isLocation', function (value) {
        return value.match(/\d+:\d+/);
    });
}

function validateQuestForm() {
    $('.redo-quest-form').validate({
        rules: {
            'name': {
                required: true,
                maxlength: 100
            },
            'description': {
                required: true,
                maxlength: 400
            },
            'pictureFiles[]': {
                photoExists: true
            },
            'pictureNames[]': {
                required: true,
                maxlength: 100
            },
            'pictureDescriptions[]': {
                required: true,
                maxlength: 400
            },
            'redo-quest-form__hidden-checker': {
                hasOneStation: true
            },
            'pictureLocations[]': {
                isLocation: true
            }
        },
        messages: {
            'name': {
                maxlength: 'Более 100 символов',
                required: 'Введите назавание'
            },
            'description': {
                maxlength: 'Более 400 символов',
                required: 'Введите описание'
            },
            'pictureFiles[]': {
                photoExists: 'Добавьте фото'
            },
            'redo-quest-form__hidden-checker': {
                hasOneStation: 'Необходимо добавить хотя бы одну станцию'
            },
            'pictureNames[]': {
                required: 'Введите название станции',
                maxlength: 100
            },
            'pictureDescriptions[]': {
                required: 'Введите описание станции',
                maxlength: 400
            },
            'pictureLocations[]': {
                isLocation: 'Нажмите на кнопку "Местоположение"'
            }
        },
        focusInvalid: false,
        errorPlacement: function (errorLabel, element) {
            var warningContainer;
            if (element.is('.redo-quest-form__hidden-checker')) {
                warningContainer = $('.redo-quest-form').find('.redo-quest-form__error-container_no-quest');
            } else {
                if (element.is('.redo-quest-form__hidden-text-input')) {
                    warningContainer = element.next('.quest-form__form-elem').find('.redo-quest-form__error-container');
                    errorLabel.addClass('redo-quest-form__controlled-error-label')
                } else {
                    warningContainer = element.parent().find('.redo-quest-form__error-container');
                }
            }
            warningContainer.append(errorLabel);
        },
        highlight: function (element) {
            $(element).prev().prev().removeClass('redo-quest-form__error-container_empty');
        },
        unhighlight: function (element) {
            $(element).prev().addClass('redo-quest-form__error-container_empty');
        }
    });
}

function setInput(data, position) {
    var newStr = data.template.replace('!latitude!', position.coords.latitude)
        .replace('!longitude!', position.coords.longitude);
    data.placeInsert[data.methodInsert](newStr);
    data.placeInsert.blur();
    data.position = position;
}

function getLocation(handlers) {
    if (!isGeoApi) {
        console.warn('Не можем установить геолокацию =(');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            handlers.forEach(function (handler) {
                handler(position);
            })
        },
        function (error) {
            console.error(error);
        },
        {
            enableHighAccuracy: true
        }
    );
}

var createPhotoDiv = function (opts) {
    var newPhotoDiv = $('<div>');
    newPhotoDiv.addClass('redo-quest-form__station');
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
                    fileInput.blur();
                },
                {maxHeight: 130}
            );
        }
    });

    var idPrefix = Date.now() + '-';
    newPhotoDiv.find('*').filter(function (index, element) {
        return $(element).attr('id') !== undefined;
    }).each(function (index, element) {
        $(element).attr('id', idPrefix + $(element).attr('id'));
    });

    newPhotoDiv.find('.manage-quest__location-button').on('click', function () {
            getLocation.bind(null, [
                setInput.bind(null, {
                    placeInsert: newPhotoDiv.find('.manage-quest__picture-format-location'),
                    methodInsert: 'val',
                    template: 'Станция находиться на широте !latitude! и ' +
                    'долготе !longitude!'
                }),
                setInput.bind(null, {
                    placeInsert: newPhotoDiv.find('.manage-quest__picture-location'),
                    methodInsert: 'val',
                    template: '!latitude!;!longitude!'
                })
            ])();
        }
    );

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
