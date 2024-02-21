// Emojis with 3 states depending on their distance.

let me;
let guests;
let emojiSize = 50;
let distance = emojiSize - 5;
let mouseYDistance = -25;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "cursors");
  me = partyLoadMyShared({ x: windowWidth / 2, y: windowHeight / 2 });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Touch event handlers for mobile devices
  touchMoved = touchStarted = function () {
    me.x = touches[0].x;
    me.y = touches[0].y - 40;
    return false; // Prevent default
  };
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY + mouseYDistance;
}

function draw() {
  background("#ffcccc");

  // Create an array of all ellipses including 'me' and 'guests'
  const allEllipses = [me, ...guests];

  // Set text properties
  textAlign(CENTER, CENTER); // Align text to be centered
  textFont("sans-serif"); // Use a font that supports emojis

  // Iterate over each ellipse to calculate size and emoji based on distance to nearest ellipse
  for (const me of allEllipses) {
    let minDist = Infinity;

    // Calculate the distance to every other ellipse
    for (const other of allEllipses) {
      if (me !== other) {
        let d = dist(me.x, me.y, other.x, other.y);
        if (d < minDist) {
          minDist = d;
        }
      }
    }

    // Determine the size of the emoji based on the closest distance
    let size = 30; // Start with a default font size
    if (minDist < 150) {
      size += (150 - minDist) / 4; // Adjust size based on proximity
    }

    // Choose emoji based on proximity
    let emoji = minDist < 50 ? "🙂" : "🙁";

    // Set the font size
    textSize(size);

    // Draw the emoji at the position with the calculated size
    text(emoji, me.x, me.y - 20);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
