#!/usr/bin/env node

import traceroute from 'traceroute';
import chalk from 'chalk';
import { Animation } from 'termination';

const swordFrames = [
	`                  ___________
                 |.---------.|
            @)___||_        ||_______
  {8*8888*888{______}       ||_______>
            @)   ||_________||
                 '----)-(----'
                ____[=== o]___
               |::::::::::::::|
                -============--()`,
	`                  ___________
                 |.---------.|
            @)___||_reading ||_______
  {8*8888*888{______}       ||_______>
            @)   ||_________||
                 '----)-(----'
                ____[=== o]___
               |::::::::::::::|
                -============--()`,
	`                  ___________
                 |.---------.|
            @)___||_reading ||_______
  {8*8888*888{______} the   ||_______>
            @)   ||_________||
                 '----)-(----'
                ____[=== o]___
               |::::::::::::::|
                -============--()`,
	`                  ___________
                 |.---------.|
            @)___||_reading ||_______
  {8*8888*888{______} the   ||_______>
            @)   ||__bits___||
                 '----)-(----'
                ____[=== o]___
               |::::::::::::::|
                -============--()`,
]
const animation = new Animation({
    fps: 30,
    maxSize: {
        width: 80,
        height: 10,
    }
});
const sword = animation.add({
    x: 0,
    y: 0,
    content: swordFrames[0],
    replaceSpace: true,
});
const swordFramesTransition = sword.transition([
    {
        props: { content: swordFrames[0] },
        duration: 500
    },
    {
        props: { content: swordFrames[1] },
        duration: 500
    },
    {
        props: { content: swordFrames[2] },
        duration: 500
    },
    {
        props: { content: swordFrames[3] },
        duration: 500
    }
], { loop: true, loopInterval: 500 });

animation.start();

swordFramesTransition.run();

traceroute.trace('google.com', function (err, hops) {
	if (! err) {
		let values = [];
		hops.forEach(function(hop) {
		  Object.keys(hop).forEach(function(key) {
			values.push(Math.floor(hop[key]));
		  });
		});
		animation.end();
		console.clear();
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
		` + `\n The reading has been made. Use these numbers wisely.`);
}
