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
	var nrTestCases = parseInt(lines[0]);

	for (var i = 0; i < nrTestCases; i++) {
		var line = lines[i+1];
		var data = line.split(' ');
		var nrPiles = parseInt(data[0]);
		var shortestPile = parseInt(data[1]);
		var heightDifference = parseInt(data[2]);

		var nrCookies = countCookies(nrPiles, shortestPile, heightDifference);
		writeLn(nrCookies);
	}

	process.exit();
});
