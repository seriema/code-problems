// http://www.spoj.com/problems/FCTRL2/

var endOfLine = require('os').EOL;

var BigInt = {
	create: function (regularInt) {
		var strArr = regularInt.toString().split('');
		var intArr = strArr.map(function (str) {
			return parseInt(str, 10);
		});

		return intArr;
	},

	toString: function (bigInt) {
		return bigInt.join('');
	},

	add: function (a1, a2) {
		var sum = [];

		var largerInt = a1.length >= a2.length ? a1 : a2;
		var smallerInt = a1.length < a2.length ? a1 : a2;

		var carry = 0;
		for (var i = smallerInt.length-1, j = largerInt.length-1; j >= 0; i--, j--) {
			var tmp = largerInt[j] + carry;

			if (i >= 0) {
				tmp += smallerInt[i];
			}

			var rest = tmp % 10;
			sum.unshift(rest);
			carry = Math.floor(tmp / 10);
		}

		if (carry > 0)
			sum.unshift(carry);

		return sum;
	},

	multiply: function (f1, f2) {
		var largerInt = f1.length >= f2.length ? f1 : f2;
		var smallerInt = f1.length < f2.length ? f1 : f2;

		var product = BigInt.create(0);
		for (var j = smallerInt.length-1; j >= 0; j--) {
			var partialProduct = [];
			var grow = smallerInt.length-j;
			while(--grow) {
				partialProduct.push(0);
			}

			var carry = 0;
			for (var i = largerInt.length-1; i >= 0; i--) {
				var tmp = largerInt[i] * smallerInt[j] + carry;
				var rest = tmp % 10;

				carry = Math.floor(tmp / 10);
				partialProduct.unshift(rest);
			}

			if (carry > 0)
				partialProduct.unshift(carry);

			product = BigInt.add(product, partialProduct);
		}

		return product;
	}
};

var calcFactorial = function (factorialTarget, cache) {
	if (factorialTarget === 0)
		return BigInt.create(1);

	if (cache[factorialTarget])
		return cache[factorialTarget];

	var nextFactorial = calcFactorial(factorialTarget-1, cache);
	var factorial = BigInt.multiply(nextFactorial, BigInt.create(factorialTarget));
	cache[factorialTarget] = factorial;
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

		writeLn(BigInt.toString(factorial));
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
exports.createBigInt = BigInt.create;
exports.multiplyBigInt = BigInt.multiply;
exports.addBigInt = BigInt.add;
