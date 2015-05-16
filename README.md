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
$ cat input.txt | node app.js
````

**Simple auto-test:** My regular work loop. Pipe `input.txt` into `app.js` and check the results against `expected.txt`. Also saves the running time in `time.txt`.

````
$ diff <(cat input.txt | (time node app.js) 2> time.txt) expected.txt --side-by-side ; cat time.txt
````

**Stress test:** See if the app crashes due to too much input or large numbers. Also saves the running time in `stresstime.txt`.
````
$ (time (cat ../stress.txt | node app.js &> /dev/null)) 2> stresstime.txt ; cat stresstime.txt
````
