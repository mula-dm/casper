/**
 * @file
 * Testing functionality "sign in" user through email.
 */
var Yawave = require('../../yawave-functions.js');

casper.test.begin('Testing functionality sign in user through email', function (test) {
  Yawave.signIn(test);
  casper.run(function () {
    //test.pass('Signed In ' + this.fetchText('.idevels-main-menu li.sign-out.menu-link > a span'));
    test.done();
  });
});
