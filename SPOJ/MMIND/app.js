// http://www.spoj.com/problems/MMIND/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

// Utility methods
var writeLn = function (msg) {
	process.stdout.write(msg + endOfLine);
};
var writeArr = function (arr, msg) {
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

// Problem solution
var calcPoints = function (nrPins, solution, guessOriginal) {
	var pointsBlack = 0;
	var pointsWhite = 0;
	var guess = guessOriginal.slice(); // make a copy

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

	return { black: pointsBlack, white: pointsWhite };
};

var sumAll = function (arr) {
	return arr.reduce(function(previousValue, currentValue) {
		return previousValue + currentValue;
	}, 0);
};

var parseIntArr = function (stringArray) {
	// parseInt() takes multiple arguments, so it can't be passed directly.
	return stringArray.map(function(str) {
		return parseInt(str);
	});
};

var nextColour = function (c, possiblePins, minColour, maxColour) {
	if (c === undefined)
		c = 0;
	else
		possiblePins[c]++;

	do {
		c++;
		if (c > maxColour) {
			return { maxedColour: true, value: undefined };
		}
	} while(possiblePins[c] === 0);

	possiblePins[c]--;
	return { maxedColour: false, value: c };
};

var permutate = function(nrPins, minColour, maxColour, guess, possiblePins) {
	var isMaxedOut = sumAll(guess) === nrPins*maxColour;
	var onlyOneColor = minColour === maxColour;
	if (isMaxedOut || onlyOneColor)
		return;

	var nxt = { maxedColour: true };
	// keep going to the left as long as the color overflows
	for (var rtlPos = nrPins; rtlPos >= 0 && nxt.maxedColour;) {
		rtlPos--;
		nxt = nextColour(guess[rtlPos], possiblePins, minColour, maxColour);
		guess[rtlPos] = nxt.value;
	}

	// maxed the highest number means there aren't any higher guesses
	if (rtlPos === 0 && nxt.maxedColour) {
		return;
	}

	// then recreate the empty area with available colours
	for (var ltrPos = rtlPos+1; ltrPos < nrPins; ltrPos++) {
		nxt = nextColour(guess[ltrPos], possiblePins, minColour, maxColour);
		guess[ltrPos] = nxt.value;
	}

	return guess;
};

var isValidSolution = function(nrPins, solution, guesses, points) {
	function matchingPoints (guess, index) {
		var pts = calcPoints(nrPins, solution, guess);
//		var pts = calcPoints(nrPins, guess, solution); // TODO: Do I have the order correct?

		return pts.black === points[index].black && pts.white === points[index].white;
	}

	var isValid = guesses.every(matchingPoints);
	return isValid;
};

var minimalPinsPossible = function(nrPins, minColour, maxColour, guesses, points) {
	var possiblePins = [];
	for (var c = minColour; c <= maxColour; c++) {
		possiblePins[c] = nrPins;
	}

	points.forEach(function (point, index) {
		// THIS COLOUR IS NOT VALID
		if (point.black === 0 && point.white === 0) {
			guesses[index].forEach(function(colour) {
				possiblePins[colour] = 0;
			});
		}
		// REDUCE PINS FOR COLOURS
		else {
			var colourCount = [];
			guesses[index].forEach(function(colour) {
				if (colourCount[colour])
					colourCount[colour]++;
				else
					colourCount[colour] = 1;
			});

			var pointsSum = point.black + point.white;
			for (var c = minColour; c <= maxColour; c++) {
				if (colourCount[c] > pointsSum)
					possiblePins[c] = Math.min(possiblePins[c], nrPins - pointsSum);
			}
		}
	});

	return possiblePins;
};

var newGuess = function(nrPins, minColour, maxColour, guesses, points) {
	var possiblePins = minimalPinsPossible(nrPins, minColour, maxColour, guesses, points);

	var startGuess = [];
	for (var i = 0; i < nrPins; i++) {
		var reset = nextColour(undefined, possiblePins, minColour, maxColour);
		startGuess[i] = reset.value;
	}

	var newGuess = startGuess;
	while(!isValidSolution(nrPins, newGuess, guesses, points)) {
		newGuess = permutate(nrPins, minColour, maxColour, newGuess, possiblePins);
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
			allPoints.push({ black: pointsBlack, white: pointsWhite });
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
