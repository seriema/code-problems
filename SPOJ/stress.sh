#!/bin/bash
(time (cat ../stress.txt | node app.js &> /dev/null)) 2> stresstime.txt ; cat stresstime.txt
