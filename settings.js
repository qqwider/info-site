const config = {
  username: "qwider",
  description: "Fullstack dev | Anime enjoyer | Кодю с кайфом",
  address: "Japan, Tokyo",
  avatar: "me.jpg",
  backgroundVideo: "back.mp4",
  music: {
    title: "хс песня",
    icon: "me.jpg",
    src: "track.mp3"
  },
  socials: [
    { name: "VK", url: "https://vk.com/yourprofile", icon: "assets/vk.png" },
    { name: "Telegram", url: "https://t.me/yourprofile", icon: "assets/telegram.png" },
    { name: "Discord", url: "https://discordapp.com/users/yourid", icon: "assets/discord.png" }
  ]
};
document.getElementById("description").style.display = "none";

document.getElementById("avatar").src = config.avatar;
document.getElementById("username").textContent = config.username;
document.getElementById("description").textContent = config.description;
document.getElementById("address").textContent = config.address;
document.getElementById("bg-video").src = config.backgroundVideo;

const socialLinks = document.getElementById("social-links");
socialLinks.innerHTML = "";
config.socials.forEach(s => {
  const link = document.createElement("a");
  link.href = s.url;
  link.target = "_blank";

  if (s.icon) {
    const img = document.createElement("img");
    img.src = s.icon;
    img.alt = s.name;
    img.style.width = "20px";
    img.style.height = "20px";
    link.appendChild(img);
  } else {
    link.textContent = s.name;
  }

  socialLinks.appendChild(link);
});

const audio = document.getElementById("bg-music");
audio.src = config.music.src;
document.getElementById("track-icon").src = config.music.icon;
document.getElementById("track-title").textContent = config.music.title;

const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const progressContainer = document.getElementById("progress-container");
const progressFilled = document.getElementById("progress-filled");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  } else {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }
  isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFilled.style.width = percent + "%";
  }
});

progressContainer.addEventListener("click", e => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  if (audio.duration) {
    audio.currentTime = percent * audio.duration;
  }
});

const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const flakesCount = 120;
const flakes = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Flake {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = random(0, canvas.width);
    this.y = random(-canvas.height, 0);
    this.size = random(1, 4);
    this.speed = random(0.5, 2);
    this.opacity = random(0.3, 0.8);
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 5;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < flakesCount; i++) {
  flakes.push(new Flake());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flakes.forEach(flake => {
    flake.update();
    flake.draw();
  });
  requestAnimationFrame(animate);
}
animate();
