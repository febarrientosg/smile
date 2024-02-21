// Emojis with 3 states depending on their distance.

let me;
let guests;
let emojiSize = 50;
let distance = emojiSize - 5;
let mouseYDistance = -25;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "FB_emojicursors", "main");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
    emoji: "😓",
  });
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
  //displayGuestProximities();
  updateGuestEmojis();
  drawGuestCursors();
}

function drawGuestCursors() {
  textAlign(CENTER, CENTER);
  textFont("sans-serif");

  for (const guest of guests) {
    fill("#cc0000");
    textSize(emojiSize);
    text(guest.emoji, guest.x, guest.y);
  }
}

function updateGuestEmojis() {
  guests.forEach((guest) => {
    guest.proximity = 0;
    guests.forEach((otherGuest) => {
      if (
        guest !== otherGuest &&
        dist(guest.x, guest.y, otherGuest.x, otherGuest.y) < distance
      ) {
        guest.proximity++;
      }
    });
    guest.emoji = getEmoji(guest.proximity);
  });
}

function getEmoji(proximity) {
  if (proximity === 0) {
    // Capture event for "😓" emoji
    posthog.capture("emoji_1", { emoji: "😓", proximity: proximity });
    return "😓";
  } else if (proximity === 1) {
    // Capture event for "🙂" emoji
    posthog.capture("emoji_2", { emoji: "🙂", proximity: proximity });
    return "🙂";
  } else if (proximity > 1) {
    // Capture event for "🫨" emoji
    posthog.capture("emoji_3", { emoji: "🫨", proximity: proximity });
    return "🫨";
  }
}

function displayGuestProximities() {
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);

  let yOffset = 10; // Starting y offset for the guest proximity displays

  // Display proximity for each guest cursor
  guests.forEach((guest, index) => {
    text(`Guest ${index} Proximity: ${guest.proximity}`, 10, yOffset);
    yOffset += 20; // Increment the y offset for the next guest proximity display
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
