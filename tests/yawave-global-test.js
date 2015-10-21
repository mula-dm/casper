var Yawave = require('../yawave-functions.js');

casper.test.begin('Testing of creating wave functionality', function (test) {
  Yawave.signIn(test);

  casper.then(function() {
    Yawave.createWave(test);
  });

  casper.then(function () {
    Yawave.addPayoutBenefit(test);
  });

  casper.then(function () {
    Yawave.addPointsBenefit(test);
  });

  casper.then(function () {
    Yawave.addMoneyBenefit(test);
  });

  casper.then(function() {
    Yawave.addEventBooster(test);
  });

  casper.run(function () {
    //test.pass('Wave with name: ' + TitleWave + ' has been created');
    test.done();
  });
});
