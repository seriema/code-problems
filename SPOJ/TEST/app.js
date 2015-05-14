// http://www.spoj.com/problems/TEST/

var stdin = process.stdin;
var endOfLine = require('os').EOL;

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( input ){
  var lines = input.split(endOfLine);

	for (var i = 0; i < lines.length; i++) {
		var string = lines[i];
		var number = parseInt(string);
		if (number === 42)
			process.exit();
		else
			process.stdout.write(string + endOfLine);
	}
});
