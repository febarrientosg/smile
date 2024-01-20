console.log("%c Reload! \n ", "background: #f00; color: #fff");

let me;
let guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "cursors");
  me = partyLoadMyShared({ x: windowWidth / 2, y: windowHeight / 2 });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas to full window size
  noStroke();
}

function mouseMoved(e) {
  me.x = mouseX;
  me.y = mouseY;
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

// Emoji increase size

// function draw() {
//   background("#ffcccc");

//   // Create an array of all ellipses including 'me' and 'guests'
//   const allEllipses = [me, ...guests];

//   // Set text properties
//   textAlign(CENTER, CENTER); // Align text to be centered
//   textFont("sans-serif"); // Use a font that supports emojis

//   // Iterate over each ellipse to calculate size and color based on distance to nearest ellipse
//   for (const me of allEllipses) {
//     let minDist = Infinity;

//     // Calculate the distance to every other ellipse
//     for (const other of allEllipses) {
//       if (me !== other) {
//         let d = dist(me.x, me.y, other.x, other.y);
//         if (d < minDist) {
//           minDist = d;
//         }
//       }
//     }

//     // Determine the size of the emoji based on the closest distance
//     let size = 24; // Start with a default font size
//     if (minDist < 100) {
//       size += (100 - minDist) / 4; // Adjust size based on proximity
//     }

//     // Set the font size
//     textSize(size);

//     // Draw the emoji at the position with the calculated size
//     text("🙂", me.x, me.y);
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// Circles increase size

// function draw() {
//   background("#ffcccc");

//   // Create an array of all ellipses including 'me' and 'guests'
//   const allEllipses = [me, ...guests];

//   // Iterate over each ellipse to calculate size and color based on distance to nearest ellipse
//   for (const me of allEllipses) {
//     let minDist = Infinity; // Start with a very large number

//     // Calculate the distance to every other ellipse
//     for (const other of allEllipses) {
//       if (me !== other) {
//         // Don't compare the ellipse with itself
//         let d = dist(me.x, me.y, other.x, other.y);
//         if (d < minDist) {
//           minDist = d;
//         }
//       }
//     }

//     // Determine the size of the ellipse based on the closest distance
//     let size = 10; // Start with the normal size
//     if (minDist < 100) {
//       size += 100 - minDist; // Increase size by 1x1 for each pixel closer than 100
//     }

//     // Determine the color based on the size
//     // Black at size 10, and increasingly blue as it grows
//     let colorIntensity = map(size, 10, 110, 0, 255); // Map the size to a range of blue values
//     fill(0, 0, colorIntensity); // Interpolate from black to blue

//     // Draw the ellipse with the calculated size and color
//     ellipse(me.x, me.y - 30, size, size);
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight); // Adjust the canvas size when the window is resized
// }
