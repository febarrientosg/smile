let me;
let guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "FB_emojicursors", "main");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
    emoji: "🙁",
  });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Touch event handlers for mobile devices
  touchMoved = touchStarted = function () {
    me.x = touches[0].x;
    me.y = touches[0].y;
    return false; // Prevent default
  };
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY;
}

function draw() {
  background("#ffcccc");
  drawMeCursor();
  updateGuestEmojis(); // Update guests based on their current proximity
  drawGuestCursors();
}

function drawMeCursor() {
  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textFont("sans-serif");
  textSize(32); // Consider adjusting size based on device width
  text(me.emoji, me.x, me.y - 15);
}

function drawGuestCursors() {
  textAlign(CENTER, CENTER);
  textFont("sans-serif");

  guests.forEach((guest) => {
    fill("#cc0000");
    textSize(32); // Consider adjusting size based on device width
    text(guest.emoji, guest.x, guest.y - 15);
  });
}

function updateGuestEmojis() {
  guests.forEach((guest) => {
    guest.proximity = 0;
    guests.forEach((otherGuest) => {
      if (
        guest !== otherGuest &&
        dist(guest.x, guest.y, otherGuest.x, otherGuest.y) < 50
      ) {
        guest.proximity++;
      }
    });
    guest.emoji = getEmoji(guest.proximity);
  });
}

function getEmoji(proximity) {
  if (proximity === 0) {
    return "🙁";
  } else if (proximity === 1) {
    return "🙂";
  } else if (proximity > 1) {
    return "🫨";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
