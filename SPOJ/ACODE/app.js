// http://www.spoj.com/problems/ACODE/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

var countPossibleDecodings = function (codedMessage, maxChar, numCharsToCheck, cache) {
	if (codedMessage.length < 2)
		return 1;

	var future = codedMessage.substr(numCharsToCheck);

	if (cache[future]) {
		return cache[future];
	}

	var word = codedMessage.substr(0, numCharsToCheck);
	var number = parseInt(word, 10);
	var decodings = countPossibleDecodings(codedMessage.substr(1), maxChar, numCharsToCheck, cache);

	var hasZero = word[0] === '0' || word[1] === '0' || future[0] === '0'; // '01', '10', and '110' can only have one decoding.
	var possibleLetter = number <= maxChar;
	if (possibleLetter && !hasZero) {
		decodings += countPossibleDecodings(future, maxChar, numCharsToCheck, cache);
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

		writeLn(numDecodesPossible);
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
