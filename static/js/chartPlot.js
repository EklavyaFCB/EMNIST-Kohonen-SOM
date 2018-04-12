var dataPoints = [];
 
function getDataPointsFromCSV(csv) {
    var dataPoints = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);
        
    for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(",");
            dataPoints.push({ 
                x: parseFloat(points[0]), 
                y: parseFloat(points[1]) 		
	    });
	}
    return dataPoints;
}
	 
$.get("https://canvasjs.com/services/data/datapoints.php?xstart=5&ystart=10&length=10&type=csv", function(data) {
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
	    text: "Chart from CSV",
        },
        data: [{
	    type: "line",
	    dataPoints: getDataPointsFromCSV(data)
	}]
    });
		
    chart.render();
 
});