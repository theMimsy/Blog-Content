
// Set the height and width of the output map
var width = 960,
    height = 500;

// Sets the projection (type of view) to use
var projection = d3.geo.albersUsa()
    .scale(1070) // size, bigger is bigger
    .translate([width / 2, height / 2]);

// Creates a new geographic path generator
var path = d3.geo.path().projection(projection);
var xScale = d3.scale.linear()
    .domain([0, 7])
    .range([0, 500]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(13)
    .tickFormat(d3.format("0.0f"));

// Create title
var title = d3.select(".d3-visual")
      .append("h3")
      .attr("id", "title")
      .text("Nielsen Designated Marketing Areas in 2017")

// Create output map space
var svg = d3.select(".d3-visual")
      .append("svg")
      .attr("class", "align-center")
      .attr("width", width)
      .attr("height", height)

// Create output textbox space
var text = d3.select(".d3-visual")
      .append("div")
      .attr("id", "textbox")

var graticule = d3.geo.graticule()
    .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
    .step([5, 5]);

// adding a blank background
svg.append("rect")
    .datum(graticule)
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);
   // .on("click", clicked);

//declare g as our appended svg
var g = svg.append("g");

var defaultFill = "#aaa";

d3.json("data/nielsentopo.json", function(error, dma) {

  var nielsen = dma.objects.nielsen_dma.geometries;

  // adding data from tv json (number of TVs, etc) to map json
  d3.json("data/tv_2017.json", function(error, tv){
    for (var i = 0; i < nielsen.length; i++){
      var dma_code = nielsen[i].id;
      for (key in tv[dma_code]){
        nielsen[i].properties[key] = tv[dma_code][key];
      }
    }
  dma.objects.nielsen_dma.geometries = nielsen;

  g.append("g")
    .attr("id", "dmas")
    .selectAll("path")
    .data(topojson.feature(dma, dma.objects.nielsen_dma).features)
    .enter()
    .append("path")
    .attr("d", path)
    //.on("click", clicked)
    
    .on("mouseover", function(d){
      d3.select(this)
      .attr("fill", "orange");

      var prop = d.properties;

      var string = "<p><strong>Market Area Name</strong>: " + prop.dma1 + "</p>";
      string += "<p><strong>Homes with TVs</strong>: " + numberWithCommas(prop["TV Homes"]) + "</p>";
      string += "<p><strong>% with Cable</strong>: " + prop.cableperc + "%</p>";
      string += "<p><strong>% US Population</strong>: " + prop["% of US"] + "%</p>";
      string += "<p><strong>Nielsen Rank</strong>: " + prop.Rank + "</p>";

      text.html("")
          .append("text")
          .html(string)
    })

    .on("mouseout", function(d){
      d3.select(this)
      .attr("fill", defaultFill)
    })
    
    .attr("opacity", 0.9)
    .attr("fill", defaultFill);

  // add dma borders
  g.append("path", ".graticule")
      .datum(topojson.mesh(dma, dma.objects.nielsen_dma, function(a, b) { 
        return true;
      }))
      .attr("id", "dma-borders")
      .attr("d", path);
  })

})

// via http://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

