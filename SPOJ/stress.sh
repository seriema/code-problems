#!/bin/bash
(cat ../stress.txt | ((time node app.js) 2> time_stress.txt) &> /dev/null) ; cat time_stress.txt
