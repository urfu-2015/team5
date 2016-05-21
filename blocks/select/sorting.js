$('.sort-quests').change(function () {
    var param = '';

    if ($('.sort-quests__age').prop('selected')) {
        param = 'ageasc';
    }
    if ($('.sort-quests__age-rev').prop('selected')) {
        param = 'agedesc';
    }
    if ($('.sort-quests__comments').prop('selected')) {
        //location = 'quests/quests';
        param = 'commasc';
    }
    if ($('.sort-quests__likes').prop('selected')) {
        param = 'likeasc';
    }
    if ($('.sort-quests__alphabet').prop('selected')) {
        param = 'alphasc';
    }

    $.ajax({
        type: "GET",
        url: '/quests/sort',
        dataType: "text",
        data: {
            sp: param
        },
        success: function () {
            if (param.length !== 0) {
                location = '/quests/sort?sp=' + param;
            } else {
                location = '/';
            }
        }
    });
});
