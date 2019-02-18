function generateData(shift, label, color) {
    var data = [];
    for (let x = 0; x < 30; x++)
        data.push({ x: x, y: (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100) });

    var dataset = {
        backgroundColor: color,
        borderColor: color,
        showLine: true,
        fill: false,
        pointRadius: 3,
        label: label,
        data: data,
        lineTension: 0.5,
        interpolate: true
    };
    return dataset;
}
var options = {
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom'
        }],
        yAxes: [{
        }]
    },
    tooltips: {
        mode: "interpolate",
        intersect: false,
        callbacks: {
            title: function (ctx) {
                return (ctx[0].xLabel.toFixed(2) + " Sec");
            },
            label: function (ctx, d) {
                return (d.datasets[ctx.datasetIndex].label + ": " + ctx.yLabel.toFixed(2));
            }
        }
    },
    plugins: {
        crosshair: {
            line: {
                color: '#F66',  // crosshair line color
                width: 3        // crosshair line width
            },
            sync: {
                enabled: true,            // enable trace line syncing with other charts
                group: 1,                 // chart group
                suppressTooltips: false   // suppress tooltips when showing a synced tracer
            },
            zoom: {
                enabled: true,                                      // enable zooming
                zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',     // background color of zoom box 
                zoomboxBorderColor: '#48F',                         // border color of zoom box
                zoomButtonText: '—',                       // reset zoom button text
                zoomButtonClass: 'reset-zoom',                      // reset zoom button class
            },
            callbacks: {
                beforeZoom: function (start, end) {                  // called before zoom, return false to prevent zoom
                    return true;
                },
                afterZoom: function (start, end) {                   // called after zoom
                }
            }
        }
    }
};
console.log(options);

var chart1 = new Chart(document.getElementById("chart1").getContext("2d"), {
    type: "scatter",
    data: {
        datasets: [generateData(0, "1st Chart", "rgba(75, 192, 192, 1)")]
    },
    options: options,
});

var chart2 = new Chart(document.getElementById("chart2").getContext("2d"), {
    type: "scatter",
    data: {
        datasets: [generateData(1, "2nd Chart", "rgba(54, 162, 235, 1)")]
    },
    options: options,
});

var chart3 = new Chart(document.getElementById("chart3").getContext("2d"), {
    type: "scatter",
    data: {
        datasets: [generateData(1, "3th Chart", "gray")]
    },
    options: options,
});

var panZoom = function (e) {
    if (e.keyCode === 37) {
        chart1.panZoom(-1);
        chart2.panZoom(-1);
        chart3.panZoom(-1);
    } else if (e.keyCode === 39) {
        chart1.panZoom(1);
        chart2.panZoom(1);
        chart3.panZoom(1);
    }
};

window.addEventListener("keydown", panZoom);
