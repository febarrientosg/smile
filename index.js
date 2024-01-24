let me;
let guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "FB_emojicursors", "main");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
    emoji: "🙁",
    proximity: 0,
  });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY;
  updateEmojiStates();
}

function draw() {
  background("#ffcccc");
  drawMeCursor();
  drawGuestCursors();
  // Display the proximity counter for the "me" cursor
  fill(0); // Set the fill color for the text to black
  noStroke(); // Ensure that there is no stroke around the text
  textSize(16); // Set the text size
  textAlign(LEFT, TOP); // Align the text to the top left
  text(`Proximity: ${me.proximity}`, 10, 10); // Position the text 10 pixels from the top and left of the canvas
}

function drawMeCursor() {
  fill("#ffffff"); // Color for the "me" cursor
  textAlign(CENTER, CENTER);
  textFont("sans-serif");
  textSize(32);
  text(me.emoji, me.x, me.y);
}

function drawGuestCursors() {
  fill("#cc0000"); // Color for guest cursors
  textAlign(CENTER, CENTER);
  textFont("sans-serif");
  textSize(32);
  guests.forEach((guest) => {
    text(guest.emoji, guest.x, guest.y);
  });
}

function updateEmojiStates() {
  // Reset proximity for all cursors
  me.proximity = 0;
  guests.forEach((guest) => (guest.proximity = 0));

  // Combine me and guests into one array for easier processing
  let allCursors = [me, ...guests];

  // Calculate proximity for each cursor
  allCursors.forEach((cursor) => {
    allCursors.forEach((otherCursor) => {
      if (
        cursor !== otherCursor &&
        dist(cursor.x, cursor.y, otherCursor.x, otherCursor.y) < 50
      ) {
        cursor.proximity++;
      }
    });
  });

  // Update emojis based on proximity
  allCursors.forEach((cursor) => {
    if (cursor.proximity === 2) {
      // Only one other cursor nearby
      cursor.emoji = "🙂";
    } else if (cursor.proximity > 2) {
      // Two or more other cursors nearby
      cursor.emoji = "🫨";
    } else {
      cursor.emoji = "🙁";
    }
  });
}

function updateEmojiForCursor(cursor) {
  if (cursor.proximity === 1) {
    cursor.emoji = "🙂";
  } else {
    cursor.emoji = "🙁";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateEmojiStates();
}
