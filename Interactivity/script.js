(function () {
	"use strict";

	var h = 300;
	var w = 700;
	var padding = 20;

	function GetDate(date) {
		let strDate = new String(date);

		let year = strDate.substr(0, 4);
		let month = strDate.substr(4, 2) - 1;
		let day = strDate.substr(6, 2);

		return new Date(year, month, day);

	}

	function buildLine(ds) {

		var svg = d3.select(".container")
			.append("svg")
			.attr("width", w)
			.attr("height", h)
			.attr('id', 'svg-' + ds.category);

		// The data (ds) should be sorted properly
		let minDate = GetDate(ds.monthlySales[0]['month']);
		let maxDate = GetDate(ds.monthlySales[(ds.monthlySales.length - 1)]['month']);

		// Tooltip
		var tooltip = d3.select('body')
			.append('div')
			.attr('class', "tooltip")
			.style('opacity', 0);

		// Scales
		var xScale = d3.scaleTime()
			.domain([minDate, maxDate])
			.range([padding + 5, w - padding]);

		var yScale = d3.scaleLinear()
			.domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
			.range([h - padding, 10])
			.nice();

		// Line
		var lineFun = d3.line()
			.x((d) => xScale(GetDate(d.month)))
			.y((d) => yScale(d.sales));

		// Axis
		var xAxisGen = d3.axisBottom()
			.scale(xScale)
			.tickFormat(d3.timeFormat('%b'));

		var yAxisGen = d3.axisLeft()
			.scale(yScale);
		//.ticks(5);

		var xAxis = svg.append('g')
			.call(xAxisGen)
			.attr('class', 'x-axis')
			.attr('transform', 'translate(0, ' + (h - padding) + ')');

		var yAxis = svg.append('g')
			.call(yAxisGen)
			.attr('class', 'y-axis')
			.attr('transform', 'translate(' + padding + ', 0)');


		// Drawing the Line
		var viz = svg.append("path")
			.attrs({
				d: lineFun(ds.monthlySales),
				"stroke": "purple",
				"stroke-width": 2,
				"fill": "none",
				"id": "path-" + ds.category
			});

		var dots = svg.selectAll('circle')
			.data(ds.monthlySales)
			.enter()
			.append('circle')
			.attr('cx', (d) => xScale(GetDate(d.month)))
			.attr('cy', (d) => yScale(d.sales))
			.attr('r', 5)
			.attr('fill', '#666666')
			.attr('class', 'circle-' + ds.category)
		.on('mouseover', function (d) {
			tooltip.transition()
				.duration(500)
				.style('opacity', .85);
			tooltip.html('<strong>Sales $' + d.sales + "K</strong>")
				.style('left', (d3.event.pageX) + 'px')
				.style('top', (d3.event.pageY - 28) + 'px');
		})
		.on('mouseout', function(d){
			tooltip.transition()
			.duration(300)
			.style('opacity', 0);
		});

	}

	function updateLine(ds) {

		var svg = d3.select(".container").select('#svg-' + ds.category);

		// The data (ds) should be sorted properly
		let minDate = GetDate(ds.monthlySales[0]['month']);
		let maxDate = GetDate(ds.monthlySales[(ds.monthlySales.length - 1)]['month']);

		// Scales
		var xScale = d3.scaleTime()
			.domain([minDate, maxDate])
			.range([padding + 5, w - padding]);

		var yScale = d3.scaleLinear()
			.domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
			.range([h - padding, 10])
			.nice();

		// Line
		var lineFun = d3.line()
			.x((d) => xScale(GetDate(d.month)))
			.y((d) => yScale(d.sales));

		// Axis
		var xAxisGen = d3.axisBottom()
			.scale(xScale)
			.tickFormat(d3.timeFormat('%b'))
			.ticks(ds.monthlySales.length - 1);

		var yAxisGen = d3.axisLeft()
			.scale(yScale);
		//.ticks(5);

		var xAxis = svg.selectAll('g.x-axis').call(xAxisGen);

		var yAxis = svg.selectAll('g.y-axis').call(yAxisGen);


		// Drawing the Line
		var viz = svg.selectAll("#path-" + ds.category)
			.transition()
			.duration(3000)
			.ease(d3.easeBounce)
			.attr('d', lineFun(ds.monthlySales));
	}

	function showHeader(ds) {
		d3.select(".container").append("h1")
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

			// Add event listener
			d3.select('select')
				.on('change', function (d) {
					var selection = d3.select('#date-option').node().value;
					var decodedData = JSON.parse(window.atob(data.content));

					decodedData.contents.forEach(function (ds) {
						// Filter array according to selection
						ds.monthlySales.splice(0, ds.monthlySales.length - selection);
						// Update line
						updateLine(ds);
					});
				});

		});
})();