//----------------------------------------------------------------------------------------
// MARGINS
//----------------------------------------------------------------------------------------
var margin = {top: 20, right: 10, bottom: 20, left: 15},
    width = 200 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

//----------------------------------------------------------------------------------------
// AXIS
//----------------------------------------------------------------------------------------
var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

//----------------------------------------------------------------------------------------
// ADD TO HTML
//
// TOP ROW
//----------------------------------------------------------------------------------------
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

var svg3_1 = d3.select("#chartContent3_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg4_1 = d3.select("#chartContent4_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg5_1 = d3.select("#chartContent5_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg6_1 = d3.select("#chartContent6_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//----------------------------------------------------------------------------------------
// TOOLTIPS
//----------------------------------------------------------------------------------------

var tooltip1 = d3.select("#chartContent1_1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Mouseover Event Handler
var tipMouseover = function(d) {

    var html  = "<span style='color:" + d3.rgb(d.R,d.G,d.B) + ";'>" + d.label;

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
        .style("opacity", 0);pp
};

//----------------------------------------------------------------------------------------
// BOTTOM ROW
//----------------------------------------------------------------------------------------
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

var svg3_2 = d3.select("#chartContent3_2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg4_2 = d3.select("#chartContent4_2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg5_2 = d3.select("#chartContent5_2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg6_2 = d3.select("#chartContent6_2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//----------------------------------------------------------------------------------------
// READ CSV
//
// TOP ROW
//----------------------------------------------------------------------------------------
d3.csv("/static/data/OCR/RandTrain.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R;
      d.G = +d.G;
      d.B = +d.B;
      d.label = +d.label;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg1_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg1_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg1_1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

});

d3.csv("/static/data/OCR/Train.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R;
      d.G = +d.G;
      d.B = +d.B;
      d.label = +d.label;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg2_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg2_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg2_1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

});

d3.csv("/static/data/OCR/RandTest.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R;
      d.G = +d.G;
      d.B = +d.B;
      d.label = +d.label;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg3_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg3_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg3_1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

});

d3.csv("/static/data/OCR/Test.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R;
      d.G = +d.G;
      d.B = +d.B;
      d.label = +d.label;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg4_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg4_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg4_1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

});

d3.csv("/static/data/OCR/RandCombined.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R;
      d.G = +d.G;
      d.B = +d.B;
      d.label = +d.label;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg5_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg5_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg5_1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

});

d3.csv("/static/data/OCR/Combined.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R;
      d.G = +d.G;
      d.B = +d.B;
      d.label = +d.label;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg6_1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg6_1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg6_1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);

});

//----------------------------------------------------------------------------------------
// BOTTOM ROW
//----------------------------------------------------------------------------------------
d3.csv("/static/data/OCR/RandTrainNoise.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg1_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg1_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg1_2.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

});

d3.csv("/static/data/OCR/TrainNoise.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg2_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg2_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg2_2.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

});

d3.csv("/static/data/OCR/RandTestNoise.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg3_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg3_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg3_2.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

});

d3.csv("/static/data/OCR/TestNoise.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg4_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg4_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg4_2.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

});

d3.csv("/static/data/OCR/RandCombinedNoise.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg5_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg5_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg5_2.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

});

d3.csv("/static/data/OCR/CombinedNoise.csv").then(function(data) {

    // Read as ints not strings
   data.forEach(function(d) {
      d.xSOM = +d.xSOM;
      d.ySOM = +d.ySOM;
      d.R = +d.R
      d.G = +d.G;
      d.B = +d.B;
    });

   console.log(data);

    // Define domains of x and y axis
    x.domain(d3.extent(data, function(d) { return d.xSOM; })).nice();
    y.domain(d3.extent(data, function(d) { return d.ySOM; })).nice();

    // Draw
    // X-axis
    svg6_2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    // Y-axis
    svg6_2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg6_2.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.xSOM); })
        .attr("cy", function(d) { return y(d.ySOM); })
        .style("fill", function(d) {return d3.rgb(d.R,d.G,d.B); })

});