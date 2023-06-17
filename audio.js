const audioContext = new AudioContext();

const audioElements = document.querySelectorAll("audio");

const tracks = [];

for (let audioElement of audioElements) {
  let track = audioContext.createMediaElementSource(audioElement);
  tracks.push(track);
}

const gainNodes = [];

for (let i = 0; i < tracks.length; i++) {
  const gainNode = audioContext.createGain();
  gainNodes.push(gainNode);
  tracks[i].connect(gainNodes[i]).connect(audioContext.destination);
}

const playButtons = document.querySelectorAll(".play__button");

for (let i = 0; i < playButtons.length; i++) {
  playButtons[i].addEventListener("click", () => {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    if (playButtons[i].dataset.playing === "false") {
      audioElements[i].play();
      playButtons[i].dataset.playing = "true";
    } else if (playButtons[i].dataset.playing === "true") {
      audioElements[i].pause();
      playButtons[i].dataset.playing = "false";
    }
  });
}

for (let i = 0; i < audioElements.length; i++) {
  audioElements[i].addEventListener("ended", () => {
    playButtons[i].dataset.playing = "false";
  });
}

const volumeSliders = document.querySelectorAll(".volume__slider");

for (let i = 0; i < volumeSliders.length; i++) {
  volumeSliders[i].addEventListener("input", () => {
    gainNodes[i].gain.value = volumeSliders[i].value;
  });
}
