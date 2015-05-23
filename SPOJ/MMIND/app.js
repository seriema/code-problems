// http://www.spoj.com/problems/MMIND/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

// Utility methods
var writeLn = function (msg) {
	process.stdout.write(msg + endOfLine);
};

var writeArr = function (arr) {
	writeLn(arr.join(' '));
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

// Problem solution
var calcPoints = function (nrPins, solution, guessOriginal) {
	var pointsBlack = 0;
	var pointsWhite = 0;
	var guess = guessOriginal.slice();

	// Calculate black points
	for (var x = 0; x < nrPins; x++) {
		if (solution[x] === guess[x]) {
			pointsBlack++;
			guess[x] = undefined;
		}
	}

	// Calculate white points
	for (var i = 0; i < nrPins; i++) {
		for (var j = 0; j < nrPins; j++) {
			if (i !== j && solution[i] === guess[j]) {
				pointsWhite++;
				guess[j] = undefined;
			}
		}
	}

	return [pointsBlack, pointsWhite];
};

var sumAll = function (arr) {
	return arr.reduce(function(previousValue, currentValue) {
		return previousValue + currentValue;
	}, 0);
};

var parseIntArr = function (stringArray) {
	return stringArray.map(function(str) {
		return parseInt(str);
	});
};

var nextColour = function (c, uselessColours, minColour, maxColour) {
	do {
		c++;
		if (c > maxColour)
			return { looped: true, value: minColour };
	} while(uselessColours[c]);

	return { looped: false, value: c };
};

var permutate = function(nrPins, minColour, maxColour, guess, uselessColours) {
	var sumColours = sumAll(guess);
	var isMaxedOut = sumColours === nrPins*maxColour || nrPins*minColour === nrPins*maxColour;
	if (isMaxedOut)
		return;

	for (var x = nrPins-1; x >= 0; x--) {
		var nxt = nextColour(guess[x], uselessColours, minColour, maxColour);
		guess[x] = nxt.value;
		if (!nxt.looped)
			return guess;
	}

	return guess;
};

var isValidSolution = function(nrPins, solution, guesses, points) {
	for(var x = 0; x < guesses.length; x++) {
		var pts = calcPoints(nrPins, solution, guesses[x]);
		var differentPoints = pts[0] !== points[x][0] || pts[1] !== points[x][1];

		if (differentPoints)
			return false;
	}

	return true;
};

var newGuess = function(nrPins, minColour, maxColour, guesses, points) {
	var mock = [];

	// Set up colours we know we can ignore
	var uselessColours = [];
	for (var jj = minColour; jj <= maxColour; jj++) {
		uselessColours[jj] = false;
	}
	for (var j = 0; j < points.length; j++) {
		if (points[j][0] === 0 && points[j][1] === 0) {
			guesses[j].forEach(function(colour) {
				uselessColours[colour] = true;
			});
		}
	}

	var optimizedMinColour = uselessColours.indexOf(false);
	var optimizedMaxColour = uselessColours.lastIndexOf(false);
	minColour = optimizedMinColour > -1 ? optimizedMinColour : minColour;
	maxColour = optimizedMaxColour > -1 ? optimizedMaxColour : maxColour;
	for (var i = 0; i < nrPins; i++) {
		mock.push(minColour);
	}

	var newGuess = mock;
	while(!isValidSolution(nrPins, newGuess, guesses, points)) {
		newGuess = permutate(nrPins, minColour, maxColour, newGuess, uselessColours);
		if (newGuess === undefined)
			return;
	}

	return newGuess;
};

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );



//var solution = [1, 1, 1, 3];
// Points should be [1, 1]
//var guess = [1, 2, 3, 2];
// Points should be [1, 1]
//var guess = [2, 1, 3, 2];

//var solution = [9, 9, 9, 9, 9, 9, 9, 9];
// Points should be [0, 0]
//var guess = [1, 2, 3, 4, 5, 6, 7, 8];
// Points should be [1, 0]
//var guess = [2, 3, 4, 5, 6, 7, 8, 9];
// Points should be [2, 0]
//var guess = [3, 4, 5, 6, 7, 8, 9, 9];

//var points = calcPoints(solution.length, solution, guess);
//writeLn('points: ' + points[0] + ' ' + points[1]);



process.stdin.on('data', lines.addInput);
// on data from stdin
stdin.on('end', function(){
	lines.setup();

	// Read how many test cases there are
	var nrTestCases = parseInt(lines.next());

	// Read the test cases
	for (var i = 0; i < nrTestCases; i++) {
		var line = lines.next();
		var data = line.split(' ');
		var nrPins = parseInt(data[0]);
		var nrColours = parseInt(data[1]);
		var minColour = 1; // From documentation.
		var maxColour = nrColours;
		var nrGuessed = parseInt(data[2]);

		// Read "guesses"
		var nrGuesses = nrGuessed * 2;
		var allGuesses = [];
		var allPoints = [];
		for (var g = 0; g < nrGuesses; g+=2) {
			var coloursString = lines.next().split(' ');
			var colours = parseIntArr(coloursString);
			var points = lines.next().split(' ');
			var pointsBlack = parseInt(points[0]);
			var pointsWhite = parseInt(points[1]);

			allGuesses.push(colours);
			allPoints.push([pointsBlack, pointsWhite]);
		}

		// Solve the test case
		var guess = newGuess(nrPins, minColour, maxColour, allGuesses, allPoints);
		if (guess === undefined) {
			writeLn('You are cheating!');
		} else {
			writeArr(guess);
		}
	}

	process.exit();
});
