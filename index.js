#!/usr/bin/env node

// Traceomancy
// Uses round trip times as basis for fortune telling

traceroute = require('traceroute');

traceroute.trace('google.com', function (err, hops) {
	if (! err) {
		hops.forEach(function(hop) {
		  Object.keys(hop).forEach(function(key) {
			console.log(Math.floor(hop[key]));
		  });
		});
	}
});


