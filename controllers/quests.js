'use strict';

exports.list = function (req, res) {
    res.render('quests/quests', {
        quests: [{
            name: 'first_quest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Morbi nec vehicula sem, eget faucibus magna. Nam sapien est, cursus vel elementum' +
            ' at, finibus ac ipsum. Phasellus ut quam id sem ullamcorper tincidunt. Vestibulum' +
            ' a magna eros. Nunc quam arcu, egestas nec felis ut, hendrerit volutpat nibh. ' +
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia ' +
            'Curae; Nullam odio massa, finibus nec tellus in, mattis varius metus. Sed vitae nibh' +
            ' at sapien euismod semper. Donec rutrum elementum diam nec egestas. Duis interdum,' +
            ' tellus non sollicitudin commodo, tellus diam aliquet nulla,' +
            ' a maximus mauris mauris id enim.',
            url: 'http://voenpro.ru/img2/images/flag-ekaterinburga-05.jpg'
        }, {
            name: 'second_quest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Morbi nec vehicula sem, eget faucibus magna. Nam sapien est, cursus vel elementum' +
            ' at, finibus ac ipsum. Phasellus ut quam id sem ullamcorper tincidunt. Vestibulum' +
            ' a magna eros. Nunc quam arcu, egestas nec felis ut, hendrerit volutpat nibh. ' +
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia ' +
            'Curae; Nullam odio massa, finibus nec tellus in, mattis varius metus. Sed vitae nibh' +
            ' at sapien euismod semper. Donec rutrum elementum diam nec egestas. Duis interdum,' +
            ' tellus non sollicitudin commodo, tellus diam aliquet nulla,' +
            ' a maximus mauris mauris id enim.',
            url: 'http://voenpro.ru/img2/images/flag-ekaterinburga-05.jpg'
        }, {
            name: 'third_quest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Morbi nec vehicula sem, eget faucibus magna. Nam sapien est, cursus vel elementum' +
            ' at, finibus ac ipsum. Phasellus ut quam id sem ullamcorper tincidunt. Vestibulum' +
            ' a magna eros. Nunc quam arcu, egestas nec felis ut, hendrerit volutpat nibh. ' +
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia ' +
            'Curae; Nullam odio massa, finibus nec tellus in, mattis varius metus. Sed vitae nibh' +
            ' at sapien euismod semper. Donec rutrum elementum diam nec egestas. Duis interdum,' +
            ' tellus non sollicitudin commodo, tellus diam aliquet nulla,' +
            ' a maximus mauris mauris id enim.',
            url: 'http://www.tunnel.ru/i/post/47/470566/541743/at168884312.jpg'
        }, {
            name: 'fourth_quest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Morbi nec vehicula sem, eget faucibus magna. Nam sapien est, cursus vel elementum' +
            ' at, finibus ac ipsum. Phasellus ut quam id sem ullamcorper tincidunt. Vestibulum' +
            ' a magna eros. Nunc quam arcu, egestas nec felis ut, hendrerit volutpat nibh. ' +
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia ' +
            'Curae; Nullam odio massa, finibus nec tellus in, mattis varius metus. Sed vitae nibh' +
            ' at sapien euismod semper. Donec rutrum elementum diam nec egestas. Duis interdum,' +
            ' tellus non sollicitudin commodo, tellus diam aliquet nulla,' +
            ' a maximus mauris mauris id enim.',
            url: 'http://to-world-travel.ru/img/2015/042501/2112970'
        }, {
            name: 'fifth_quest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Morbi nec vehicula sem, eget faucibus magna. Nam sapien est, cursus vel elementum' +
            ' at, finibus ac ipsum. Phasellus ut quam id sem ullamcorper tincidunt. Vestibulum' +
            ' a magna eros. Nunc quam arcu, egestas nec felis ut, hendrerit volutpat nibh. ' +
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia ' +
            'Curae; Nullam odio massa, finibus nec tellus in, mattis varius metus. Sed vitae nibh' +
            ' at sapien euismod semper. Donec rutrum elementum diam nec egestas. Duis interdum,' +
            ' tellus non sollicitudin commodo, tellus diam aliquet nulla,' +
            ' a maximus mauris mauris id enim.',
            url: 'http://f9.mirkvartir.me/1024x768/95/9524b66c-3554-499a-b21f-231383fbcf25.jpg'
        }],
        data: req.render_data
    });
};

exports.addQuestPage = function (req, res) {
    res.render('addquest/addquest', {
        data: req.render_data
    });
}

