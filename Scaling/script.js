(function () {
	"use strict";

	var h = 100;
	var w = 400;

	function buildLine(ds) {

		var xScale = d3.scaleLinear()
			.domain([
				d3.min(ds.monthlySales, (d) => d.month),
				d3.max(ds.monthlySales, (d) => d.month)
			])
			.range([0, w]);

		var yScale = d3.scaleLinear()
			.domain([0,	d3.max(ds.monthlySales, (d) => d.sales)])
			.range([h, 10]);

		var lineFun = d3.line()
			.x((d) => xScale(d.month))
			.y((d) => yScale(d.sales));

		var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);


		var viz = svg.append("path")
			.attrs({
				d: lineFun(ds.monthlySales),
				"stroke": "purple",
				"stroke-width": 2,
				"fill": "none"
			});
	};

	function showHeader(ds) {
		d3.select("body").append("h1")
			.text(ds.category + " Sales (2013)");
	}

	d3.json(
		"https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json",
		function (error, data) {
			if (error) {
				console.log(error);
			} else {
				//console.log(data); //we're golden!
			}
			var decodedData = JSON.parse(window.atob(data.content));

			//console.log(decodedData.contents);
			decodedData.contents.forEach(function (ds) {
				//console.log(ds);
				showHeader(ds);
				buildLine(ds);
			});
		});
})();