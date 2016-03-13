'use strict';

module.exports.content = function (req, res) {
      res.render('quest', {
          name: '1 quest',
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