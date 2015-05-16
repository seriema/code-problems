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

	// Read how many test cases there are
	var nrTestCases = parseInt(lines[0]);

	// Read the test cases
	var offset = 1;
	for (var i = 0; i < nrTestCases; i++) {
		var line = lines[offset+i];
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
			var colors = lines[offset+i+g+1].split(' ');
			var points = lines[offset+i+g+2].split(' ');

			writeLn('c ' + colors);
			writeLn('p ' + points);

			var pointsBlack = parseInt(points[0]);
			var pointsWhite = parseInt(points[1]);
		}
		offset += nrGuesses;

		// Solve the test case
		//var nrCookies = countCookies(nrPiles, shortestPile, heightDifference);
		//writeLn(nrCookies);
	}

	process.exit();
});
