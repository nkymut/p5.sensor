# p5.sensor

p5.sensor is a p5.js library that provides access to mobile device sensors such as acceleration, orientation, and gravity. This library allows developers to easily integrate sensor data into their p5.js sketches.

## Features

- Access acceleration, orientation, and gravity data from mobile devices.
- Easy integration with p5.js sketches.
- Supports both iOS and Android devices.
- Provides methods for geolocation, camera, and sound sensor data.

## Installation

To use p5.sensor in your project, include the library in your HTML file:

### CDNs

```html
<script src=https://unpkg.com/p5.sensor@0.1.0/p5.sensor.js"></script>
```

### GitHub Pages
```html
<script src="https://nkymut.github.io/p5.sensor/p5.sensor.js"></script>
```

## Usage

### Motion Sensors

Set up motion sensors and access acceleration data:

```javascript
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
```

### Geolocation

Request the current geolocation of the device:

```javascript
function setup() {
  let interval = 10000;
  requestGeolocation(handleGeolocation, interval);
}

function handleGeolocation(position) {
  console.log(`Latitude: ${position.coords.latitude}`);
  console.log(`Longitude: ${position.coords.longitude}`);
}
```

### Camera and Light Sensor

Capture color and brightness from the camera:

```javascript
function setup() {
  setupCamera();
}

function draw() {
  let color = captureColor();
  let brightness = captureBrightness();
  console.log(`Color: ${color}`);
  console.log(`Brightness: ${brightness}`);
}
```

### Sound Sensor

Capture the current sound level:

```javascript
let soundLevel = 0;

function setup() {
    createCanvas(400, 400);
    let btn = createButton("Start Sound Sensor");
    btn.mousePressed(setupSoundSensor);

  }
  
  function draw() {
    background(220);
    if (isSoundSensorStarted()) {
     soundLevel = getSoundLevel();
    }

    noStroke();
    fill(0);
    text("Sound Level: " + soundLevel, 50, 50);

    fill(30, 30, 185);
    ellipse(width / 2, height / 2, 20+soundLevel * 500, 20+soundLevel * 500); 
  }
```

## License

p5.sensor is licensed under the MIT License.
