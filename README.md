# Yawave TestRail Integration
This is an example of a testrail integration for developing the Yawave web-site.

### Requirements
* Node.js
* NPM
* CasperJS - can be installed via run-test.sh

### How to use?
1. You need to clone repo.
1. Go to repo.
1. You should run bash script.

```bash
./run-test.sh %path to test% 
```

Where **%path to test%** is path of file that contains automated test. You can find test files in tests/ folder.
For example:
```bash
./run-test.sh tests/Authorization/yawave-sign-in-email.js
```

### TODO
1. You can find and change arguments to test in arguments.json file. This file contains default arguments to each test.
1. If you run bash script and your test will be failed then you need to run the next command (it's manual mode for sending results to TestRail system):
```bash
node ./yawave.js %path to test% 
```