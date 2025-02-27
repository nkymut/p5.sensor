function setup() {
  setupCamera();
}

function draw() {
  let color = captureColor();
  let brightness = captureBrightness();
  console.log(`Color: ${color}`);
  console.log(`Brightness: ${brightness}`);
}