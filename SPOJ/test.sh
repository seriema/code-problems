#!/bin/bash
cat input.txt | (time node app.js) 2> time_test.txt > output.txt
sdiff output.txt expected.txt > diff.txt
cat diff.txt
cat time_test.txt
