# code-problems
Trying out some code problems used in some university courses or competitions.

I'll focus on:

* [Sphere online judge (SPOJ)](http://www.spoj.com/)
* [Kattis at KTH](https://kth.kattis.com)

## Useful commands
At least for SPOJ I use these commands to test things out.

*Note:* It's assumed you're in the problem folder, e.g. `SPOJ/DIVSUM`. And that there exists a `input.txt` file with sample input data, and a `expected.txt` with matching output data that's expected if the program is correct.

**Manual test:** Check what the app outputs given `input.txt` as input.

````
$ ../run.sh
````

**Simple auto-test:** My regular work script. Pipe `input.txt` into `app.js` and check the results against `expected.txt`. Also saves the running time in `time_test.txt`.

````
$ ../test.sh
````

**Simpler auto-test:** My work script for problems where one input line matches one output line. Has nicer comparison table. Pipe `input.txt` into `app.js` and check the results against `expected.txt`, then output using `column` to get a input-output-expected table. Also saves the running time in `time_test.txt`.

````
$ ../test2.sh
````

**Stress test:** See if the app crashes due to too much input or large numbers. Also saves the running time in `time_stress.txt`.
````
$ ../stress.sh
````

**Minify:** Some problems require smaller source code and I don't want to sacrifice readability unnecessarily. Creates a `app.min.js` file and verifies that the program still works (using a simplified version of `test.sh`). *Note:* requires [uglify-js](https://www.npmjs.com/package/uglify-js) to be installed and in PATH.
````
$ ../uglify.sh
````

## Accepted answers

### SPOJ
All in folder `SPOJ/`.

PROBLEM  | ID | TIME | MEM | LANG | DATE
-------  | --- | ---:| ---:| ---- | ----
TEST | 14253161 | 0.04 | 65M | NODEJS | 2015-05-15
DIVSUM | 14259035 | 2.16 | 119M | NODEJS | 2015-05-16
AMR10F | 14308063 | 0.04 | 67M | NODEJS | 2015-05-23
FCTRL2 | 14677491 | 0.07 | 68M | NODEJS | 2015-07-16
ACODE | 14679607 | 0.14 | 68M | NODEJS | 2015-07-16

## Other answers

* SPOJ/PRIME1 - did it before realizing that NODEJS wasn't an accepted lang.
