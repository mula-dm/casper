/** Function "Sign In" for authorization user on site **/
exports.signIn = function (test) {
  var args = require('./arguments.json');
  var key = "yawave-sign-in-email";

  if (args[key] !== undefined) {
    var domain = args[key].domain;
    var email = args[key].email;
    var pass = args[key].pass;
  }

  casper.start(domain, function () {
    test.comment('Authorization pop-up opening on the site');
    this.setHttpAuth('ch', 'ch000');
    /*casper.then(function() {
      casper.setHttpAuth('ch', 'ch000');
    });*/
    test.comment('HTPASSWD is correct.');
  });

  /** ===================== Sign Up/In page =========================== **/
  casper.thenOpen(domain + 'user/', function () {

    casper.echo(this.getTitle(), 'INFO');


    /**
     * Check if "Sign In" form exists
     */
     if (this.exists('.yawave-signin-form')) {
      this.test.pass('"Sign In" form exists');
    } else {
      this.test.fail('"Sign In" form not exists');
    }
    //test.assertExists('.yawave-signin-form', 'Check if "Sign In" form exists');
    //test.assertExists('#edit-name', 'Check if Email field exists');
    //test.comment('⌚️ Inputting email address in the "Email" field  - ' + email);

    this.fillSelectors('.yawave-signin-form', {
      '.form-item-name input': email
    });

    //test.assertExist('#edit-pass', 'Check if Password field exists');
    //test.comment('⌚️ Inputting password in the "Password" field  - ' + pass);
    this.fillSelectors('.yawave-signin-form', {
      '.form-item-pass input': pass
    });

    //test.assertExists('.form-submit', 'Check if submit button exists on user login page.');
    this.click('.form-submit');
    test.comment('⌚️ Clicking on the "Sign In" button and authorization user');
    //casper.waitWhileSelector('.sign-out', function () {
    //});
  });

  //Check user authorization
  casper.then(function() {
    if (this.exists('.sign-out')) {
      this.test.pass('Signed In ' + this.fetchText('.idevels-main-menu li.sign-out.menu-link > a span'));
    } else {
      this.test.fail('Doesn\'t signed');
    }
  });
};

/** Function "CreateWave" for create wave with signed user **/

exports.createWave = function (test) {
  var args = require('./arguments.json');
  var key = "yawave-create-wave";

  if (args[key] !== undefined) {
    var domain = args[key].domain;
    var email = args[key].email;
    var pass = args[key].pass;
    var IwantTofind = args[key].IwantTofind;
    var TitleWave = args[key].TitleWave;
  }

  //casper.start(domain, function () {
  //  test.comment('Authorization pop-up opening on the site');
  //  casper.setHttpAuth('ch', 'ch000');
  //  test.comment('HTPASSWD is correct.');
  //  casper.echo(this.getTitle(), 'INFO');
  //
  //});

  /** ===================== Create Wave page =========================== **/
  casper.thenOpen(domain + 'start/', function () {
    casper.echo(this.getTitle(), 'INFO');
    //test.assertTextExists('What do you want to achieve?', 'Title of the form exists');
    /**
     * Check if Form for Wave creating exists **/

    if (this.exists('.idevels-start-form')) {
      this.test.pass('Form for Wave creating exists');
    } else {
      this.test.fail('Form for Wave creating doesn\'t exists');
    }
    //test.assertExists('.idevels-start-form', 'Check if Form for Wave creating exists');

  });
  //
  casper.then(function () {
    test.comment('⌚️ Filling in the "I want to find" field');
    casper.fillSelectors('.idevels-start-start-form', {
      '[id^=edit-fields-wrapper-target]': IwantTofind
    });

    //Wait for load next field
    this.wait(5000, function () {
    });
  });

  casper.then(function () {
    test.comment('⌚️ Filling in the "Title" field');
    //test.assertExists('.form-item-fields-wrapper-data-wrapper-title', ' "Title" field exists');
    casper.fillSelectors('.idevels-start-start-form', {
      '[id^=edit-fields-wrapper-data-wrapper-title]': TitleWave
    });
    //test.assertExists('.form-submit', ' "Save" button exists');
    //test.assertExists('.cancel-button', ' "Cancel" button exists');
    this.click('.page-submit-button');
    casper.waitWhileSelector('.horizontal-tabs-panes', function () {
    });

  });
};
//
//exports.openBenefitPage = function () {
//
//};

