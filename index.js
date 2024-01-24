console.log("%c Reload! \n ", "background: #f00; color: #fff");

let me;
let guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "cursors", "main");
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

function mouseMoved(e) {
  me.x = mouseX;
  me.y = mouseY;
  updateEmojiStates();
}

function updateEmojiStates() {
  const allCursors = [me, ...guests];
  // Reset emojis
  allCursors.forEach((cursor) => (cursor.emoji = "🙁"));

  // Check the distances and update emojis
  allCursors.forEach((cursor) => {
    let closeCursors = 0;
    allCursors.forEach((other) => {
      if (cursor !== other) {
        let d = dist(cursor.x, cursor.y, other.x, other.y);
        if (d < 50) {
          closeCursors++;
        }
      }
    });

    if (closeCursors === 1) {
      // If exactly one other cursor is close
      cursor.emoji = "🙂";
    } else if (closeCursors > 1) {
      // If more than one cursor is close
      cursor.emoji = "🫨";
    }
  });
}

function draw() {
  background("#ffcccc");
  textAlign(CENTER, CENTER);
  textFont("sans-serif");

  // Draw each cursor with their updated emoji
  [me, ...guests].forEach((cursor) => {
    textSize(32); // Fixed size for emojis
    text(cursor.emoji, cursor.x, cursor.y);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateEmojiStates();
}
