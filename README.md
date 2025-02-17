# p5.sensor

p5.sensor is a p5.js library that provides access to mobile device sensors such as acceleration, orientation, and gravity. This library allows developers to easily integrate sensor data into their p5.js sketches.

## Features

- Access acceleration, orientation, and gravity data from mobile devices.
- Easy integration with p5.js sketches.
- Supports both iOS and Android devices.
- Provides methods for geolocation, camera, and sound sensor data.

## Installation

To use p5.sensor in your project, include the library in your HTML file:

```html
<script src="https://nkymut.github.io/nkymut/p5.sensor/p5.sensor.js"></script>
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
}
```

### Geolocation

Request the current geolocation of the device:

```javascript
function setup() {
  requestGeolocation();
}

function getGeolocation(position) {
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
function setup() {
  setupSoundSensor();
}

function draw() {
  let soundLevel = captureSoundLevel();
  console.log(`Sound Level: ${soundLevel}`);
}
```

## License

p5.sensor is licensed under the MIT License.
