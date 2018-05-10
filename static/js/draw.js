/*
Name: Eklavya SARKAR, 
ID:201135564, 
Username: u5es2
*/

//----------------------------------------------------------------------------------------
// VARIABLES
//----------------------------------------------------------------------------------------
var drawable; // Boolean press marker
var info; // Status string
var ctx; // Canvas var

var offsetL;
var offsetT;

var xArr = []; // Store x values
var yArr = []; // Store y values
var coordinates = []; // Store X,Y values
var prev_X;
var prev_Y;

var rows = 28;
var cols = 28;
var size = 336; // Width and height of canvas
var gridOn = true;
var muted = true;
var initial = true;
var bgOST;

var len;
var myJSON;

var canvasIndImage;
var contextIndImg;

//----------------------------------------------------------------------------------------
// SET-UPS
//----------------------------------------------------------------------------------------

function setUp() {

  console.log("Setting up");

  // Elements
  volIcon = document.getElementById("volIcon");
  //currText = document.getElementById("intro");
  //intButton = document.getElementById("introButton");

  // Call Set-up methods
  audioSetUp();
  //audioPlay();
}

function setUpCanvas() {
  
  info = document.getElementById('status');
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  len = canvas.width; // 336

  canvasIndImage = document.getElementById("myCanvas2");      
  contextIndImg = canvasIndImage.getContext("2d");

  drawable = false;
  //drawGrid();

  // If there is Canvas2 on the page
  /*if (typeof ctx2 !== 'undefined') {
    console.log("Got it");
    
  }*/

  // Calls
  setUpMouseCanvas();
  setUpTouchCanvas();
  setUpScrollEvents();
  //setUpSliders();

}

//----------------------------------------------------------------------------------------
// AUDIO
//----------------------------------------------------------------------------------------

// Set up audio
function audioSetUp() {
  bgOST = new Howl({
    src: ['static/sounds/OST/FastDrawing.mp3'],
    autoplay: false,
    loop: true,
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
    console.log('Finished playing!')
  });
}

// Change volume icon to mute/unmute
function changeVol() {

  console.log("bgOST: " + bgOST);

  if (muted) { // Turning sound ON
    volIcon.src = "static/images/volume/shadow/3.png";
    if (initial) { // Start playing
      bgOST.play();
      // Switch
      initial = !initial;
    } else { // Resume playing 
      bgOST.mute(false);
      
    }
    
  } else { // Turning sound OFF
    volIcon.src = "static/images/volume/shadow/1.png";
    bgOST.mute(true);
  }

  // Switch
  muted = !muted;
}

