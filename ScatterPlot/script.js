
(function () {

    var w = 350;
    var h = 400;

    monthlySales = [
        { "month": 10, "sales": 100 },
        { "month": 20, "sales": 130 },
        { "month": 30, "sales": 250 },
        { "month": 40, "sales": 300 },
        { "month": 50, "sales": 265 },
        { "month": 60, "sales": 225 },
        { "month": 70, "sales": 180 },
        { "month": 80, "sales": 120 },
        { "month": 90, "sales": 145 },
        { "month": 100, "sales": 130 },
        { "month": 110, "sales": 190 }
    ];

    //KPI color
    function salesKPI(d) {
        if (d >= 250) { return '#33CC66'; }
        else if (d < 250) { return '#666666'; }
    }

    function showMinMax(ds, col, val, type) {
        var max = d3.max(ds, function (d) { return d[col]; });
        var min = d3.min(ds, function (d) { return d[col]; });

        if (type == 'minmax' && (val == max || val == min)) {
            return val;
        }
        else {
            if (type == 'all') { return val; }
        }
    }

    var svg = d3.select("body")
        .append("svg")
        .attr('width', w)
        .attr('height', h);

    var dots = svg.selectAll('circles')
        .data(monthlySales)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return d.month * 3; })
        .attr('cy', function (d) { return h - d.sales; })
        .attr('r', 5)
        .attr('fill', function (d) { return salesKPI(d.sales); });

    var lables = svg.selectAll('text')
        .data(monthlySales)
        .enter()
        .append('text')
        .text(function (d) { return showMinMax(monthlySales, 'sales', d.sales, 'minmax'); })
        .attr('x', function (d) { return d.month * 3 - 28; })
        .attr('y', function (d) { return h - d.sales; })
        .attr('font-size', '12px')
        .attr('font-family', "sans-serif")
        .attr("fill", "#666666")
        .attr("text-anchor", "start");

        var lineFun = d3.svg.line()
        .x(function (d) { return d.month * 3; })
        .y(function (d) { return h - d.sales; })
        .interpolate("linear");


    var viz = svg.append("path")
        .attr({
            d: lineFun(monthlySales),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none"
        });
})();
