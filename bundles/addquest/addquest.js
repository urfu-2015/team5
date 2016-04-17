var createPhotoDiv = function () {
    var newPhotoDiv = $('<div>');
    newPhotoDiv.html($('.addquest__template').html());
    return newPhotoDiv;
};

var onLoad = function () {
    $('.addquest__photoplace').append(createPhotoDiv());  
};

window.addEventListener('load', onLoad);