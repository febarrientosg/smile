let input;
let me;
let guests;
let messages = [];
let emojiSize = 50; // Adjusted for visual clarity
let distance = 46; // Proximity distance for emoji changes

function preload() {
  partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "mainB");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
    emoji: "🙁", // Initial emoji for each user
    color: color(random(255), random(255), random(255)).toString("#rrggbb"), // Random color for text identifier
  });
  guests = partyLoadGuestShareds();
}

function setup() {
  pixelDensity(2);
  let sketchContainer = document.getElementById("sketch-container");
  let canvas = createCanvas(sketchContainer.offsetWidth, windowHeight - 36);
  canvas.parent("sketch-container");
  textSize(17);

  partySubscribe("newMessage", displayMessage);

  input = createInput();
  input.parent("sketch-input");
  input.style("width", "100%");
  input.elt.onkeypress = function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  window.addEventListener("resize", () => {
    resizeCanvas(sketchContainer.offsetWidth, windowHeight - 36);
  });
}

function draw() {
  background("#e1e1e1");
  updateGuestEmojis(); // Update emojis based on proximity
  drawGuestCursors(); // Draw emojis for each user
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(16);

  let y = height - 10; // Start drawing from the bottom
  for (let i = messages.length - 1; i >= 0; i--) {
    let msgObj = messages[i];
    fill(msgObj.color);
    ellipse(13, y - 9, 15, 15); // Draw the user identifier ellipse
    fill("black");
    text(msgObj.text, 25, y);
    y -= 30; // Adjust vertical spacing
    if (y < 0) break;
  }
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY - 25;
}

function drawGuestCursors() {
  textAlign(CENTER, CENTER);
  textSize(emojiSize);

  for (const guest of guests) {
    text(guest.emoji, guest.x, guest.y);
  }
}

function updateGuestEmojis() {
  guests.forEach((guest) => {
    guest.proximity = 0;
    guests.forEach((otherGuest) => {
      if (guest !== otherGuest && dist(guest.x, guest.y, otherGuest.x, otherGuest.y) < distance) {
        guest.proximity++;
      }
    });
    guest.emoji = getEmoji(guest.proximity); // Determine emoji based on proximity count
  });
}

function getEmoji(proximity) {
  if (proximity === 0) {
    return "🌈";
  } else if (proximity === 1) {
    return "🍓";
  } else if (proximity > 1) {
    return "🥐";
  }
}

function displayMessage(messageObj) {
  messages.push(messageObj);
  if (messages.length > 100) {
    messages.shift(); // Manage message overflow
  }
}

function sendMessage() {
  let messageText = input.value().trim();
  if (messageText !== "") {
    let messageObj = {
      guestID: me.id,
      text: messageText,
      color: me.color,
      emoji: me.emoji, // Include emoji in the message object
    };
    partyEmit("newMessage", messageObj);
    input.value("");
  }
}
