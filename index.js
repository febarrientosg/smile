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
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY - 15;
}

function draw() {
  background("#ffcccc");
  //updateMeEmoji(); // Update "me" based on the current proximity
  drawMeCursor();
  updateGuestEmojis(); // Update guests based on their current proximity
  drawGuestCursors();
  //displayGuestProximities(); // Display proximity counters
}

function displayGuestProximities() {
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);

  // Display the proximity counter for the "me" cursor
  text(`Proximity me: ${me.proximity}`, 10, 10);

  // Starting y offset for the first guest proximity display
  let yOffset = 30;

  // Display proximity for each guest cursor
  guests.forEach((guest, index) => {
    text(`Guest ${index} Proximity: ${guest.proximity}`, 10, yOffset);
    yOffset += 20;
  });
}

function drawMeCursor() {
  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textFont("sans-serif");
  textSize(32);
  text(me.emoji, me.x, me.y); // Draw the emoji

  // Set the fill color for the proximity text to black
  // fill(0);
  // textSize(14); // A smaller text size for the proximity display
  // // Draw the proximity text just below the cursor
  // text(`Proximity: ${me.proximity}`, me.x, me.y + 20);
}

function drawGuestCursors() {
  textAlign(CENTER, CENTER);
  textFont("sans-serif");

  guests.forEach((guest) => {
    // Draw the guest cursor emoji
    fill("#cc0000"); // Color for guest cursors
    textSize(32); // Size for the emojis
    text(guest.emoji, guest.x, guest.y);

    // Display the proximity value below the guest cursor
    // fill(0); // Set the fill color for the proximity text to black
    // textSize(14); // A smaller text size for the proximity display
    // text(`Proximity: ${guest.proximity}`, guest.x, guest.y + 20); // Position the proximity text just below the cursor
  });
}

// function updateMeEmoji() {
//   me.proximity = 0;
//   guests.forEach((guest) => {
//     if (dist(me.x, me.y, guest.x, guest.y) < 50) {
//       me.proximity++;
//     }
//   });
//   me.emoji = getEmoji(me.proximity);
// }

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

function keyPressed() {
  if (key === "L" || key === "l") {
    // When 'L' key is pressed
    console.log("Initial me:", me);
    console.log("Initial guests:", guests);
    // console.log("Full guests array:", guests);
    // guests.forEach((guest, index) => {
    //   console.log(`Guest ${index}:`, guest);
    // });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
