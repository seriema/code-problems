// http://www.spoj.com/problems/ACODE/

var stdin = process.stdin;
var endOfLine = require('os').EOL;


var countPossibleDecodings = function (codedMessage, max, numCharsToCheck, startPosition) {
	if (startPosition >= codedMessage.length)
		return 1;

	var i = startPosition || 1;
	var word = codedMessage.substr(i-1, numCharsToCheck);
	var number = parseInt(word, 10);

	if (number <= max && word[0] !== '0' && word[1] !== '0') {
		return countPossibleDecodings(codedMessage, max, numCharsToCheck, i+1) + countPossibleDecodings(codedMessage, max, numCharsToCheck, i+2);
	}

	return countPossibleDecodings(codedMessage, max, numCharsToCheck, i+1);
};


// --- START HERE ---
var main = function (lines) {
	var max = 28; // Highest number that can become a letter. Specified in SPOJ instructions and not through input.
	var numCharsToCheck = max.toString().length;

	// Keep reading until read '0'.
	var line;
	while((line = lines.next()) !== '0') {
		var codedMessage = line;
		var numDecodesPossible = countPossibleDecodings(codedMessage, max, numCharsToCheck);

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
