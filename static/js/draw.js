/*
Name: Eklavya SARKAR, 
ID:201135564, 
Username: u5es2
*/

// Variables
var drawable; // Boolean press marker
var info; // Status string
var ctx; // Canvas var

var offsetL;
var offsetT;

var xArr = []; // Store x values
var yArr = []; // Store y values
var prev_X;
var prev_Y;

var rows = 28;
var cols = 28;
var size = 336; // Width and height of canvas
var gridOn = true;

var bgOST;

// Functions

function setUp() {

  // Elements
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');

  if (typeof ctx2 !== 'undefined') {
    ctx2 = document.getElementById('myCanvas2').getContext('2d');
  }

  info = document.getElementById('status');
  drawable = false;
  drawGrid();
  //drawTable();

  audioSetUp();
  //audioPlay();

  /* --- MOUSE EVENTS --- */
  // Mouse button pressed
  $('#myCanvas').mousedown(function(e) {
    drawable = true;
    info.innerHTML = 'Drawing';

    // Correct offsets because of bootstrap's col-lg-8 offset-lg-2
    var offsetL = this.offsetLeft + $(this).parent().offset().left - 15;
    var offsetT = this.offsetTop + $(this).parent().offset().top;

    // drawLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
    drawLine(e.pageX - offsetL, e.pageY - offsetT, false);
  });

  // Mouse moves in canvas
  $('#myCanvas').mousemove(function(e) {
    if (drawable) {
      info.innerHTML = 'Drawing';

      // Correct offsets because of bootstrap's col-lg-8 offset-lg-2
      var offsetL = this.offsetLeft + $(this).parent().offset().left - 15;
      var offsetT = this.offsetTop + $(this).parent().offset().top;

      // drawLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
      drawLine(e.pageX - offsetL, e.pageY - offsetT, true);
    }
  });

  // Mouse button released
  $('#myCanvas').mouseup(function(e) {
    drawable = false;
    info.innerHTML = 'Drawn';
  });

  // Mouse leaves the canvas
  $('#myCanvas').mouseleave(function(e) {
    drawable = false;
    info.innerHTML = 'Press submit to cluster';
  });


  /* --- TOUCH EVENTS --- */
  
  // Touch Start
  canvas.addEventListener('touchstart', function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);
  
  // Touch End
  canvas.addEventListener('touchend', function (e) {
    var mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  }, false);
  
  // Touch Move
  canvas.addEventListener('touchmove', function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  /* --- SCROLL EVENTS --- */

  // Prevent unintended touch scroll
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

}

// Set up audio
function audioSetUp() {
  bgOST = new Howl({
    src: ['static/sounds/OST/FastDrawing.mp3'],
    autoplay: false,
    loop: false,
    volume: 0.5
  });
}

function audioPlay() {
  // Clear listener after first call.
  bgOST.once('load', function(){
    bgOST.play();
  });

  // Fires when the sound finishes playing.
  bgOST.on('end', function(){
    console.log('Finished playing!');
  });
}

// Clear canvas
function clearCanvas(callType) {
  
  //ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // Apparently the best to clear the canvas is not by 
  // clearing a rectangle of a certain width and height
  // but by re-defining the values.

  canvas.width = canvas.width;
  
  if (typeof ctx2 !== 'undefined') {
    //ctx2.clearRect(0, 0, myCanvas.width, myCanvas.height);
    canvas.width = canvas.width;
  }

  xArr = [];
  yArr = [];
  
  if (callType==0) {
    info.innerHTML = "Cleared";
  }

  if (gridOn) {
    drawGrid();
  }

}

// Draw the recorded data
function drawLine(x, y, isDown) {
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

  xArr.push(prev_X);
  yArr.push(prev_Y);

}

// Draw the 28x28 grid
function drawGrid() {

    // We increment by 12 until we reach 336, to get 28 rows and columns
    for (var i=0; i<336; i+=12) { 
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 336);
    }

    for (var i=0; i<336; i+=12) { 
      ctx.moveTo(0, i);
      ctx.lineTo(336, i);
    }

    ctx.strokeStyle = "#ffe4ce";
    ctx.lineWidth = 1;

    if (!gridOn) {
      ctx.strokeStyle = "#ffd6b4";
      ctx.lineWidth = 0;
    }

    ctx.closePath();
    ctx.stroke();

    gridOn = !gridOn;
  
}

function reDraw() {
  // HTML Line properties
  ctx2.strokeStyle = "#329894";
  ctx2.lineJoin = "round";
  ctx2.lineWidth = 20;

  for (var i=0; i<xArr.length; i++) {
    ctx2.beginPath();
    ctx2.moveTo(xArr[i-1], yArr[i-1]);
    ctx2.lineTo(xArr[i],yArr[i]);
    ctx2.closePath();
    ctx2.stroke();
  }
}

/*function drawTable() {
  // Grid
  var grid = document.createElement('table');
  grid.setAttribute('id', 't01');
  grid.setAttribute('align', 'center');

  for (var i=1; i<rows+1; i++ ) {
    var tr = grid.insertRow();
    for (var j=1; j<cols+1; j++) {
      var td = tr.insertCell();
    }
  }
  document.getElementById("myCanvas").appendChild(grid);
  console.log("appended")
}*/

// Submit input
function carry() {
  info.innerHTML = "Submitted";
  if (typeof ctx2 !== 'undefined') {
    reDraw();
  }
}