let featureVariant;

function setup() {
  // Setup the canvas
  createCanvas(400, 400);
}

posthog.onFeatureFlags(function () {
  // feature flags should be available at this point
  if (posthog.getFeatureFlag("multiVariant") === "altA") {
    function draw() {
      background(220);
      text("A", width / 2, height / 2);
    }
  } else if (posthog.getFeatureFlag("multiVariant") === "altB") {
    function draw() {
      background(220);
      text("B", width / 2, height / 2);
    }
  }
});
