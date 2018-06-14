(function () {
    "use strict"
    var h = 100;
    var w = 400;
    // var ds; //global var for data

    function BuildLine(ds) {
        var lineChart = d3.line()
            .x(function (d) { return (d.month - 20130001) / 3.25; })
            .y(function (d) { return h - d.sales; });

        var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        var vis = svg.append('path')
            .attr('d', lineChart(ds.monthlySales))
            .attr('stroke', 'purple')
            .attr('stroke-width', 3)
            .attr('fill', 'none');
    }

    function ShowHeader(ds) {
        d3.select('body')
            .append('h1')
            .text(ds.category + ' Sales (2013)')
    }

    d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            // ds = data;
        }
        var decodedData = JSON.parse(window.atob(data.content));

        console.log(decodedData.contents)

        decodedData.contents.forEach(function (ds) {
            console.log(ds);
            ShowHeader(ds);
            BuildLine(ds);
        });

        // ShowHeader();
        // BuildLine();
    });
})();