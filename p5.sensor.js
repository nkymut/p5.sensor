// Encapsulate variables within the p5 prototype
/**
 * @property {boolean} _permissionGranted
 * @private
 */
p5.prototype._permissionGranted = false;

/**
 * @property {Object|null} _accelerationWithGravity
 * @private
 */
p5.prototype._accelerationWithGravity = null;

/**
 * @property {Object|null} _acceleration
 * @private
 */
p5.prototype._acceleration = null;

/**
 * @property {Object|null} _rotation
 * @private
 */
p5.prototype._rotation = null;

/**
 * @property {Object|null} _orientation
 * @private
 */
p5.prototype._orientation = null;

/**
 * @property {Object|null} _absoluteOrientation
 * @private
 */
p5.prototype._absoluteOrientation = null;

// Add p5 prototype variables for gravity, orientation, and absolute orientation
/**
 * @property {number} gravityX
 * @readOnly
 */
p5.prototype.gravityX = 0;

/**
 * @property {number} gravityY
 * @readOnly
 */
p5.prototype.gravityY = 0;

/**
 * @property {number} gravityZ
 * @readOnly
 */
p5.prototype.gravityZ = 0;

/**
 * @property {number} orientationX
 * @readOnly
 */
p5.prototype.orientationX = 0;

/**
 * @property {number} orientationY
 * @readOnly
 */
p5.prototype.orientationY = 0;

/**
 * @property {number} orientationZ
 * @readOnly
 */
p5.prototype.orientationZ = 0;

/**
 * @property {number} absoluteOrientationX
 * @readOnly
 */
p5.prototype.absoluteOrientationX = 0;

/**
 * @property {number} absoluteOrientationY
 * @readOnly
 */
p5.prototype.absoluteOrientationY = 0;

/**
 * @property {number} absoluteOrientationZ
 * @readOnly
 */
p5.prototype.absoluteOrientationZ = 0;

/*
Motion Sensors
*/

/**
 * Sets up motion sensors by checking for necessary permissions.
 * @method setupMotionSensor
 */
p5.prototype.setupMotionSensor = function() {
    this.checkSensorPermission();
};

/**
 * Checks if the device needs permission for motion sensors and requests it if necessary.
 * @method checkSensorPermission
 * @private
 */
p5.prototype.checkSensorPermission = function() {
    const needsPermissions = (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent?.requestPermission === "function") ||
                            (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent?.requestPermission === "function");

    if (needsPermissions) {
        Promise.all([
            DeviceOrientationEvent?.requestPermission?.() || Promise.resolve(),
            DeviceMotionEvent?.requestPermission?.() || Promise.resolve()
        ]).catch(() => {
            let button = createButton("Allow Sensors")
                .id("sensorPermissionButton")
                .style("font-size", "24px")
                .center()
                .mousePressed(this.requestSensorAccess.bind(this));
            throw new Error("Sensor permission required");
        }).then(() => {
            this._permissionGranted = true;
            window.addEventListener("deviceorientation", this.updateMotion.bind(this), true);
            window.addEventListener("deviceorientationabsolute", this.updateMotion.bind(this), true);
            window.addEventListener("devicemotion", this.updateMotion.bind(this), true);
        });
    } else {
        this._permissionGranted = true;
        window.addEventListener("deviceorientation", this.updateMotion.bind(this), true);
        window.addEventListener("deviceorientationabsolute", this.updateMotion.bind(this), true);
        window.addEventListener("devicemotion", this.updateMotion.bind(this), true);
    }
};

/* p5 default motion variables
let accelerationX;
let accelerationY;
let accelerationZ;
let rotationX;
let rotationY;
let rotationZ;
*/

let debugMotion = "";

/**
 * Updates motion data from device sensors.
 * @method updateMotion
 * @param {Event} event - The motion event containing sensor data.
 * @private
 */
