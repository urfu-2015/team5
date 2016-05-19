$('.sort').change(function () {
    var param = '';

    if ($('.sort_age').prop('selected')) {
        param = 'ageasc';
    }
    if ($('.sort_age_rev').prop('selected')) {
        param = 'agedesc';
    }
    if ($('.sort_comments').prop('selected')) {
        //location = 'quests/quests';
        param = 'commasc';
    }
    if ($('.sort_likes').prop('selected')) {
        param = 'likeasc';
    }
    if ($('.sort_alphabet').prop('selected')) {
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
