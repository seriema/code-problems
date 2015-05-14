// http://www.spoj.com/problems/TEST/

var stdin = process.stdin;

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }

	var number = parseInt(key);
	if (number === 42)
		process.exit();
	else
		process.stdout.write( key );
});
