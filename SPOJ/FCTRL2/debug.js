var bi = require('./app.js');

function outputResult(sign, result, test) {
	var ok = result.join('') === test.expected.toString();
	var okMsg = ('ok ' + test.bigint + ' ' + sign + ' ' + test.smallint + ' = ' + test.expected.toString());
	var failMsg = ('NO! ' + test.bigint + ' ' + sign + ' ' + test.smallint + ' was ' + result.toString() + ' which is not ' + test.expected.toString());
	var msg = ok ? okMsg : failMsg;
	process.stdout.write(msg + '\n');
}

process.stdout.write('- ADDITION -\n');
[
	{ bigint:  0, smallint: 0, expected: 0 },
	{ bigint:  0, smallint: 1, expected: 1 },
	{ bigint:  1, smallint: 0, expected: 1 },
	{ bigint:  1, smallint: 1, expected: 2 },
	{ bigint:  5, smallint: 2, expected: 7 },
	{ bigint:  9, smallint: 1, expected: 10 },
	{ bigint: 50, smallint: 2, expected: 52 },
	{ bigint: 99, smallint: 2, expected: 101 },
	{ bigint: 99, smallint: 99, expected: 198 },
	{ bigint: 891, smallint: 8910, expected: 9801 }
].forEach(function (test) {
	var big = bi.createBigInt(test.bigint);
	var small = bi.createBigInt(test.smallint);
	var sum = bi.addBigInt(big, small);
	outputResult('+', sum, test);
});

process.stdout.write('- MULTIPLICATION -\n');
[
	{ bigint:  2, smallint:  0, expected: 0 },
	{ bigint:  2, smallint:  2, expected: 4 },
	{ bigint:  5, smallint:  2, expected: 10 },
	{ bigint: 50, smallint:  2, expected: 100 },
	{ bigint: 99, smallint:  2, expected: 198 },
	{ bigint: 99, smallint:  9, expected: 891 },
	{ bigint: 99, smallint: 10, expected: 990 },
	{ bigint: 99, smallint: 20, expected: 1980 },
	{ bigint: 99, smallint: 99, expected: 9801 }
].forEach(function (test) {
	var big = bi.createBigInt(test.bigint);
	var small = bi.createBigInt(test.smallint);
	var product = bi.multiplyBigInt(big, small);
	outputResult('*', product, test);
});

process.exit();
