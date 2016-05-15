var createPhotoDiv = function () {
    var newPhotoDiv = $('<div>');
    var hasMadeAnotherDiv;
    newPhotoDiv.html($('.addquest__template').html());
    newPhotoDiv.find('.addquest__removephoto').click(function () {
        newPhotoDiv.remove();
    });
    var idPrefix = Date.now() + '-';
    newPhotoDiv.find('*').filter(function (i, el) {
        return $(el).attr('id') !== undefined;
    }).each(function (i, el) {
        $(el).attr('id', idPrefix + $(el).attr('id'));
    });
    return newPhotoDiv;
};

var appendPhotoDiv = function (div) {
     $('.addquest__photoplace').append(div);
};

var onLoad = function () {  
    if (!$('.addquest__form').length) {
        return;
    }
    $('.addquest__addphoto').click(function () {
        appendPhotoDiv(createPhotoDiv());
    });
    appendPhotoDiv(createPhotoDiv());
};

$(window).ready(onLoad);
