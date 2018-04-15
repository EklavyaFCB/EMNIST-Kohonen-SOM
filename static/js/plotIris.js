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

// Add tooltip for mouseovers
var tooltip1 = d3.select("#chartContent1_1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var tooltip2 = d3.select("#chartContent1_2").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var tooltip3 = d3.select("#chartContent2_1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var tooltip4 = d3.select("#chartContent2_2").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Mouseover Event Handler
var tipMouseover = function(d) {
    var irisType;
    //var tooltip;

    if (d.R == 255 && d.G == 0 && d.B == 0) {
      irisType = "Iris-setosa";
    } else if (d.R == 0 && d.G == 255 && d.B == 0) {
      irisType = "Iris-versicolor";
    } else if (d.R == 0 && d.G == 0 && d.B == 255) {
      irisType = "Iris-virginica";
    }

    var html  = "<span style='color:" + d3.rgb(d.R,d.G,d.B) + ";'>" + irisType;

    /*$(document).on('mouseover', 'div', function(e) {
        console.log($(e.target).attr('ID'))
    }*/

    tooltip1.html(html)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - $(this).parent().offset().top) + "px")
      .transition()
        .duration(200) // ms
        .style("opacity", .9)

};

// Mouseout event handler
var tipMouseout = function(d) {
    tooltip.transition()
        .duration(300) // ms
        .style("opacity", 0);
};

// Unsorted graph
d3.csv("/static/data/Iris/IrisUnsorted.csv").then(function(data) {

    // Read as ints not strings
    data.forEach(function(d) {
      d.xIris = +d.xIris;
      d.yIris = +d.yIris;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xIris; })).nice();
    y.domain(d3.extent(data, function(d) { return d.yIris; })).nice();

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
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xIris); })
        .attr("cy", function(d) { return y(d.yIris); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

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
d3.csv("/static/data/Iris/IrisUnsortedNoise.csv").then(function(data) {

    // Read as ints not strings
    data.forEach(function(d) {
      d.xIris = +d.xIris;
      d.yIris = +d.yIris;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xIris; })).nice();
    y.domain(d3.extent(data, function(d) { return d.yIris; })).nice();

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
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xIris); })
        .attr("cy", function(d) { return y(d.yIris); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

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
d3.csv("/static/data/Iris/IrisSorted.csv").then(function(data) {

  data.forEach(function(d) {
    d.xIris = +d.xIris;
    d.yIris = +d.yIris;
    d.R = +d.R
    d.G = +d.G;
    d.B = +d.B;
  });

  // Define domains of x and y axis
  x.domain(d3.extent(data, function(d) { return d.xIris; })).nice();
  y.domain(d3.extent(data, function(d) { return d.yIris; })).nice();

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
        .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.xIris); })
      .attr("cy", function(d) { return y(d.yIris); })
      .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);
});

// Sorted with noise
d3.csv("/static/data/Iris/IrisSortedNoise.csv").then(function(data) {

  data.forEach(function(d) {
    d.xIris = +d.xIris;
    d.yIris = +d.yIris;
    d.R = +d.R
    d.G = +d.G;
    d.B = +d.B;
  });

  // Define domains of x and y axis
  x.domain(d3.extent(data, function(d) { return d.xIris; })).nice();
  y.domain(d3.extent(data, function(d) { return d.yIris; })).nice();

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
        .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.xIris); })
      .attr("cy", function(d) { return y(d.yIris); })
      .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);
});