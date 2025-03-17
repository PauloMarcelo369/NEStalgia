import jsnes from "jsnes";

let nes = new jsnes.NES({
  onFrame: (frameBuffer) => {
    self.postMessage({ type: "frame", frameBuffer });
  },
  onAudioSample: (left, right) => {
    self.postMessage({ type: "audio", left, right });
  },
});

const buttons = {
  up: false,
  down: false,
  left: false,
  right: false,
  a: false,
  b: false,
  start: false,
  select: false,
};

function keyboard(keyCode, callback) {
  var player = 1;
  switch (keyCode) {
    case "up": // UP
      callback(player, jsnes.Controller.BUTTON_UP);
      break;
    case "down": // Down
      callback(player, jsnes.Controller.BUTTON_DOWN);
      break;
    case "left": // Left
      callback(player, jsnes.Controller.BUTTON_LEFT);
      break;
    case "right": // Right
      callback(player, jsnes.Controller.BUTTON_RIGHT);
      break;
    case "a":
      callback(player, jsnes.Controller.BUTTON_A);
      break;
    case "b":
      callback(player, jsnes.Controller.BUTTON_B);
      break;
    case "select": // Tab
      callback(player, jsnes.Controller.BUTTON_SELECT);
      break;
    case "start":
      callback(player, jsnes.Controller.BUTTON_START);
      break;
    default:
      break;
  }
}

self.onmessage = (event) => {
  const { type, data } = event.data;
  if (type === "loadRom") {
    nes.loadROM(data);
  } else if (type === "frame") {
    nes.frame();
  } else if (type === "keyDown") {
    console.log("Esse e o data: " + data);
    keyboard(data, nes.buttonDown);
  } else if (type === "keyUp") {
    keyboard(data, nes.buttonUp);
  }
};
