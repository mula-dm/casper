var testRail = require('node-testrail');
var dateFormat = require('dateformat');
var config = require('./config.json');
var login = config.loginData;
var Project = config.project;

var filePath = process.argv[2],
    fileArgs = filePath.split('/');

fileArgs.shift();
var suiteName = fileArgs[0].replace('_', ' '),
    sectionName = Project.section;

if (fileArgs.length > 2) {
  sectionName = fileArgs[1].replace('_', ' ');
}

// Get TestRail object.
var TR = new testRail(login.url, login.email, login.pass);

// Add only current case to new run.
TR.addSingleRun = function(projectID, suite_id, name, include_all, case_ids, callback) {
  var json;
  json = {};
  json.suite_id = suite_id;
  json.name = name;
  json.include_all = include_all;
  json.case_ids = case_ids;
  return TR.addCommand("add_run/", projectID, JSON.stringify(json), callback);
};

// Define some constants.
var PASSED = 1,
    AUTOMATED = 3,
    FAILED = 5;

/**
 * Get test case and get runs.
 * @param projectID
 * @param suiteID
 * @param sectionID
 * @param testCaseName
 * @param testResults
 */
var getTestCases = function(projectID, suiteID, sectionID, testCaseName, testResults) {
  // Get test cases.
  TR.getCases(projectID, suiteID, sectionID, function (d) {
    var cases = JSON.parse(d);
    var testCaseID = false;

    // Get test case by title.
    for (var i = 0; i < cases.length; i++) {
      if (cases[i].title == testCaseName) {
        testCaseID = cases[i].id;
      }
    }

    if (testCaseID) {
      // Add results to existing test case.
      addRunToTestCase(testCaseID, projectID, suiteID, testResults);
    }
    else {
      // Create test case and add results.
      TR.addCase(sectionID, testCaseName, AUTOMATED, projectID, null, null, null, function (d) {
        var newTestCase = JSON.parse(d);
        addRunToTestCase(newTestCase.id, projectID, suiteID, testResults);
      })
    }
  });
};

/**
 * Add run with test results.
 * @param testCaseID
 * @param projectID
 * @param suiteID
 * @param results
 */
var addRunToTestCase = function (testCaseID, projectID, suiteID, results) {
  var data = [
    Project.name,
    suiteName,
    sectionName,
    dateFormat(new Date(), "yyyy-mm-dd H:MM")
  ];

  var runName = data.join(' | ');
  TR.addSingleRun(projectID, suiteID, runName, false, [testCaseID], function (d) {
    var newRun = JSON.parse(d);
    addResultsToRun(testCaseID, newRun.id, results);
  })
};

/**
 * Add results to run.
 * @param testCaseID
 * @param runID
 * @param results
 */
var addResultsToRun = function(testCaseID, runID, results) {
  for (var i = 0; i < results.length; i++) {
    var statusID = results[i].failure !== undefined ? FAILED : PASSED;
    var time = results[i].$.time;
    var comment = results[i].$.name + "\nTime: " + time;
    TR.addResultForCase(runID, testCaseID, statusID, comment, null, null, null, null, function (d) {});
  }
};

var addSectionToSuite = function(projectID, suiteID, testCaseName, testResults) {
  // Get sections.
  TR.getSections(projectID, suiteID, function (d) {
    var sections = JSON.parse(d),
      sectionID = false;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].name == sectionName) {
        sectionID = sections[i].id;
        break;
      }
    }

    if (sectionID) {
      getTestCases(projectID, suiteID, sectionID, testCaseName, testResults);
    }
    else {
      // Create new section.
      TR.addSection(projectID, suiteID, null, sectionName, function(d) {
        var section = JSON.parse(d);
        getTestCases(projectID, suiteID, section.id, testCaseName, testResults);
      })
    }
  })
};

var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/result.xml', function (err, data) {
  parser.parseString(data, function (err, result) {
    var testCase = result.testsuites.testsuite.shift();
    var testCaseName = testCase.$.name;
    var testResults = testCase.testcase;

    // Get project.
    TR.getProjects(function (d) {
      var projects = JSON.parse(d);
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].name == Project.name) {
          var projectID = projects[i].id;

          // Get suites.
          TR.getSuites(projectID, function (d) {
            var suites = JSON.parse(d);
            var suiteID = false;

            for (i = 0; i < suites.length; i++) {
              if (suites[i].name == suiteName) {
                suiteID = suites[i].id;
                break;
              }
            }

            if (suiteID) {
              // Add section to exist suite.
              addSectionToSuite(projectID, suiteID, testCaseName, testResults);
            }
            else {
              // Create new suite.
              TR.addSuite(projectID, suiteName, null, function(d) {
                var suite = JSON.parse(d);

                // Add section to new suite.
                addSectionToSuite(projectID, suite.id, testCaseName, testResults);
              })
            }
          })
        }
      }
    })
  })
});
