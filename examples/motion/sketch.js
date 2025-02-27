function setup() {
  createCanvas(400, 400);
  setupMotionSensor();
}

function draw() {
  background(220);
  text(`Acceleration X: ${accelerationX}`, 10, 20);
  text(`Acceleration Y: ${accelerationY}`, 10, 40);
  text(`Acceleration Z: ${accelerationZ}`, 10, 60);
  text(`Gravity X: ${gravityX}`, 10, 80);
  text(`Gravity Y: ${gravityY}`, 10, 100);
  text(`Gravity Z: ${gravityZ}`, 10, 120);
  text(`Rotation X: ${rotationX}`, 10, 140);
  text(`Rotation Y: ${rotationY}`, 10, 160);
  text(`Rotation Z: ${rotationZ}`, 10, 180);
  text(`Orientation X: ${orientationX}`, 10, 200);
  text(`Orientation Y: ${orientationY}`, 10, 220);
  text(`Orientation Z: ${orientationZ}`, 10, 240);
  text(`Absolute Orientation X: ${absoluteOrientationX}`, 10, 260); //not supported by iOS
  text(`Absolute Orientation Y: ${absoluteOrientationY}`, 10, 280); //not supported by iOS
  text(`Absolute Orientation Z: ${absoluteOrientationZ}`, 10, 300); //not supported by iOS
}