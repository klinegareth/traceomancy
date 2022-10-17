#!/usr/bin/env node

// Traceomancy
// Uses round trip times as basis for fortune telling

import traceroute from 'traceroute';
import chalk from 'chalk';

traceroute.trace('google.com', function (err, hops) {
	if (! err) {
		let values = [];
		hops.forEach(function(hop) {
		  Object.keys(hop).forEach(function(key) {
			values.push(Math.floor(hop[key]));
		  });
		});
		withASCII(values);
	}
});

const withASCII = (values) => {
	let chalkyNums = [];
	for (let value in values) {
		let color = chalk.rgb(Math.floor((Math.random() * 255)), Math.floor((Math.random() * 255)), Math.floor((Math.random() * 255)));
		chalkyNums.push(color(values[value]));
	}
	console.log(`
        _      				   
   _     /||   			  *	   		${chalkyNums[2]}  *
  ( }    \||D  *  	${chalkyNums[0]}   *		 ${chalkyNums[4]}
| /\__,=_[_]  		*		  	*			${chalkyNums[3]} 
|_\_  |----|                 ${chalkyNums[1]}    	* 
|  |/ |    |                   
|  /_ |    |                   
		`);
}
