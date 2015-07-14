#!/bin/bash
cat input.txt | (time node app.js) 2> time_test.txt > output.txt
sdiff output.txt expected.txt > diff.txt
echo "input" "output" "expected" | column -t
paste input.txt diff.txt | column -t
cat time_test.txt
