(function () {

    var w = 300;
    var h = 300;
    var padding = 2; // space between bars
    var dataset = [7, 10, 12, 14, 17, 25, 50, 65, 40, 45, 50];

    var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    function colorPicker(v) {
        if (v <= 20) { return "#666666"; }
        else if (v > 20 && v < 50) { return "#009900"; }
        else if (v >= 50) { return "#0040ff"; }
    }

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attrs({
            x: function (d, i) { return i * (w / dataset.length); },
            y: function (d) { return h - (d * 3); },
            width: w / dataset.length - padding,
            height: function (d) { return d * 3; },
            fill: function (d) { return colorPicker(d); }
        })
        .on('mouseover', function (d) {
            svg.append("text")

                .text(d)
                .attrs({
                    "text-anchor": "middle",
                    x: parseFloat(d3.select(this).attr('x')) +
                        parseFloat(d3.select(this).attr('width') / 2),
                    y: parseFloat(d3.select(this).attr('y')) + 15,
                    "font-family": "sans-serif",
                    "font-size": 16,
                    "font-weight": "bold",
                    "fill": "#ffffff",
                    id: 'tooltip'
                });
        })
        .on('mouseout', function(){
            d3.select('#tooltip').remove();
        });

    // Simple lables
    // svg.selectAll("text")
    //     .data(dataset)
    //     .enter()
    //     .append("text")
    //     .text(function (d) { return d; })
    //     .attrs({
    //         "text-anchor": "middle",
    //         x: function (d, i) { return i * (w / dataset.length) + (w / dataset.length - padding) / 2; },
    //         y: function (d) { return h - (d * 3) + 16; },
    //         "font-family": "sans-serif",
    //         "font-size": 16,
    //         "font-weight": "bold",
    //         "fill": "#ffffff"
    //     });
})();