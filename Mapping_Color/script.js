(function () {
	"use strict";

	let w = 700;
	let h = 700;

	var projection = d3.geoAlbersUsa()
	.translate([w/2, h/2])
	.scale(500);

	let path = d3.geoPath().projection(projection);

	let svg = d3.select('body').append('svg').attrs({ width: w, height: h });

	let mainColor = d3.scaleLinear()
		.range(['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']);

	d3.csv('state-sales.csv', function (data) {
		mainColor.domain([
			0, d3.max(data, (d) => d.sales)
		]);

		d3.json('us.json', function (json) {

			for (let i = 0; i < data.length; i++) {
				let salesState = data[i].state;
				let salesVal = parseFloat(data[i].sales);

				for (let j = 0; j < json.features.length; j++) {
					let usState = json.features[j].properties.NAME;
					if (salesState == usState) {
						json.features[j].properties.value = salesVal;
						break;
					}
				}
			}

			svg.selectAll('path')
				.data(json.features)
				.enter()
				.append('path')
				.attr('d', path)
				.style('fill', function(d){
					let value = d.properties.value;

					if(value){
						return mainColor(value);
					}else{
						return '#666666';
					}
				});
		});
	});


})();