$('.sort').change(changeOption);

function changeOption(e) {
    "use strict";
    var $quests = $('.quest');
    var comparator;

    if ($('.sort_age').prop('selected')) {
        comparator = function(a, b) {
            return $(b).data('uploaded') -
                $(a).data('uploaded');
        };
    }
    if ($('.sort_comments').prop('selected')) {
        comparator = function(a, b) {
            return $(a).find('.js-quest-value-like').html() -
                $(b).find('.js-quest-value-like').html();
        };
    }
    if ($('.sort_likes').prop('selected')) {
        comparator = function(a, b) {
            return $(a).find('.quest-checkins__amount').html().split('/')[0] -
                $(b).find('.quest-checkins__amount').html().split('/')[0];
        };
    }
    bubleSort($quests, comparator);

    var $parent = $quests[0].parentNode;
    for (var i = 1; i < $quests.length; i++) {
        $parent.removeChild($quests[i]);
    }
    for (var i = 1; i < $quests.length; i++) {
        $parent.appendChild($quests[i]);
    }
}

function bubleSort(array, comparator) {
    "use strict";
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (comparator(array[j], array[j + 1])) {
                array[j] = [array[j + 1], array[j + 1] = array[j]][0];
            }
        }
    }
}