p5.prototype.updateMotion = function(event) {
  const accWithGravity = event.accelerationIncludingGravity;
  const acc = event.acceleration;
  const rot = event.rotationRate;
  const orient = event.orientation;
  const absOrient = event.absolute;

  debugMotion = JSON.stringify(event);

  // Handle acceleration including gravity
  if (accWithGravity) {
    this._accelerationWithGravity = {
      x: accWithGravity.x,
      y: accWithGravity.y, 
      z: accWithGravity.z
    };
    this._setProperty('gravityX', accWithGravity.x);
    this._setProperty('gravityY', accWithGravity.y);
    this._setProperty('gravityZ', accWithGravity.z);
  } else {
    this._accelerationWithGravity = null;
  }

  // Handle pure acceleration
  if (acc) {
    this._acceleration = {
      x: acc.x,
      y: acc.y,
      z: acc.z
    };
  } else {
    this._acceleration = null;
  }

  // Handle rotation rate
  if (rot) {
    this._rotation = {
      alpha: rot.alpha, // rotation around z-axis
      beta: rot.beta,   // rotation around x-axis
      gamma: rot.gamma,  // rotation around y-axis
      z: rot.alpha,
      x: rot.beta,
      y: rot.gamma
    };
  } else {
    this._rotation = null;
  }

  // Handle device orientation
  if (orient) {
    this._orientation = {
      alpha: orient.alpha,
      beta: orient.beta,
      gamma: orient.gamma,
      z: orient.alpha,
      x: orient.beta,
      y: orient.gamma
    };
    this._setProperty('orientationX', orient.alpha);
    this._setProperty('orientationY', orient.beta);
    this._setProperty('orientationZ', orient.gamma);
    if (event.webkitCompassHeading !== undefined) {
        heading = event.webkitCompassHeading;
    } else if (orient.alpha !== null) {
        // Note: event.alpha may not be referenced to true north on all devices.
        heading = orient.alpha;
    }
  } else {
    this._orientation = null;
  }

  // Handle absolute orientation
  if (absOrient) {
    this._absoluteOrientation = {
      alpha: absOrient.alpha,
      beta: absOrient.beta,
      gamma: absOrient.gamma,
      z: absOrient.alpha,
      x: absOrient.beta,
      y: absOrient.gamma
    };
    this._setProperty('absoluteOrientationX', absOrient.alpha);
    this._setProperty('absoluteOrientationY', absOrient.beta);
    this._setProperty('absoluteOrientationZ', absOrient.gamma);
  } else {
    this._absoluteOrientation = null;
  }

  debugMotion = JSON.stringify({
    accelerationWithGravity: this._accelerationWithGravity,
    acceleration: this._acceleration,
    rotation: this._rotation,
    orientation: this._orientation,
    absoluteOrientation: this._absoluteOrientation
  });
};

/**
 * Retrieves the current acceleration data including gravity.
 * @method getAccelerationWithGravity
 * @return {Object|null} An object containing acceleration data or null if unavailable.
 */
p5.prototype.getAccelerationWithGravity = function() {
  if (this._permissionGranted && this._accelerationWithGravity) {
    return { ...this._accelerationWithGravity };
  } else {
    console.log("Accelerometer data not available.");
    return null;
  }
};

/*
Geolocation API
*/

/**
 * Requests the current geolocation of the device.
 * @method requestGeolocation
 */
p5.prototype.requestGeolocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getGeolocation.bind(this), this.showGeolocationError.bind(this), {
            enableHighAccuracy: true,
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

/**
 * Callback function to handle successful geolocation retrieval.
 * @method getGeolocation
 * @param {Position} position - The position object containing latitude and longitude.
 */
p5.prototype.getGeolocation = function(position) {
    this._setProperty('latitude', position.coords.latitude);
    this._setProperty('longitude', position.coords.longitude);
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
};

/**
 * Callback function to handle geolocation errors.
 * @method showGeolocationError
 * @param {PositionError} error - The error object containing error code and message.
 */
p5.prototype.showGeolocationError = function(error) {
    let errorMsg = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMsg = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMsg = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMsg = "An unknown error occurred.";
            break;
    }
    console.error(errorMsg);
};

/*
Camera & Light Sensor
*/

/**
 * @property {p5.Element|null} _video
 * @private
 */
p5.prototype._video = null;

/**
 * @property {boolean} _isFrontCamera
 * @private
 */
p5.prototype._isFrontCamera = true;

