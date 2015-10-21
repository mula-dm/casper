/** Automated test for add messages types **/

var args = require('../arguments.json');
var key = "yawave-add-messages";

if (args[key] !== undefined) {
  var domain = args[key].domain;
  var email = args[key].email;
  var pass = args[key].pass;
  var WaveId = args[key].WaveId;
  var messageType = args[key].messageType;
  var types = args[key].messageNameType;
}

casper.test.begin('Testing functionality create add messages type', function (test) {
  casper.start(domain, function () {
    test.comment('Authorization open on site!');
    casper.setHttpAuth('ch', 'ch000');
    casper.echo(this.getTitle(), 'INFO');

  });

  /** ===================== Sign Up/In page =========================== **/
  casper.thenOpen(domain + 'user/', function () {
    casper.echo(this.getTitle(), 'INFO');
    test.assertExists('.yawave-signin-form', 'Check if "Sign In" form exists');
    test.assertExists('#edit-name', 'Check if "Email" field exists');
    test.comment('⌚️ Inputting email address in the "Email" field  - ' + email);

    this.fillSelectors('.yawave-signin-form', {
      '.form-item-name input': email
    });

    test.assertExist('#edit-pass', '⌚️ Inputting password in the "Password" field  - ' + pass);
    this.fillSelectors('.yawave-signin-form', {
      '.form-item-pass input': pass
    });

    test.assertExists('.form-submit', 'Check if submit button exists on user login page.');
    this.click('.form-submit');
    test.comment('⌚️ Clicking on button Sign In...');
    casper.waitWhileSelector('.sign-out', function () {
    });

  });

  /** ===================== Wave Builder page =========================== **/
  casper.thenOpen(domain + 'node/' + WaveId + '/plan-modify/pages/*', function () {
    test.comment('Opening wave page');
    casper.echo(this.getTitle(), 'INFO');
  });

  casper.then(function () {
    test.assertExists();
    this.click('.menu-parents-wrapper [data-id="messages"]');
    test.comment('⌚️ Clicking on menu Messages');
  });

  casper.then(function () {
    test.assertExists();
    this.click('.idevels-message-form .fields-actions a.add-field');

  });
  casper.then(function () {
    test.assertExists();
    this.click('.widgets-wrapper .widget-element:nth-child(' + messageType + ') a');
  });

  casper.then(function () {
    test.assertExists();
    this.click('.node-message-form .form-submit');
  });
  test.assertExists();
  casper.waitForSelector('.settings-menu-wrapper');

  casper.then(function () {
    test.assertExists();
  });

  casper.run(function () {
    test.done();
    test.pass('Added messages type! ' + types[messageType]);
  });
});
