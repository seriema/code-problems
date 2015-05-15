// http://www.spoj.com/problems/PRIME1/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

var writeLn = function (msg) {
	process.stdout.write(msg + endOfLine);
};

var findPrimes = function (low, high) {
	low = low < 2 ? 2 : low;

	var arr = [];

	// The algorithm has to start on 2.
	// http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
	for (var i = 2; i <= high; i++) {
		if (arr[i] === undefined) {
			for (var j = i*i; j <= high; j += i) {
				arr[j] = true;
			}
		}
	}

	var primes = [];
	for (var x = low; x <= high; x++) {
		if (arr[x] === undefined) {
			primes.push(x);
		}
	}

	return primes;
};


// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( input ){
	var lines = input.split(endOfLine);
	var nrTestCases = parseInt(lines[0]);

	for (var i = 0; i < nrTestCases; i++) {
		var string = lines[i+1];
		var numbers = string.split(' ');
		var low = parseInt(numbers[0]);
		var high = parseInt(numbers[1]);

		var primes = findPrimes(low, high);
		primes.forEach(writeLn);
		writeLn(''); // Add newline between results.
	}

	process.exit();
});
