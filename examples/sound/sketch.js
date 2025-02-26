
function setup() {
    createCanvas(400, 400);
    
    setupSoundSensor();
    noStroke();
  }
  
  function draw() {
    background(220);
  
    let soundLevel = getSoundLevel();
    fill(0);
    text("Sound Level: " + soundLevel, 50, 50);

    fill(30, 30, 185);
    ellipse(width / 2, height / 2, 20+soundLevel * 500, 20+soundLevel * 500);
    
  }
  