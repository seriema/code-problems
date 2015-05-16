#!/bin/bash
diff <(cat input.txt | (time node app.js) 2> time.txt) expected.txt --side-by-side ; cat time.txt