//Function AddPayoutBenefit for add Benefit type - Payout
exports.addPayoutBenefit = function () {
  var args = require('./arguments.json');
  var key = "yawave-add-benefit-type-payout-benefit";
  //
  if (args[key] !== undefined) {
    var domain = args[key].domain;
    var email = args[key].email;
    var pass = args[key].pass;
    var WaveId = args[key].WaveId;
    var Currency = args[key].Currency;
    var AmountDivisibility = args[key].AmountDivisibility;
    var Transferability = args[key].Transferability;
    var DeliveryInterval = args[key].DeliveryInterval;
    var LastDeliveryPoint = args[key].LastDeliveryPoint;
    var LeftBenefitCondition = args[key].LeftBenefitCondition;
  }
  //
  //casper.start(domain, function () {
  //  casper.setHttpAuth('ch', 'ch000');
  //  casper.echo(this.getTitle(), 'INFO');
  //
  //});
  //
  ///** ===================== Wave Builder page =========================== **/
  //casper.thenOpen(domain + 'node/' + WaveId + '/plan-modify/pages/*', function () {
  //  test.comment('Opening the wave page');
  //  casper.echo(this.getTitle(), 'INFO');
  //});

  casper.then(function () {
    if (this.exists('.menu-benefits-children-title')) {
      this.test.pass('"Benefit Type" the title exists');
    } else {
      this.test.fail('"Benefit Type" the title doesn\'t exists');
    }
    //this.test.assertExists('.menu-benefits-children-title', 'Check if "Benefit Type" the title exists');
    this.click('[data-id="benefits"]');
    this.test.comment('⌚️ Clicking on menu Benefit');
  });

  casper.then(function () {
    if (this.exists('[title="Add benefit widget"]')) {
      this.test.pass('"Add Benefit" the button exists');
    } else {
      this.test.fail('"Add Benefit" the button doesn\'t exists');
    }
    //this.test.assertExists('[title="Add benefit widget"]', 'Check if "Add Benefit" the button exists');
    this.test.comment('⌚️ Clicking on button Add Benefit');
    this.click('.idevels-widget-benefit-form .fields-actions a.add-field');

  });

  casper.then(function () {
    this.fetchText('.field-group-div h3');
    if (this.exists('#widget-element-payout-benefit')) {
      this.test.pass('The "Payout Benefit" type exists');
    } else {
      this.test.fail('the "Payout Benefit" type doesn\'t exists');
    }
    //this.test.assertExists('#widget-element-payout-benefit', 'Check if the "Payout Benefit" type exists');
    this.click('#widget-add-payout-benefit > div > a');
    this.test.comment('⌚️ Clicking on Benefit type - Payout Benefit');

  });

  /** ======================== Benefit Type page ===================== **/
  casper.then(function () {

    /** --------- Term & Conditions --------- **/
    casper.echo(this.getTitle(), 'INFO');
    this.test.comment('Fill fields on block - Terms & Conditions');
    casper.fillSelectors('.idevels-widget-entity-form', {
      //Currency
      '[id^=yw_currency_element_]': Currency,

      //Amount Divisibility
      '[id^=yw_select_amountdivisibility_]': AmountDivisibility,

      //Max. Amount per Beneficiary
      //TODO - Add click on the switch-wrapper and after fill the numbers
      //'[id^=yw_textbox_maxamount_]': '1000', //value : only numbers

      //Validity Start Date
      //'[id^=yw_textbox_startdate_]' : '2015-08-15',

      //Expiration Date
      //'[id^=yw_textbox_expirationdate_]' : '2015-08-16',
      //@TODO - FireFox, IE, Safari (yyyy-mm-dd); Chrome (mm/dd/yyyy)

      //Transferability
      '[id^=yw_select_transferability_]': Transferability,

      //Term description (language) | (Char free)
      //'[id^=yw_termdescription_hidden_]' : '1',

      /** -------------- Delivery Form ---------------- **/
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

  casper.then(function () {
    //casper.echo(this.getElementInfo('.benefit-number'));
  });
};

//Function AddPointsBenefit for add Benefit type - Points
exports.addPointsBenefit = function () {
  var args = require('./arguments.json');
  var key = "yawave-add-benefit-type-points";

  if (args[key] !== undefined) {
    var domain = args[key].domain;
    var email = args[key].email;
    var pass = args[key].pass;
    var WaveId = args[key].WaveId;
    var Currency = args[key].Currency;
    var AmountDivisibility = args[key].AmountDivisibility;
    var Transferability = args[key].Transferability;
    var Form = args[key].Form;
    var DeliveryInterval = args[key].DeliveryInterval;
    var LastDeliveryPoint = args[key].LastDeliveryPoint;
    var LeftBenefitCondition = args[key].LeftBenefitCondition;
  }


  /** ===================== Wave Builder page =========================== **/

  casper.then(function () {
    if (this.exists('.menu-benefits-children-title')) {
      this.test.pass('"Benefit Type" the title exists');
    } else {
      this.test.fail('"Benefit Type" the title doesn\'t exists');
    }
    //this.test.assertExists('.menu-benefits-children-title', 'Check if "Benefit Type" the title exists');
    this.click('[data-id="benefits"]');
    this.test.comment('⌚️ Clicking on menu Benefit');
  });

  casper.then(function () {
    if (this.exists('[title="Add benefit widget"]')) {
      this.test.pass('"Add Benefit" the button exists');
    } else {
      this.test.fail('"Add Benefit" the button doesn\'t exists');
    }
    //this.test.assertExists('[title="Add benefit widget"]', 'Check if "Add Benefit" the button exists');
    this.test.comment('⌚️ Clicking on button Add Benefit');
    this.click('.idevels-widget-benefit-form .fields-actions a.add-field');

  });

  casper.then(function () {
    this.fetchText('.field-group-div h3');
    if (this.exists('#widget-element-points')) {
      this.test.pass('The "Points" type exists');
    } else {
      this.test.fail('the "Points" type doesn\'t exists');
    }
    //this.test.assertExists('#widget-element-points', 'Check if the "Points" type exists');
    this.click('#widget-add-points > div > a');
    this.test.comment('⌚️ Clicking on Benefit type - Points');

  });

  /** ======================== Benefit Type page ===================== **/
  casper.then(function () {

    /** --------- Term & Conditions --------- **/
    casper.echo(this.getTitle(), 'INFO');
    this.test.comment('Fill fields on block - Terms & Conditions');
    casper.fillSelectors('.idevels-widget-entity-form', {

      //Currency
      '[id^=yw_currency_element_]': Currency,

      //Amount Divisibility
      '[id^=yw_select_amountdivisibility_]': AmountDivisibility,

      //Max. Amount per Beneficiary
      //TODO - Add click on the switch-wrapper and after fill the numbers
      //'[id^=yw_textbox_maxamount_]': '1000', //value : only numbers

      //Validity Start Date
      //'[id^=yw_textbox_startdate_]' : '2015-08-15',

      //Expiration Date
      //'[id^=yw_textbox_expirationdate_]' : '2015-08-16',
      //@TODO - FireFox, IE, Safari (yyyy-mm-dd); Chrome (mm/dd/yyyy)

      //Transferability
      '[id^=yw_select_transferability_]': Transferability,

      //Term description (language) | (Char free)
      //'[id^=yw_termdescription_hidden_]' : '1',

      /** -------------- Delivery Form ---------------- **/
      //Form
      '[id^=yw_select_deliveryform_]' : Form,

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

  casper.then(function () {
    //casper.echo(this.getElementInfo('.benefit-number'));
  });
};

exports.addMoneyBenefit = function () {
  var args = require('./arguments.json');
  var key = "yawave-add-benefit-type-money-based-benefit";

  if (args[key] !== undefined) {
    var domain = args[key].domain;
    var email = args[key].email;
    var pass = args[key].pass;
    var WaveId = args[key].WaveId;
    var Currency = args[key].Currency;
    var AmountDivisibility = args[key].AmountDivisibility;
    var ConsumptionCondition = args[key].ConsumptionCondition;
    var ConsumptionAmount = args[key].ConsumptionAmount;
    var Cumulation = args[key].Cumulation;
    var Transferability = args[key].Transferability;
    var Form = args[key].Form;
    var DeliveryInterval = args[key].DeliveryInterval;
    var LastDeliveryPoint = args[key].LastDeliveryPoint;
    var LeftBenefitCondition = args[key].LeftBenefitCondition;
  }

  /** ===================== Wave Builder page =========================== **/
  //casper.thenOpen(domain + 'node/' + WaveId + '/plan-modify/pages/*', function () {
  //  test.comment('Opening the wave page');
  //  casper.echo(this.getTitle(), 'INFO');
  //});

  casper.then(function () {
    if (this.exists('.menu-benefits-children-title')) {
      this.test.pass('"Benefit Type" the title exists');
    } else {
      this.test.fail('"Benefit Type" the title doesn\'t exists');
    }
    //test.assertExists('.menu-benefits-children-title', 'Check if "Benefit Type" the title exists');
    this.click('[data-id="benefits"]');
    this.test.comment('⌚️ Clicking on menu Benefit');
  });

  casper.then(function () {
    if (this.exists('[title="Add benefit widget"]')) {
      this.test.pass('"Add Benefit" the button exists');
    } else {
      this.test.fail('"Add Benefit" the button doesn\'t exists');
    }
    //this.test.assertExists('[title="Add benefit widget"]', 'Check if "Add Benefit" the button exists');
    this.test.comment('⌚️ Clicking on button Add Benefit');
    this.click('.idevels-widget-benefit-form .fields-actions a.add-field');

  });

  casper.then(function () {
    this.fetchText('.field-group-div h3');
    this.test.assertExists('#widget-element-payout-benefit', 'Check if the "Money based Benefit" type exists');
    this.click('#widget-add-money-based-coupon > div > a');
    this.test.comment('⌚️ Clicking on Benefit type - Money based Benefit');

  });

  /** ======================== Benefit Type page ===================== **/
  casper.then(function () {

    /** --------- Term & Conditions --------- **/
    casper.echo(this.getTitle(), 'INFO');
    this.test.comment('Fill fields on block - Terms & Conditions');
    //casper.fillSelectors('.idevels-widget-entity-form', fillFieldsTermConditions, true);
    casper.fillSelectors('.idevels-widget-entity-form', {

      //Currency
      '[id^=yw_currency_element_]': Currency,

      //Amount Divisibility
      '[id^=yw_select_amountdivisibility_]': AmountDivisibility,

      //Consumption Condition
      '[id^=yw_select_consumptioncondition_]': ConsumptionCondition,

      //Consumption Amount
      '[id^=yw_textbox_consumptionamount_]': ConsumptionAmount,

      //Max. Amount per Beneficiary
      //TODO - Add click on the switch-wrapper and after fill the numbers
      //'[id^=yw_textbox_maxamount_]': '1000', //value : only numbers

      //Validity Start Date
      //'[id^=yw_textbox_startdate_]' : '2015-08-15',

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

  casper.then(function () {
    //casper.echo(this.getElementInfo('.benefit-number'));
  });
};

exports.addEventBooster = function () {
  var args = require('./arguments.json');
  var key = "yawave-add-booster-template";

  if (args[key] !== undefined) {
    var domain = args[key].domain;
    var email = args[key].email;
    var pass = args[key].pass;
    var WaveId = args[key].WaveId;
    var TitleEventBooster = args[key].TitleEventBooster;
    var TextEventBooster = args[key].TextEventBooster;
    var IssuingTime = args[key].IssuingTime;
    var Event = args[key].Event;
    var StartDate = args[key].StartDate;
    var StartTime = args[key].StartTime;
    var EndDate = args[key].EndDate;
    var EndTime = args[key].EndTime;
    var TitleStatic = args[key].TitleStatic;
    var TextStatic = args[key].TextStatic;
    var FromEventOrder = args[key].FromEventOrder;
    var ToEventOrder = args[key].ToEventOrder;
    var StartPoint = args[key].StartPointTypes;
    var StartPointOffset = args[key].StartPointOffset;
    var Exclusion = args[key].Exclusion;
    var AmountType = args[key].AmountType;
    var CalculatedAmountPerEvent = args[key].CalculatedAmountPerEvent;
    var AmountPerEvent = args[key].AmountPerEvent;
    var Rounding = args[key].Rounding;
    var EndPoint = args[key].EndPoint;
    var FractionDigits = args[key].FractionDigits;
    var MonetaryEquivalent = args[key].MonetaryEquivalent;
  }
  casper.then(function () {
    this.click('.menu-parents-wrapper [data-id="rewards"]');
    this.test.comment('⌚️ Clicking on menu Booster');
  });

  casper.then(function () {
    this.test.comment('⌚️ Clicking on button Add');
    this.click('.idevels-widget-content-reward-form .fields-actions a.add-field');

  });

  casper.then(function () {
    this.click('#widget-add-event > div > a');
    this.test.comment('⌚️ Clicking on Booster type - Event Based Booster');

  });

  casper.then(function () {
    this.test.comment('⌚️ Filling field - Title');

    /** ----------------- Description ---------------------- **/
    casper.fillSelectors('.idevels-widget-entity-form', {


      //Title
      '[id^=yw_textbox_title_]': TitleEventBooster

    });

    this.test.comment('⌚️ Filling field - Text');
    casper.fillSelectors('.idevels-widget-entity-form', {

      //Text
      '[id^=yw_textarea_description_]': TextEventBooster
    });

    /** ----------------- Start/End Date ---------------------- **/

    /*test.comment('⌚️ Filling fields on block - Start/End Date');
     casper.fillSelectors('.idevels-widget-entity-form', {

     //Block: Start/End Date
     //@TODO - Start: "switch-wrapper" (click, check - enabled or disabled)

     //Start Date
     //@TODO - FireFox, IE, Safari (yyyy-mm-dd); Chrome (mm/dd/yyyy)
     '[id^=yw_textbox_startdate_]': 'yyyy-mm-dd',

     //Start Time
     //@TODO - FireFox, IE, Safari (); Chrome (hh:mm AM/PM)
     '[id^=yw_textbox_starttime_]': '00:00 AM',

     //@TODO - End: "switch-wrapper" (click, check - enabled or disabled)

     //End Date
     //@TODO - FireFox, IE, Safari (yyyy-mm-dd); Chrome (mm/dd/yyyy)
     '[id^=yw_textbox_enddate_]': 'yyyy-mm-dd',

     //End Time
     '[id^=yw_textbox_endtime_]': '00:00 AM'
     });
     */

    /** ----------------- Issuing Time ---------------------- **/

    this.test.comment('⌚️ Filling fields on block - Issuing Time');
    casper.fillSelectors('.idevels-widget-entity-form', {

      //Issuing interval from Start Date of Booster
      '[id^=yw_select_issuing_interval_]': IssuingTime
    });

    /** ----------------- Event ---------------------- **/

    casper.fillSelectors('.idevels-widget-entity-form', {

      //True/False Property
      //'[id^=yw_select_propertydefinition]': Event

    });

    this.click('.static .yawave-widget-reward-allocation-add-button');
    this.wait(5000, function() {
    });
  });

  casper.then(function() {
    if (this.exists('[id^=yawave_widget_body_staticallocationreward_]')) {
      this.test.pass('Page Static allocation - exists');
    } else {
      this.test.fail('Page Static allocation - not exists');
    }
  });

  /** ----------------- Static Allocation ---------------------- **/

  casper.then(function() {

    /** ----------------- Description ----------------- **/

    casper.fillSelectors('.idevels-widget-entity-form', {
      '.form-type-textfield input[id^=yw_textbox_title_]': TitleStatic           //Title Static Allocation
    });
    //casper.echo(this.fetchText('.form-text'));
    casper.fillSelectors('.idevels-widget-entity-form', {
      'textarea[id^=yw_textarea_description_]': 'TextStatic'  //Text Static Allocation
    });

    //this.test.assertExists('.yawave-widget-form-block');

    /** -------------- Issued For Events --------------- **/

    casper.fillSelectors('.idevels-widget-entity-form', {
    //From Event Order
     'input[id^=yw_textbox_from_order_]': FromEventOrder
    //To Event Order

    });
    /** ------------ Beneficiary on Path to Top  ------- **/

    //Startpoint/Offset
    casper.fillSelectors('.idevels-widget-entity-form', {
      '[id^=yw_select_startpoint_]': StartPoint
    });


    /** ------------ Benefit for the Beneficary -------- **/
    casper.fillSelectors('.idevels-widget-entity-form', {

    //Amount Type
    '[id^=yw_select_amounttype]': AmountType     //AmountType

    });
      casper.fillSelectors('.idevels-widget-entity-form', {
        //'[id^=yw_select_calculated_property_]': CalculatedAmountPerEvent
      });

    //casper.fillSelectors('.idevels-widget-entity-form', {
    //  'input[id^=yw_textbox_amount_per_event_]': AmountPerEvent
    //});
    //  casper.fillSelectors('.idevels-widget-entity-form', {
    //    'input[id^=yw_textbox_monetary_equivalent_]': MonetaryEquivalent
    //  });
    //}

    this.test.comment('Clicking on button - Save in Static allocation');
    this.click('#edit-submit');
    //this.capture('testing.png');
    this.wait(5000, function () {
    });

  });

  casper.then(function() {
    if (this.exists('[id^=yawave_widget_static_allocation_reward_div_]')) {
      this.echo(this.fetchText('[id^=yw_order_number_] p'));
      this.test.pass('The "Static Allocation" block exists');
    } else {
      this.test.fail('The "Static Allocation" block doesn\'t exists');
    }
  });

  casper.then(function() {
    this.test.comment('Clicking on button - Save in Event Based Reward');

    this.click('.page-submit-button');
  });

  casper.then(function() {
    //test.assertExists('[data-order="1"]', 'Exists Benefit');
  });
};
