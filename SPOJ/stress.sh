#!/bin/bash
(cat ../stress.txt | ((time node app.js) 2> stresstime.txt) &> /dev/null) ; cat stresstime.txt
