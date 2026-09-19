const body = document.body;
const card = document.getElementById("profileCard");
const enterScreen = document.getElementById("enterScreen");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const trackState = document.getElementById("trackState");

const tracks = ["assets/music.mp3"];
let trackIndex = 0;

document.getElementById("year").textContent = new Date().getFullYear();
audio.volume = Number(volume.value);
audio.src = tracks[trackIndex];

const fmt = s => Number.isFinite(s)
  ? `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`
  : "0:00";

function updateMusicUI() {
  const isPlaying = !audio.paused;
  playBtn.textContent = isPlaying ? "❚❚" : "▶";
  trackState.textContent = isPlaying
    ? `Now playing • Part ${trackIndex + 1}/3`
    : "Ready to play";
  muteBtn.textContent = audio.muted ? "🔇" : "🔊";
  document.querySelector(".music-player").classList.toggle("playing", isPlaying);
}

function updateTime() {
  document.getElementById("currentTime").textContent = fmt(audio.currentTime);
  document.getElementById("duration").textContent = fmt(audio.duration);
  seek.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
}

async function startMusic() {
  try {
    await audio.play();
  } catch (_) {
    trackState.textContent = "Press play to start music";
  }
  updateMusicUI();
}

async function nextTrack() {
  if (trackIndex >= tracks.length - 1) {
    trackIndex = 0;
  } else {
    trackIndex++;
  }
  audio.src = tracks[trackIndex];
  audio.load();
  try {
    await audio.play();
  } catch (_) {}
  updateMusicUI();
}

document.getElementById("enterBtn").addEventListener("click", async () => {
  enterScreen.classList.add("hidden");
  await startMusic();
});

playBtn.addEventListener("click", async () => {
  if (audio.paused) await startMusic();
  else audio.pause();
  updateMusicUI();
});

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  updateMusicUI();
});

audio.addEventListener("play", updateMusicUI);
audio.addEventListener("pause", updateMusicUI);
audio.addEventListener("loadedmetadata", updateTime);
audio.addEventListener("timeupdate", updateTime);
audio.addEventListener("ended", nextTrack);

seek.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = Number(seek.value) / 100 * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
  audio.muted = false;
  updateMusicUI();
});

document.getElementById("backBtn").addEventListener("click", () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

document.getElementById("forwardBtn").addEventListener("click", () => {
  audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 10);
});

document.getElementById("fxBtn").addEventListener("click", () => {
  body.classList.toggle("fx-off");
  document.getElementById("fxBtn").textContent =
    body.classList.contains("fx-off") ? "FX OFF" : "FX";
});

const activities = [
  "Playing Minecraft",
  "Coding something...",
  "Listening to music",
  "Building a project"
];
let activityIndex = 0;
setInterval(() => {
  activityIndex = (activityIndex + 1) % activities.length;
  document.getElementById("activityText").textContent = activities[activityIndex];
}, 3200);

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  const d = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * d;
  canvas.height = innerHeight * d;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(d, 0, 0, d, 0, 0);
  particles = Array.from(
    { length: Math.min(70, Math.floor(innerWidth / 18)) },
    () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.7 + 0.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      h: Math.random() * 360
    })
  );
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -10) p.x = innerWidth + 10;
    if (p.x > innerWidth + 10) p.x = -10;
    if (p.y < -10) p.y = innerHeight + 10;
    if (p.y > innerHeight + 10) p.y = -10;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.h},100%,70%,.55)`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

resize();
addEventListener("resize", resize);
draw();

if (matchMedia("(pointer:fine)").matches) {
  card.onpointermove = e => {
    if (body.classList.contains("fx-off")) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-2px)`;
  };
  card.onpointerleave = () => card.style.transform = "";
}

updateMusicUI();
