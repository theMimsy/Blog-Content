// CANVAS
// ------------------------------------------------------------------

// Set the height and width of the output map
var width = 600,
    height = 500;

// Create the output map space
var svg = d3.select("#bayes-beta")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// SLIDERS
// ------------------------------------------------------------------

// Reaction to n-slider
d3.select("#n-range-beta").on("input", function() {
  // Update the n-range-beta counter
  updateRangeB("#n-count-beta", "n-range-beta", +this.value);

  // Update dependent x-range-beta counter
  d3.select("#x-range-beta").property("max", this.value);
  updateRangeB("#x-count-beta", "x-range-beta", d3.select("#x-range-beta").property("value"));

  // Update all necessary constants
  updateStatsB();
  updatePOSTB();
  updatePOSTO();

  // Redraw the picture
  if (+this.value == 0) 
  {
    drawB(posteriorFunctionB, "#posterior-beta", linearFunction);
    drawU(posteriorFunctionO, "#posterior-old", linearFunction);
  }
  else
  {
    drawB(posteriorFunctionB, "#posterior-beta", basisFunction);
    drawU(posteriorFunctionO, "#posterior-old", basisFunction);
  }
});

// Reaction to x-slider
d3.select("#x-range-beta").on("input", function() {
  // Update the x-range-beta counter
  updateRangeB("#x-count-beta", "x-range-beta", +this.value);

  // Update all necessary constants
  updateStatsB();
  updatePOSTB();
  updatePOSTO();

  // Redraw the picture
  drawB(posteriorFunctionB, "#posterior-beta", basisFunction);
  drawU(posteriorFunctionO, "#posterior-old", basisFunction);
});

function updateRangeB(count_id, range_id, value) {
  d3.select(count_id).text(value);
  d3.select(range_id).property("value", value);
}

// BUTTONS
// ------------------------------------------------------------------

d3.select("#alpha-numeric-beta").on("input", function() {
  updateStatsB();
  updatePOSTB();
  updatePRIORB();
  drawB(priorFunctionB, "#prior-beta");
  drawB(posteriorFunctionB, "#posterior-beta");
});

d3.select("#beta-numeric-beta").on("input", function() {
  updateStatsB();
  updatePOSTB();
  updatePRIORB();
  drawB(priorFunctionB, "#prior-beta");
  drawB(posteriorFunctionB, "#posterior-beta");
});

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
    .text("MEAN: ")
svg.append("text")
    .attr("y", padding / 2)
    .attr("x", padding + 110)
    .attr("id", "mean-beta");

svg.append("text")
    .attr("y", padding / 2 + 20)
    .attr("x", padding + 20)
    .attr("class", "posterior")
    .text("MEDIAN: ")
svg.append("text")
    .attr("y", padding / 2 + 20)
    .attr("x", padding + 110)
    .attr("id", "median-beta");

svg.append("text")
    .attr("y", padding / 2 + 40)
    .attr("x", padding + 20)
    .attr("class", "posterior")
    .text("MODE: ")
svg.append("text")
    .attr("y", padding / 2 + 40)
    .attr("x", padding + 110)
    .attr("id", "mode-beta");

function updateStatsB() {
  var n = +d3.select("#n-range-beta").property("value"),
      x = +d3.select("#x-range-beta").property("value");
      a = +d3.select("#alpha-numeric-beta").property("value");
      b = +d3.select("#beta-numeric-beta").property("value");
  var N = n + a + b - 2,
      X = x + a - 1;

  var xMean = (X + 1) / (N + 2),
      xMedian = (X + 2/3) / (N + 4/3);
      xMode = X / N;
  var yMean = posteriorFunctionB(xMean),
      yMedian = posteriorFunctionB(xMedian),
      yMode = posteriorFunctionB(xMode);
  
  d3.select("#mean-beta").text(
    xMean.toFixed(5) + ", " + yMean.toFixed(5));
  d3.select("#median-beta").text(
    xMedian.toFixed(5) + ", " + yMedian.toFixed(5));
  d3.select("#mode-beta").text(
    xMode.toFixed(5) + ", " + yMode.toFixed(5));
}

// CALCULATIONS
// ------------------------------------------------------------------

function binomial(n, k) {
  if ((typeof n !== 'number') || (typeof k !== 'number'))
    return false;
  return math.gamma(n + 1) / (math.gamma(k + 1) * math.gamma(n - k + 1));
}

function beta(a, b) {
  if ((typeof a !== 'number') ||  (typeof b !== 'number'))
    return false;
  return math.gamma(a + b) / (math.gamma(a) * math.gamma(b));
}

// Constants for Posterior based on Beta Distribution
var postB = { N: NaN, X: NaN, BIN: NaN };
function updatePOSTB() {
  var n = +d3.select("#n-range-beta").property("value"),
      x = +d3.select("#x-range-beta").property("value"),
      a = +d3.select("#alpha-numeric-beta").property("value"),
      b = +d3.select("#beta-numeric-beta").property("value");
  postB.N = n + a + b - 2;
  postB.X = x + a - 1;
  postB.BIN = binomial(postB.N, postB.X);
}
updatePOSTB();

var posteriorFunctionB = function(p) { 
  var N = postB.N,
      X = postB.X,
      BIN = postB.BIN;
  return (N + 1) * BIN * Math.pow(p, X) * Math.pow(1 - p, N - X);
};

// Constants for Posterior based on Uniform (old) Distribution
var postO = { n: NaN, x: NaN, BIN: NaN };
function updatePOSTO() {
  var n = +d3.select("#n-range-beta").property("value"),
      x = +d3.select("#x-range-beta").property("value");
  postO.n = n;
  postO.x = x;
  postO.BIN = binomial(postO.n, postO.x);
};
updatePOSTO();

var posteriorFunctionO = function(p) {
  var n = postO.n,
      x = postO.x,
      BIN = postO.BIN;
  return (n + 1) * BIN * Math.pow(p, x) * Math.pow(1 - p, n - x);
};

// Constants for Prior based on Beta Distribution
var priorB = { a: NaN, b: NaN, BETA: NaN };
function updatePRIORB() {
  var a = +d3.select("#alpha-numeric-beta").property("value"),
      b = +d3.select("#beta-numeric-beta").property("value");
  priorB.a = a;
  priorB.b = b;
  priorB.BETA = beta(priorB.a, priorB.b);
}
updatePRIORB();

var priorFunctionB = function(p) {
  var a = priorB.a,
      b = priorB.b,
      BETA = priorB.BETA;
  return BETA * Math.pow(p, a - 1) * Math.pow(1 - p, b - 1);
};

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

function drawB(f, id, st = basisFunction) {
  var plotdata = [];
  var lowX = 0, highX = xMax, dX = 0.005;
  
  plotdata.push([0, 0]);
  for (var i = lowX + dX; i <= highX; i = i + dX) {
    plotdata.push([i, f(i)]);
  }
  plotdata.push([1, 0]);

  d3.select(id).attr("d", st(plotdata));
}

svg.append("svg:path").attr("id", "prior-beta");
svg.append("svg:path").attr("id", "posterior-beta");
svg.append("svg:path").attr("id", "posterior-old");

drawB(priorFunctionB, "#prior-beta", linearFunction);
drawB(posteriorFunctionB, "#posterior-beta", basisFunction);
drawU(posteriorFunctionO, "#posterior-old", basisFunction);
updateStatsB(); 