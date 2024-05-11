let input;
let button;
let me;
let guests;
let messages = [];
let emojiSize = 45;
let distance = 41;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "mainB");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
    emoji: "",
    color: color(random(255), random(255), random(255)).toString("#rrggbb"),
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
  input.style("width", "calc(100% - 60px)"); // Adjust width to leave space for the button

  button = createButton("Send");
  button.parent("sketch-input");
  button.style("width", "60px"); // Set the width of the button
  button.mousePressed(sendMessage); // Use the same sendMessage function
  button.style("background-color", "#386a20"); // Background color of the button
  button.style("color", "white"); // Text color

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
  updateGuestEmojis();
  drawGuestCursors();
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(16);

  let y = height - 10;
  for (let i = messages.length - 1; i >= 0; i--) {
    let msgObj = messages[i];
    fill(msgObj.color);
    ellipse(13, y - 9, 15, 15);
    fill("black");
    text(msgObj.text, 25, y);
    y -= 30;
    if (y < 0) break;
  }
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY;
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
    guest.emoji = getEmoji(guest.proximity);
  });
}

function getEmoji(proximity) {
  if (proximity === 0) {
    return "";
  } else if (proximity === 1) {
    return "";
  } else if (proximity > 1) {
    return "";
  }
}

function displayMessage(messageObj) {
  messages.push(messageObj);
  if (messages.length > 100) {
    messages.shift();
  }
}

function sendMessage() {
  let messageText = input.value().trim();
  if (messageText !== "") {
    let messageObj = {
      guestID: me.id,
      text: messageText,
      color: me.color,
      emoji: me.emoji,
    };
    partyEmit("newMessage", messageObj);
    input.value("");
  }
}
