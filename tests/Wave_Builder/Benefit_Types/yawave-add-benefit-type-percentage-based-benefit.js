/** Add benefit type: Percentage Based Benefit **/

var args = require('../arguments.json');
var key = "yawave-add-benefit-type-percentage-based-benefit";

if (args[key] !== undefined) {
  var domain = args[key].domain;
  var email = args[key].email;
  var pass = args[key].pass;
  var WaveId = args[key].WaveId;
  var AmountDivisibility = args[key].AmountDivisibility;
  var ConsumptionCondition = args[key].ConsumptionCondition;
  var ConsumptionAmount = args[key].ConsumptionAmount;
  var ConsumptionCurrency = args[key].ConsumptionCurrency;
  var Cumulation = args[key].Cumulation;
  var Transferability = args[key].Transferability;
  var Form = args[key].Form;
  var DeliveryInterval = args[key].DeliveryInterval;
  var LastDeliveryPoint = args[key].LastDeliveryPoint;
  var LeftBenefitCondition = args[key].LeftBenefitCondition;
}

casper.test.begin('Testing functionality adding Benefit Type: Payout Benefits', function (test) {
  casper.start(domain, function () {
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
    test.comment('⌚️ Opening the Wave page');
    casper.echo(this.getTitle(), 'INFO');
  });

  casper.then(function () {
    test.assertExists('.menu-benefits-children-title', 'Check if "Benefit Type" the title exists');
    this.click('[data-id="benefits"]');
    test.comment('⌚️ Clicking on menu Benefit');
  });

  casper.then(function () {
    casper.echo(this.getTitle(), 'INFO');
    test.assertExists('[title="Add benefit widget"]', 'Check if "Add Benefit" the button exists');
    test.comment('⌚️ Clicking on button Add Benefit');
    this.click('.idevels-widget-benefit-form .fields-actions a.add-field');
  });

  casper.then(function () {
    this.fetchText('.field-group-div h3');
    test.assertExists('#widget-add-percentage-based-coupon', 'Check if the "Percentage based Benefit" type exists');
    this.click('#widget-add-percentage-based-coupon > div > a');
    test.comment('⌚️ Clicking on Benefit type - Payout Benefit');

  });

  /** ======================== Benefit Type page ===================== **/
  casper.then(function () {

    /** --------- Term & Conditions --------- **/
    casper.echo(this.getTitle(), 'INFO');

    test.comment('⌚️ Filling fields on block - Terms & Conditions');
    casper.fillSelectors('.idevels-widget-entity-form', {
      //Currency

      //Amount Divisibility
      '[id^=yw_select_amountdivisibility_]': AmountDivisibility,

      //Consumption Condition
      '[id^=yw_select_consumptioncondition_]': ConsumptionCondition,

      //Consumption Amount
      '[id^=yw_textbox_consumptionamount_]': ConsumptionAmount,

      //Consumption Currency
      '[id^=yw_select_consumptioncurrency_]': ConsumptionCurrency,

      //Max. Amount per Beneficiary
      //TODO - Add click on the switch-wrapper and after fill the numbers
      //'[id^=yw_textbox_maxamount_]': '1000', //value : only numbers

      //Validity Start Date
      //'[id^=yw_textbox_startdate_]' : '2015-08-15',  //

      //Expiration Date
      //'[id^=yw_textbox_expirationdate_]' : '2015-08-16',
      //@TODO - FireFox, IE, Safari (yyyy-mm-dd); Chrome (mm/dd/yyyy)

      //Cumulation
      '[id^=yw_select_cumulation_]': Cumulation,

      //Transferability
      '[id^=yw_select_transferability_]': Transferability,

      //Term description (language) | (Char free)
      //'[id^=yw_termdescription_hidden_]' : '1',

      /** -------------- Delivery Form ---------------- **/
      //Form
        '[id^=yw_select_deliveryform_]': Form,

      //Delivery interval
      '[id^=yw_select_deliveryinterval_]': DeliveryInterval,

      //Last delivery point in time after wave ending
      '[id^=yw_select_last_delivery_point_]': LastDeliveryPoint,

      //If Benefit in no Wallet left
      '[id^=yw_select_leftbenefitcondition_]': LeftBenefitCondition
    });

    this.click('.page-submit-button');

    this.test.comment('⌚️  Saving add benefit...');
  });

  casper.then(function () {
    casper.waitWhileSelector('.node-wave-secondary-menu', function () {
    });
  });

  casper.run(function () {
    test.done();

    test.pass('Created Benefit Type: Percentage Based Benefit with number - ' + this.fetchText('.idevels-widget-content-benefit-form table tr:last-child .benefit-number'));
  });
});
