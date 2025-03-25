// The setup function runs once when the program starts
function setup() {
  // Create a canvas that matches the size of the window
  createCanvas(windowWidth, windowHeight);

  // Align text to be centered both horizontally and vertically
  textAlign(CENTER, CENTER);

  // Set the default text size to 16 pixels
  textSize(16);

  setupTouchSensor();

  // Enable swipe gesture detection
  enableSwipe((deltaX, deltaY) => {
    console.log(`Swipe detected: deltaX = ${deltaX}, deltaY = ${deltaY}`);
  });

  // Enable pinch gesture detection
  enablePinch((scale) => {
    console.log(`Pinch detected: scale = ${scale}`);
  });
}

// The draw function runs repeatedly in a loop to update the screen
function draw() {
  // Set the background color to a light gray (220 out of 255)
  background(220);

  // Loop through all active touches on the screen
  for (let i = 0; i < touches.length; i++) {
    let t = touches[i]; // Get the current touch point

    // Set the fill color to a semi-transparent blue
    fill(0, 100, 255, 150);

    // Remove any outlines around shapes
    noStroke();

    // Draw a circle at the touch position with a diameter of 100 pixels
    ellipse(t.x, t.y, 100, 100);

    // Set the fill color to black for text
    fill(0);

    // Display the touch index number above the circle using string concatenation
    text("Touch " + i, t.x, t.y - 60);
  }
}


function touchStarted(touches){


}

// The windowResized function runs whenever the window size changes
function windowResized() {
  // Resize the canvas to match the new window size
  resizeCanvas(windowWidth, windowHeight);
}
