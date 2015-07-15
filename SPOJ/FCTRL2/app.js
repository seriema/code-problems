// http://www.spoj.com/problems/FCTRL2/

var endOfLine = require('os').EOL;


var createBigInt = function (regularInt) {
	var bigInt = [0];
	addBigInt(bigInt, regularInt);
	return bigInt;
};

var addBigInt = function (bigInt, regularInt, start) {
	if (start < 0) {
		bigInt.unshift(regularInt); // more than one digits could happen, so I need a bigInt ctor
		return;
	}

	var i = start !== undefined ? start : bigInt.length-1;
	var tmp = bigInt[i] + regularInt;
	var rest = tmp % 10;
	var carryOver = Math.floor(tmp / 10);

	bigInt[i] = rest;
	if (carryOver > 0) {
		addBigInt(bigInt, carryOver, i-1);
	}
};

var multiplyBigInt = function (bigInt, regularInt) {
	if (regularInt === 0)
		return bigInt.splice(0, bigInt.length, 0); // remove all, add 0

	var carry = 0
	for (var i = bigInt.length-1; i >= 0; i--) {
		var tmp = bigInt[i] * regularInt;
		var rest = tmp % 10;
		var nextCarry = Math.floor(tmp / 10);

		bigInt[i] = rest;
		if (carry > 0) {
			addBigInt(bigInt, carry, i);
		}
		carry = nextCarry;
	}

	// One left over
	if (carry > 0)
		addBigInt(bigInt, carry, i-1);
};

var calcFactorial = function (factorialTarget, cache) {
	var factorial = 1;
	var bigInt = [1];
	for (var f = 1; f <= factorialTarget; f++) {
		multiplyBigInt(bigInt, f);
	}

	return bigInt.join('');
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
process.stdin.resume();

// i don't want binary, do you?
process.stdin.setEncoding( 'utf8' );

process.stdin.on('data', lines.addInput);
// on data from stdin
process.stdin.on('end', function(){
	lines.setup();

	main(lines);

	process.exit();
});


// --- EXPORT METHODS FOR DEBUG HERE
exports.createBigInt = createBigInt;
exports.multiplyBigInt = multiplyBigInt;
exports.addBigInt = addBigInt;
