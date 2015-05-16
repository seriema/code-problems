// http://www.spoj.com/problems/AMR10F/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

var writeLn = function (msg) {
	process.stdout.write(msg + endOfLine);
};

var countCookies = function (nrPiles, shortestPile, heightDifference) {
	var sum = 0;
	var currentPile = shortestPile;

	for (var c = 0; c < nrPiles; c++) {
		sum += currentPile;
		currentPile += heightDifference;
	}

	return sum;
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
	var lineNr = 0;

	// Read how many test cases there are
	var nrTestCases = parseInt(lines.next());

	// Read the test cases
	for (var i = 0; i < nrTestCases; i++) {
		var line = lines.next();
		var data = line.split(' ');
		var nrPins = parseInt(data[0]);
		var nrColours = parseInt(data[1]);
		var nrGuessed = parseInt(data[2]);

		writeLn('pins ' + nrPins);
		writeLn('colours ' + nrColours);
writeLn('guessed ' + nrGuessed);
// Väntad: 4 3 2, 4 6 2, 8 9 3
		// Read "guesses"
		var nrGuesses = nrGuessed * 2;
		for (var g = 0; g < nrGuesses; g+=2) {
			var colors = lines.next().split(' ');
			var points = lines.next().split(' ');

			writeLn('c ' + colors);
			writeLn('p ' + points);

			var pointsBlack = parseInt(points[0]);
			var pointsWhite = parseInt(points[1]);
		}

		// Solve the test case
		//var nrCookies = countCookies(nrPiles, shortestPile, heightDifference);
		//writeLn(nrCookies);
	}

	process.exit();
});
