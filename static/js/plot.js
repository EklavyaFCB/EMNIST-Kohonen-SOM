// Margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Axis
var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

// Adding to HTML
var svg = d3.select("#chartContent").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read .csv
d3.csv("/static/data/TrainCoordinates.csv").then(function(trainData) {

    // Read as ints not strings
   trainData.forEach(function(d) {
      d.xTrain = +d.xTrain;
      d.yTrain = +d.yTrain;
    });

   console.log(trainData);

    // Define domains of x and y axis
    x.domain(d3.extent(trainData, function(d) { return d.xTrain; })).nice();
    y.domain(d3.extent(trainData, function(d) { return d.yTrain; })).nice();

    // Draw
    // X-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    // Each datapoint is a circle - represented by r, cx, cy
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll(".dot")
        .data(trainData)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xTrain); })
        .attr("cy", function(d) { return y(d.yTrain); })
        .style("fill", d3.color("blue"))

   /* var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });*/

  });

d3.csv("/static/data/TestCoordinates.csv").then(function(testData) {
  console.log(testData);

  testData.forEach(function(d) {
    d.xTest = +d.xTest;
    d.yTest = +d.yTest;
  });

  svg.selectAll(".dot")
        .data(testData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.xTest); })
      .attr("cy", function(d) { return y(d.yTest); })
      .style("fill", d3.color("green"))
      console.log("YOLO");
});