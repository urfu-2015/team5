var createPhotoDiv = function (opts) {
    var newPhotoDiv = $('<div>');
    var hasMadeAnotherDiv;
    newPhotoDiv.removeClass('managequest__template');
    newPhotoDiv.html($('.managequest__template').html());
    newPhotoDiv.find('.managequest__removephoto').click(function () {
        newPhotoDiv.remove();
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
    $div.find('.managequest__pictureName').attr('value', opts.name);
    $div.find('.managequest__pictureDescription').attr('value', opts.description);
    $div.find('.quest-form__pic-container').show();
    $div.find('.managequest__picImg').attr('src', opts.url);
    $div.find('.managequest__picInput').hide();
    $div.find('.managequest__pictureId').attr('value', opts.id);
};

var appendPhotoDiv = function (div) {
    var photoplace = $('.managequest__photoplace');
    photoplace.append(div);
    photoplace.append($('<hr class="featurette-divider">'));
};

var onLoad = function () {
    if (!$('.managequest__form').length) {
        return;
    }
    existingPhotos.forEach(function (photo) {
        appendPhotoDiv(createPhotoDiv(photo));
    });
    $('.managequest__addphoto').click(function () {
        appendPhotoDiv(createPhotoDiv());
    });
    appendPhotoDiv(createPhotoDiv());

};

$(window).ready(onLoad);
