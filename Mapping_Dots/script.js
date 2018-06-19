(function () {
	"use strict";

	let w = 800;
	let h = 700;

	var projection = d3.geoNaturalEarth1()
		.translate([w / 2, h / 2])
		.scale(300);

	let path = d3.geoPath().projection(projection);

	let svg = d3.select('body').append('svg').attrs({ width: w, height: h });

	d3.json('countries.geo.json', function (json) {

		svg.selectAll('path')
			.data(json.features)
			.enter()
			.append('path')
			.attr('d', path)
			.style('fill', '#666666');

		d3.csv('sales-by-city.csv', function (data) {
			svg.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.attr('cx', (d) => projection([d.lon, d.lat])[0])
				.attr('cy', (d) => projection([d.lon, d.lat])[1])
				.attr('r', (d)=> Math.sqrt(parseInt(d.sales)*0.0001))
				.attr('fill', 'lime');
		});

		
	});
})();