// Margins
var margin = {top: 20, right: 10, bottom: 20, left: 15},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Axis
var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

// Adding to HTML
var svg1_1 = d3.select("#chartContent1_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2_1 = d3.select("#chartContent2_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg1_2 = d3.select("#chartContent1_2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2_2 = d3.select("#chartContent2_2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Unsorted graph
d3.csv("/static/data/RGB/RGBUnsorted.csv").then(function(trainData) {

    // Read as ints not strings
    trainData.forEach(function(d) {
      d.xRGB = +d.xRGB;
      d.yRGB = +d.yRGB;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

    console.log(trainData);

    // Define domains of x and y axis
    x.domain(d3.extent(trainData, function(d) { return d.xRGB; })).nice();
    y.domain(d3.extent(trainData, function(d) { return d.yRGB; })).nice();

    // Draw
    // X-axis
    svg1_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text").remove();
      /*.append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")*/

    // Y-axis
    svg1_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .selectAll("text").remove();
      /*.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")*/

    svg1_1.selectAll(".dot")
        .data(trainData)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xRGB); })
        .attr("cy", function(d) { return y(d.yRGB); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

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

// Unsorted with noise
d3.csv("/static/data/RGB/RGBUnsortedNoise.csv").then(function(trainData) {

    // Read as ints not strings
    trainData.forEach(function(d) {
      d.xRGB = +d.xRGB;
      d.yRGB = +d.yRGB;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

    console.log(trainData);

    // Define domains of x and y axis
    x.domain(d3.extent(trainData, function(d) { return d.xRGB; })).nice();
    y.domain(d3.extent(trainData, function(d) { return d.yRGB; })).nice();

    // Draw
    // X-axis
    svg1_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text").remove();
      /*.append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")*/

    // Y-axis
    svg1_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .selectAll("text").remove();
      /*.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")*/

    svg1_2.selectAll(".dot")
        .data(trainData)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xRGB); })
        .attr("cy", function(d) { return y(d.yRGB); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

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

// Sorted without noise
d3.csv("/static/data/RGB/RGBSorted.csv").then(function(testData) {
  console.log(testData);

  testData.forEach(function(d) {
    d.xRGB = +d.xRGB;
    d.yRGB = +d.yRGB;
    d.R = +d.R
    d.G = +d.G;
    d.B = +d.B;
  });

  // Define domains of x and y axis
  x.domain(d3.extent(testData, function(d) { return d.xRGB; })).nice();
  y.domain(d3.extent(testData, function(d) { return d.yRGB; })).nice();

  // Draw
  // X-axis
  svg2_1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text").remove();
    //.append("text")
      //.attr("class", "label")
      //.attr("x", width)
      //.attr("y", -6)
      //.style("text-anchor", "end")

  // Y-axis
  svg2_1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .selectAll("text").remove();
    /*.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")*/

  svg2_1.selectAll(".dot")
        .data(testData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.xRGB); })
      .attr("cy", function(d) { return y(d.yRGB); })
      .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
});

// Sorted with noise
d3.csv("/static/data/RGB/RGBSortedNoise.csv").then(function(testData) {
  console.log(testData);

  testData.forEach(function(d) {
    d.xRGB = +d.xRGB;
    d.yRGB = +d.yRGB;
    d.R = +d.R
    d.G = +d.G;
    d.B = +d.B;
  });

  // Define domains of x and y axis
  x.domain(d3.extent(testData, function(d) { return d.xRGB; })).nice();
  y.domain(d3.extent(testData, function(d) { return d.yRGB; })).nice();

  // Draw
  // X-axis
  svg2_2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text").remove();
    //.append("text")
      //.attr("class", "label")
      //.attr("x", width)
      //.attr("y", -6)
      //.style("text-anchor", "end")

  // Y-axis
  svg2_2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .selectAll("text").remove();
    /*.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")*/

  svg2_2.selectAll(".dot")
        .data(testData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.xRGB); })
      .attr("cy", function(d) { return y(d.yRGB); })
      .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
});