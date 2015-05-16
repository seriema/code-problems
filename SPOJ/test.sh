#!/bin/bash
diff <(cat input.txt | (time node app.js) 2> time_test.txt) expected.txt --side-by-side ; cat time_test.txt
