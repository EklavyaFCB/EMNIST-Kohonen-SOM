/*
Name: Eklavya SARKAR, 
ID:201135564, 
Username: u5es2
*/

// Variables
var drawable; // Boolean press marker
var info; // Status string
var ctx; // Canvas var
var prev_X;
var prev_Y;
var rows = 28;
var cols = 28;

// Functions

// Trigger function
function setUp() {
  // Elements
  ctx = document.getElementById('myCanvas').getContext("2d");
  info = document.getElementById('status');
  drawable = false;

  // Grid
  /*var grid = document.createElement('table');
  grid.setAttribute('id', 't01');
  grid.setAttribute('align', 'center');

  for (var i=1; i<rows+1; i++ ) {
    var tr = grid.insertRow();
    for (var j=1; j<cols+1; j++) {
      var td = tr.insertCell();
    }
  }
  document.body.appendChild(grid);*/

  // Mouse button pressed
  $('#myCanvas').mousedown(function(e) {
    drawable = true;
    info.innerHTML = "Drawing";
    draw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
  });

  // Mouse moves in canvas
  $('#myCanvas').mousemove(function(e) {
    if (drawable) {
      info.innerHTML = "Drawing";
      draw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    }
  });

  // Mouse button released
  $('#myCanvas').mouseup(function(e) {
    drawable = false;
    info.innerHTML = "Drawn";
  });

  // Mouse leaves the canvas
  $('#myCanvas').mouseleave(function(e) {
    drawable = false;
    info.innerHTML = "Drawn";
  });
}

// Clear canvas
function clearCanvas(callType) {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  
  if (callType==0) {
    info.innerHTML = "Cleared";
  }
}

// Draw the recorded data
function draw(x, y, isDown) {
  if (isDown){
    // HTML Line properties
    ctx.strokeStyle = "#329894";
    ctx.lineJoin = "round";
    ctx.lineWidth = 20;

    ctx.beginPath(); 
    ctx.moveTo(prev_X, prev_Y); 
    ctx.lineTo(x, y); 
    ctx.closePath(); 
    ctx.stroke();
  }

  prev_X = x;
  prev_Y = y;

}

// Submit input
function submit() {
  // First clear the canvas
  clearCanvas();
  info.innerHTML = "Submitted";
}