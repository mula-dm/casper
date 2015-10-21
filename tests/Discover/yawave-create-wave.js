/** Automated test for create wave **/

var Yawave = require('../../yawave-functions.js');

casper.test.begin('Testing of creating wave functionality', function (test) {
  Yawave.signIn(test);

  casper.then(function() {
    Yawave.createWave(test);

  });

  casper.run(function () {
    //test.pass('Wave with name: ' + TitleWave + ' has been created');
    test.done();
  });
});
