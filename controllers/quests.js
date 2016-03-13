'use strict';

exports.quests = function (req, res) {
    res.render('quests/list', {
        quests:[{
            name: 'first_quest',
            description: 'Первый Первый Первый Первый' +
            ' первый первый первый первый первый первый' +
            'первый первый первый первый первый первый первый первый',
            url: 'http://voenpro.ru/img2/images/flag-ekaterinburga-05.jpg'
        },{
            name: 'second_quest',
            description: 'Второй второй' + 'второй'.repeat(100),
            url: 'http://voenpro.ru/img2/images/flag-ekaterinburga-05.jpg'
        },{
            name: 'third_quest',
            description: 'Третий' + 'третий'.repeat(89),
            url: 'http://www.tunnel.ru/i/post/47/470566/541743/at168884312.jpg'
        },{
            name: 'fourth_quest',
            description: 'Четвертый' + 'четвертый'.repeat(70),
            url: 'http://to-world-travel.ru/img/2015/042501/2112970'
        },{
            name: 'fifth_quest',
            description: 'Пятый' + 'пятый'.repeat(89),
            url: 'http://f9.mirkvartir.me/1024x768/95/9524b66c-3554-499a-b21f-231383fbcf25.jpg'
        }]
    });
};