/**
 * @property {number} _brightnessLevel
 * @private
 */
p5.prototype._brightnessLevel = 0;

/**
 * Captures the color at the center of the video feed.
 * @method captureColor
 * @return {Array} An array containing RGB values.
 */
p5.prototype.captureColor = function() {
    this._video.loadPixels();
    let index = ((this._video.height / 2) * this._video.width + this._video.width / 2) * 4;
    let r = this._video.pixels[index];
    let g = this._video.pixels[index + 1];
    let b = this._video.pixels[index + 2];

    let pickedColor = [r, g, b];

    return pickedColor;
};

/**
 * Captures the light level from the video feed.
 * @method captureLightLevel
 * @return {number} The brightness level.
 */
p5.prototype.captureLightLevel = function() {
    return this.captureBrightness();
};

/**
 * Captures the brightness level from the video feed.
 * @method captureBrightness
 * @return {number} The brightness level.
 */
p5.prototype.captureBrightness = function() {
    this._video.loadPixels();
    let index = ((this._video.height / 2) * this._video.width + this._video.width / 2) * 4;
    let r = this._video.pixels[index];
    let g = this._video.pixels[index + 1];
    let b = this._video.pixels[index + 2];
    this._setProperty('_brightnessLevel', (r + g + b) / 3); // Compute grayscale brightness

    return this._brightnessLevel;
};

/**
 * Updates the brightness level from the video feed.
 * @method updateBrightness
 * @return {number} The updated brightness level.
 */
p5.prototype.updateBrightness = function() {
    this._video.loadPixels();
    let index = ((this._video.height / 2) * this._video.width + this._video.width / 2) * 4;
    let r = this._video.pixels[index];
    let g = this._video.pixels[index + 1];
    let b = this._video.pixels[index + 2];
    this._setProperty('_brightnessLevel', (r + g + b) / 3); // Compute grayscale brightness

    return this._brightnessLevel;
};

/**
 * Sets up the camera with the specified orientation.
 * @method setupCamera
 * @param {string} [selectCamera="front"] - The camera orientation, either "front" or "back".
 */
p5.prototype.setupCamera = function(selectCamera = "front") {
    if (this.video) {
        this.video.remove();
    }

    this.isFrontCamera = selectCamera === "front";

    let constraints = this.isFrontCamera
        ? { video: { facingMode: "user" }, audio: false }
        : { video: { facingMode: "environment" }, audio: false };

    this.video = createCapture(constraints);
    this.video.size(160, 120);
    this.video.hide();
};

/**
 * Sets up the light sensor using the camera.
 * @method setupLightSensor
 * @param {string} [selectCamera="front"] - The camera orientation, either "front" or "back".
 */
p5.prototype.setupLightSensor = function(selectCamera = "front") {
    this.setupCamera(selectCamera);
};

/**
 * Sets up the color sensor using the camera.
 * @method setupColorSensor
 * @param {string} [selectCamera="front"] - The camera orientation, either "front" or "back".
 */
p5.prototype.setupColorSensor = function(selectCamera = "front") {
    this.setupCamera(selectCamera);
};

/**
 * Initializes the camera with the specified orientation.
 * @method initializeCamera
 * @param {string} [selectCamera="front"] - The camera orientation, either "front" or "back".
 */
p5.prototype.initializeCamera = function(selectCamera = "front") {
    this.setupCamera(selectCamera);
};

/**
 * Toggles the camera between front and back.
 * @method toggleCamera
 */
p5.prototype.toggleCamera = function() {
    this.isFrontCamera = !this.isFrontCamera;
    this.initializeCamera();
};

/*
Sound Sensor
*/

/**
 * @property {p5.AudioIn|null} _mic
 * @private
 */
p5.prototype._mic = null;

/**
 * Sets up the sound sensor.
 * @method setupSoundSensor
 */
p5.prototype.setupSoundSensor = function() {
    this._mic = new p5.AudioIn();
    this._mic.start();
};

/**
 * Captures the current sound level.
 * @method captureSoundLevel
 * @return {number} The current sound level.
 */
p5.prototype.captureSoundLevel = function() {
    return this._mic.getLevel();
};
