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


