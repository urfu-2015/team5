'use strict';

exports.list = function (req, res) {
    console.log(req.param.name);
    res.render('quests/list', {
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
        }]
    });
};

exports.content = function (req, res) {
    console.log(req.param('name'));
    res.render('quests/quest', {
        name: req.param('name'),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Morbi nec vehicula sem, eget faucibus magna. Nam sapien est, cursus vel elementum' +
        ' at, finibus ac ipsum. Phasellus ut quam id sem ullamcorper tincidunt. Vestibulum' +
        ' a magna eros. Nunc quam arcu, egestas nec felis ut, hendrerit volutpat nibh. ' +
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia ' +
        'Curae; Nullam odio massa, finibus nec tellus in, mattis varius metus. Sed vitae nibh' +
        ' at sapien euismod semper. Donec rutrum elementum diam nec egestas. Duis interdum,' +
        ' tellus non sollicitudin commodo, tellus diam aliquet nulla,' +
        ' a maximus mauris mauris id enim.',
        pictures: [
            {
                url: 'http://travelucion.ru/Yekaterinburg/Yekaterinburg-84147.JPG',
                name: 'First photo'
            }, {
                url: 'http://www.2do2go.ru/uploads/full/b627d145dd2f6905549f259eaa4d584a_w960_h2048.jpg',
                name: 'Second photo'
            }, {
                url: 'http://www.2do2go.ru/uploads/full/b627d145dd2f6905549f259eaa4d584a_w960_h2048.jpg',
                name: 'Third photo'
            }, {
                url: 'http://www.2do2go.ru/uploads/full/b627d145dd2f6905549f259eaa4d584a_w960_h2048.jpg',
                name: 'Fourth photo'
            }, {
                url: 'http://www.2do2go.ru/uploads/full/b627d145dd2f6905549f259eaa4d584a_w960_h2048.jpg',
                name: 'Fifth photo'
            }
        ]
    })
};