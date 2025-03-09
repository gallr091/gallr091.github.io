let activeBlobs = [];

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0); // Position at the top-left corner
	canvas.style('z-index', '-100'); // Bring the canvas to the front  pixelDensity(1);
	canvas.style('mix-blend-mode', 'multiply');
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
    alpha: 255 // Start with full opacity
  };
  activeBlobs.push(newBlob);
}

function draw() {
  clear(); 
  clearRiso(); // Clears previous layers
  background(255);
  
  // Remove blobs with no opacity left (fully faded)
  let now = millis();
  activeBlobs = activeBlobs.filter(blob => blob.alpha > 0);
  
  // Draw existing blobs
  for (let blob of activeBlobs) {
    let age = now - blob.createdAt;
    blob.alpha = map(age, 0, 2000, 255, 0); // Fade out over 2 seconds
    blob.color.fill(blob.alpha); // Set the fill opacity based on age
    
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
