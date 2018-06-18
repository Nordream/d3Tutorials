(function () {
	"use strict";

	let w = 700;
	let h = 700;

	var projection = d3.geoMercator();

	let path = d3.geoPath().projection(projection);

	let svg = d3.select('body').append('svg').attrs({ width: w, height: h });

	d3.json('us.json', function(json){
		svg.selectAll('path')
		.data(json.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('fill', '#666666');
	})
})();