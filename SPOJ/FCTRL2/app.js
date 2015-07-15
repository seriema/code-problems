// http://www.spoj.com/problems/FCTRL2/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

var calcFactorial = function (factorialTarget, cache) {
	var factorial = 1;
	for (var f = 1; f <= factorialTarget; f++) {
		factorial *= f;
	}

	return factorial;
};


// --- START HERE ---
var main = function (lines) {
	// Read how many test cases there are
	var nrTestCases = parseInt(lines.next());
	var cache = []; // Guess I'll need it

	while(nrTestCases--) {
		var factorialTarget = parseInt(lines.next(), 10);
		var factorial = calcFactorial(factorialTarget, cache);

		writeLn(factorial);
	}
};



// --- BOILERPLATE AREA BELOW. BEWARE, DRAGONS! ---

// Utility methods
function writeLn(msg) {
	process.stdout.write(msg + endOfLine);
};
function writeArr(arr, msg) {
	writeLn((msg ? (msg + ': ') : '') + arr.join(' '));
};

var lines = (function () {
	var input = '';
	var lines;
	var line = 0;

	return {
		addInput: function (buf) {
			input += buf.toString();
		},
		setup: function () {
			lines = input.split(endOfLine);
		},
		next: function () {
			return lines[line++];
		}
	};
}());

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

process.stdin.on('data', lines.addInput);
// on data from stdin
stdin.on('end', function(){
	lines.setup();

	main(lines);

	process.exit();
});
