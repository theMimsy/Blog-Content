// CANVAS
// ------------------------------------------------------------------

// Set the height and width of the output map
var width = 600,
    height = 500;

// Create the output map space
var svg = d3.select("#bayes-uniform")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// SLIDERS
// ------------------------------------------------------------------

// Reaction to n-slider
d3.select("#n-range-uniform").on("input", function() {
  // Update the n-range-uniform counter
  updateRangeU("#n-count-uniform", "n-range-uniform", +this.value);
  
  // Update dependent x-range-uniform counter
  d3.select("#x-range-uniform").property("max", this.value);
  updateRangeU("#x-count-uniform", 
    "x-range-uniform", d3.select("#x-range-uniform").property("value"));
  updateStatsU();

  // Redraw the picture
  if (+this.value == 0)
    drawU(posteriorFunctionU, "#posterior-uniform", linearFunction);
  else
    drawU(posteriorFunctionU, "#posterior-uniform", basisFunction);
});

// Reaction to x-slider
d3.select("#x-range-uniform").on("input", function() {
  // Update the x-range-uniform counter
  updateRangeU("#x-count-uniform", "x-range-uniform", +this.value);
  updateStatsU();

  // Redraw the picture
  drawU(posteriorFunctionU, "#posterior-uniform");
});

function updateRangeU(count_id, range_id, value) {
  d3.select(count_id).text(value);
  d3.select(range_id).property("value", value);
}

function updateStatsU() {
  var n = +d3.select("#n-range-uniform").property("value"),
      x = +d3.select("#x-range-uniform").property("value");
  
  var xMean = (x + 1) / (n + 2),
      xMedian = (x + 2/3) / (n + 4/3);
      xMode = x / n;
  var yMean = posteriorFunctionU(xMean),
      yMedian = posteriorFunctionU(xMedian),
      yMode = posteriorFunctionU(xMode);
  
  d3.select("#mean-beta").text(
    xMean.toFixed(5) + ", " + yMean.toFixed(5));
  d3.select("#median-beta").text(
    xMedian.toFixed(5) + ", " + yMedian.toFixed(5));
  d3.select("#mode-beta").text(
    xMode.toFixed(5) + ", " + yMode.toFixed(5));

  d3.select("#mean-uniform").text(
    xMean.toFixed(5) + ", " + yMean.toFixed(5));
  d3.select("#median-uniform").text(
    xMedian.toFixed(5) + ", " + yMedian.toFixed(5));
  d3.select("#mode-uniform").text(
    xMode.toFixed(5) + ", " + yMode.toFixed(5));
}

// AXES
// ------------------------------------------------------------------

var padding = 60,
xMax = 1,
yMax = 10,
xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([padding, width - padding]),
yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - padding, padding]),
xAxis = d3.axisBottom()
        .scale(xScale),
yAxis = d3.axisLeft()
        .scale(yScale);

svg.append("svg:g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);
svg.append("svg:g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 + padding / 3)
    .attr("x", 0 - (height / 2))
    .style("text-anchor", "middle")
    .text("Probability Density");

svg.append("text")
    .attr("y", height - padding / 3)
    .attr("x", width / 2)
    .style("text-anchor", "middle")
    .text("p");

// REPORTING
// ------------------------------------------------------------------

svg.append("text")
    .attr("y", padding / 2)
    .attr("x", padding + 20)
    .attr("class", "posterior")
    .text("MEAN: ");
svg.append("text")
    .attr("y", padding / 2)
    .attr("x", padding + 110)
    .attr("id", "mean-uniform");

svg.append("text")
    .attr("y", padding / 2 + 20)
    .attr("x", padding + 20)
    .attr("class", "posterior")
    .text("MEDIAN: ");
svg.append("text")
    .attr("y", padding / 2 + 20)
    .attr("x", padding + 110)
    .attr("id", "median-uniform");

svg.append("text")
    .attr("y", padding / 2 + 40)
    .attr("x", padding + 20)
    .attr("class", "posterior")
    .text("MODE: ");
svg.append("text")
    .attr("y", padding / 2 + 40)
    .attr("x", padding + 110)
    .attr("id", "mode-uniform");

// CALCULATIONS
// ------------------------------------------------------------------

function binomial(n, k) {
  if ((typeof n !== 'number') || (typeof k !== 'number'))
    return false;
  var coeff = 1;
  var j = (k > n / 2 + 1) ? n - k : k;
  for (var x = n-j+1; x <= n; x++) coeff *= x;
  for (x = 1; x <= j; x++) coeff /= x;
  return coeff;
}

var posteriorFunctionU = function(p) { 
  var n = +d3.select("#n-range-uniform").property("value"),
      x = +d3.select("#x-range-uniform").property("value");
  return (n + 1) * binomial(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
};

var priorFunctionU = function(p) { return 1; };

// PATHS
// ------------------------------------------------------------------

var linearFunction = d3.line()
    .x(function(d) { return xScale(d[0]); })
    .y(function(d) { return yScale(d[1]); })
    .curve(d3.curveLinear);

var basisFunction = d3.line()
    .x(function(d) { return xScale(d[0]); })
    .y(function(d) { return yScale(d[1]); })
    .curve(d3.curveBasis)

function drawU(f, id, st = basisFunction) {
  var plotdata = [];
  var lowX = 0, highX = xMax, dX = 0.01;
  
  plotdata.push([0, 0]);
  for (var i = lowX; i <= highX + dX; i = i + dX) {
    plotdata.push([i, f(i)]);
  }
  plotdata.push([1, 0]);

  d3.select(id).attr("d", st(plotdata));
}

svg.append("svg:path").attr("id", "prior-uniform");
svg.append("svg:path").attr("id", "posterior-uniform");

drawU(priorFunctionU, "#prior-uniform", linearFunction);
drawU(posteriorFunctionU, "#posterior-uniform", basisFunction);
updateStatsU();