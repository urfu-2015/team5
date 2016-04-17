var createPhotoDiv = function () {
    var newPhotoDiv = $('<div>');
    var hasMadeAnotherDiv;
    newPhotoDiv.html($('.addquest__template').html());
    newPhotoDiv.find('.addquest__removephoto').click(function () {
        newPhotoDiv.remove();
    });
    var idPrefix = Date.now() + '-';
    newPhotoDiv.children().filter(function (i, el) {
        return $(el).attr('id') != '';
    }).each(function (i, el) {
        $(el).attr('id', idPrefix + $(el).attr('id'));
    });
    return newPhotoDiv;
};

var setArrayIndicesForChildrens = function (element, index) {
    $(element).children().filter(function (i, el) {
        return $(el).attr('name') != '';
    }).each(function (i, el) {
        $(el).attr('name', $(el).attr('name') + '[' + index + ']');
    });
};

var setArrayIndicesForPhotos = function () {
    return; //Если что, верну
    $('.addquest__photoplace').children().each(function (i, el) {
        setArrayIndicesForChildrens(el, i);
    });
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
    $('.addquest__form').submit(setArrayIndicesForPhotos);
};

window.addEventListener('load', onLoad);