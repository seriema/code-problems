// http://www.spoj.com/problems/ACODE/

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

var countPossibleDecodings = function (codedMessage, maxChar, numCharsToCheck, cache) {
	if (codedMessage.length < 2)
		return BigInt.create(1);

	var future = codedMessage.substr(numCharsToCheck);

	if (cache[future]) {
		return cache[future];
	}

	var decodings = countPossibleDecodings(codedMessage.substr(1), maxChar, numCharsToCheck, cache);
	var word = codedMessage.substr(0, numCharsToCheck);
	var possibleLetter = parseInt(word, 10) <= maxChar;
	var hasZero = word[0] === '0' || word[1] === '0' || future[0] === '0'; // '01', '10', and '110' can only have one decoding.

	if (possibleLetter && !hasZero) {
		decodings = BigInt.add(decodings, countPossibleDecodings(future, maxChar, numCharsToCheck, cache));
	}

	cache[future] = decodings;
	return decodings;
};


// --- START HERE ---
var main = function (lines) {
	var maxChar = 28; // Highest number that can become a letter. Specified in SPOJ instructions and not through input.
	var numCharsToCheck = maxChar.toString().length;

	// Keep reading until read '0'.
	var line;
	while((line = lines.next()) !== '0') {
		var codedMessage = line;
		var cache = [];
		var numDecodesPossible = countPossibleDecodings(codedMessage, maxChar, numCharsToCheck, cache);

		writeLn(BigInt.toString(numDecodesPossible));
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
