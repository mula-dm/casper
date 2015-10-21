#!/usr/bin/env bash
set -e
testPath=$1

echo "Check extensions."
[[ -z `which casperjs` ]] && sudo npm install -g casperjs || true
[[ -z `which phantomjs` ]] && sudo apt-get install phantomjs -y || true

echo "Install dependencies."
npm install

echo "Run test. Put results into file."
casperjs test ./$testPath --xunit=result.xml --verbose && echo "Compile js file." && node ./yawave.js $testPath

#echo "Compile js file."

