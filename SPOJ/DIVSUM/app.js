// http://www.spoj.com/problems/DIVSUM/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

var writeLn = function (msg) {
	process.stdout.write(msg + endOfLine);
};

var findDivisors = function (number) {
	var divisors = [];
	var max = number / 2;

	for (var x = 1; x <= max; x++) {
		if (number % x === 0) {
			divisors.push(x);
		}
	}

	return divisors;
};

var sumAll = function (arr) {
	return arr.reduce(function(previousValue, currentValue) {
		return previousValue + currentValue;
	}, 0);
};

var input = '';
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

process.stdin.on('data', function(buf) { input += buf.toString(); });
// on data from stdin
stdin.on('end', function(){
	var lines = input.split(endOfLine);
	var nrTestCases = parseInt(lines[0]);

	for (var i = 0; i < nrTestCases; i++) {
		var string = lines[i+1];
		var number = parseInt(string);

		var divisors = findDivisors(number);
		var divSum = sumAll(divisors);
		writeLn(divSum);
	}

	process.exit();
});