//----------------------------------------------------------------------------------------
// CANVAS
//----------------------------------------------------------------------------------------
function setUpMouseCanvas() {
  /* --- MOUSE EVENTS --- */
  // Mouse button pressed
  $('#myCanvas').mousedown(function(e) {
    drawable = true;
    info.textContent = 'Drawing';

    // Correct offsets because of bootstrap's col-lg-8 offset-lg-2
    var offsetL = this.offsetLeft + $(this).parent().offset().left - 15;
    var offsetT = this.offsetTop + $(this).parent().offset().top;

    // drawLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
    drawLine(e.pageX - offsetL, e.pageY - offsetT, false);
  });

  // Mouse moves in canvas
  $('#myCanvas').mousemove(function(e) {
    if (drawable) {
      info.textContent = 'Drawing';

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
    info.textContent = 'Drawn';
  });

  // Mouse leaves the canvas
  $('#myCanvas').mouseleave(function(e) {
    drawable = false;
    info.textContent = 'Press submit to cluster';
  });
}


function setUpTouchCanvas() {
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
}

function setUpScrollEvents() {
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

// Clear canvas
function clearCanvas(callType) {
  
  //ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // Apparently the best to clear the canvas is not by 
  // clearing a rectangle of a certain width and height
  // but by re-defining the values.

  canvas.width = canvas.width;
  
  if (typeof ctx2 !== 'undefined') {
    //ctx2.clearRect(0, 0, myCanvas.width, myCanvas.height);
    canvasIndImage.width = canvasIndImage.width;
  }

  xArr = [];
  yArr = [];
  
  if (callType==0) {
    info.textContent = "Cleared";
  }

  if (gridOn) {
    //drawGrid();
  }

}

//----------------------------------------------------------------------------------------
// CTX
//----------------------------------------------------------------------------------------

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
  coordinates.push(prev_X, prev_Y);

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

// Submit input
function carry() {
  info.textContent = "Submitted";
  console.log("Inside Carry Method");
  //console.log(" "+xArr);
  //console.log(" "+yArr);


  // Get Image Data
  console.log("Getting Image Data");

  // Get ImageData to transform the image to array of pixels
  var imageDataOriginal = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Iterate through the array and get only the channel which is 255 for black and 0 for white
  var imageArrayOriginal = [];
  for (var i = 0; i<(len*len); i++) {
    imageArrayOriginal[i] = imageDataOriginal.data[(i*4)+3];
  }

  // Separate different digits by grouping adjacent pixels            
  var k = 1;  
  window['arrayN' + k] = [];
  
  for (var row = 0; row<len; row++) {  
      for (var column = 0; column<len; column++) {
          if (imageDataOriginal.data[(row*len + column)*4+3] > 0) {

              // Get the adjacent pixels if stroke is continuous and assign it to an array
              var nextColumn = 1;
              window['arrayN' + k].push(row*len + column);
              while ( imageDataOriginal.data[(row*len + column + nextColumn)*4+3] != 0) {
                  window['arrayN' + k].push(row*len + column + nextColumn);
                  nextColumn++;
              }

              // Check if this array is adjacent to another array in a previous row 
              // k is the number or continuous arrays that have been identified
              var arrayAdjusted = [];
              var arrayToMerge = [];

              for (var l = 1; l <= k; l++) {
                  for (var element = 0; element < window['arrayN' + k].length; element++) {
                      arrayAdjusted[element] = window['arrayN' + k][element] - len;    
                      if (window['arrayN' + l].includes(arrayAdjusted[element])) {
                          arrayToMerge.push(l);
                          arrayToMerge.push(k);    
                          break;
                      }
                  }              
              }

              // Remove duplicated from array; decrease count k
              if (arrayToMerge.length > 1) {
                  arrayToMerge = Array.from(new Set(arrayToMerge));
                  k--;
              };

              // Merge adjacent arrays into the same digit; and clear that array
              for (var f = 1; f < arrayToMerge.length ; f++) {
                  window['arrayN' + arrayToMerge[0]] = window['arrayN' + arrayToMerge[0]].concat(window['arrayN' + arrayToMerge[f]]);
                  window['arrayN' + arrayToMerge[f]] = [];
              }

              // Increase count k, initiate arrayNk, move to the correct column
              k++;
              window['arrayN' + k] = [];
              column = column + nextColumn-1;
          }
      }
  };

  // Check which arrays are valid digits (length > 0); those that are length 0 are temporary arrays
  var validaArrays = [];
  for (var i = 1;  i < k; i++){
      if (window['arrayN' + i].length > 0){
          validaArrays.push(i);
      }
  }

  // Process Neural Network for each digit
  for (var i = 0; i < validaArrays.length; i++){
    console.log("Calling processing function");
    processIndividualImage(window['arrayN' + validaArrays[i]]);
  }
}

function processIndividualImage(arrayToProcess) {

  // Process image

  // Use hidden canvas to put indiviual digit
  contextIndImg.clearRect(0, 0, canvasIndImage.width, canvasIndImage.height);

  // Insert array digit into the image data; get columns and rows; put image on canvas
  var imageDataCopy = contextIndImg.getImageData(0,0,canvasIndImage.width,canvasIndImage.height);
  var columnArray = [];
  var rowArray = [];
  for (var j = 0; j < arrayToProcess.length ; j++){        
      imageDataCopy.data[(arrayToProcess[j])*4+3] = 255;                
      columnArray.push(Math.floor(arrayToProcess[j]/len));
      rowArray.push(arrayToProcess[j]%len);
  }

  contextIndImg.putImageData(imageDataCopy,0,0);

  // Get the image min and max x and y; Calculate the width and height
  var minX = Math.min.apply(null, rowArray);
  var maxX = Math.max.apply(null, rowArray);
  var minY = Math.min.apply(null, columnArray);
  var maxY = Math.max.apply(null, columnArray);
  var originalWidth = maxX - minX;
  var originalHeight = maxY - minY;

  // Scale the image to an 18 x 18 pixel and center it into a 28 x 28 canvas
  var scaleRed;
  if (originalHeight > originalWidth){
      scaleRed = originalHeight/18;
  }
  else {
      scaleRed = originalWidth/18;
  }

  // Calculate new width & height, and new X & Y start positions
  // To center the image in a 28 x 28 pixel
  var newWidth = originalWidth/scaleRed;
  var newHeight = originalHeight/scaleRed;
  var newXstart = (28 - newWidth)/2;
  var newYstart = (28 - newHeight)/2;


  // Draw the scaled and centered image to a new canvas 
  var canvasHidden = document.createElement("canvas");
  canvasHidden.width = 28;
  canvasHidden.heigth = 28;
  var contextHidden = canvasHidden.getContext("2d");
  contextHidden.clearRect(0, 0, canvasHidden.width, canvasHidden.height);
  contextHidden.drawImage(canvasIndImage, minX, minY, originalWidth, originalHeight, newXstart, newYstart, newWidth, newHeight);

  // Get the Image Data from the new scaled, centered, 28 x 28 pixel image
  var imageData2 = contextHidden.getImageData(0, 0, 28,28);
  processedImage = [];
  for (var i = 0; i<784; i++){
      processedImage[i] = parseFloat((imageData2.data[(i*4)+3]).toFixed(10));
  }

  console.log(processedImage);

  // Convert to JSON
  myJSON = JSON.stringify(processedImage);
  console.log(myJSON);

}
