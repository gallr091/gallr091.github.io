let activeBlobs = [];

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0); 
	canvas.style('z-index', '-100'); 
	risoColors = [
    new Riso("MARINERED"),
    new Riso("YELLOW"),
    new Riso("METALLICGOLD"),
    new Riso("FLUORESCENTORANGE"),
    new Riso("FLUORESCENTPINK"),
    new Riso("PURPLE"),
    new Riso("RISOFEDERALBLUE"),
    new Riso("MEDIUMBLUE"),
    new Riso("SEAFOAM"),
    new Riso("KELLYGREEN"),
    new Riso("LIGHTTEAL")
  ];
}

function mouseMoved() {
  let newBlob = {
    x: mouseX,
    y: mouseY,
    diameter: random(10, 30),
    points: floor(random(30, 120)),
    color: random(risoColors),
    createdAt: millis(),
    alpha: 255 
  };
  activeBlobs.push(newBlob);
}

function draw() {
  clear(); 
  clearRiso(); 
  background(255);
  
  let now = millis();
  activeBlobs = activeBlobs.filter(blob => blob.alpha > 0);
  
  for (let blob of activeBlobs) {
    let age = now - blob.createdAt;
    blob.alpha = map(age, 0, 2000, 255, 0); 
    blob.color.fill(blob.alpha); 
    
    drawBlob(blob.color, blob.x, blob.y, blob.diameter, blob.points);
  }
  
  drawRiso();
}

function drawBlob(layer, x, y, diameter, points) {
  let blobSize = diameter * 0.2; 

  layer.beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / points) {
    let angle = i;
    let r = diameter + random(-blobSize, blobSize); 
    let xOffset = -cos(angle) * r;
    let yOffset = -sin(angle) * r;
    layer.vertex(x + xOffset, y + yOffset);
  }
  layer.endShape(CLOSE);
}
