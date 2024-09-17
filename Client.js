// Install Dependenices

const dependency_1 = document.createElement("script");
dependency_1.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
document.body.appendChild(dependency_1);

// Load Game

function wait(num) {
  const milliseconds = num * 1000;
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function abbreviateNumber(number) {
  const SI_SYMBOLS = ["", "K", "M", "B", "T", "Q"];
  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  if (tier === 0) return number;
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  const rounded = Math.round(scaled * 10) / 10;
  return rounded + SI_SYMBOLS[tier];
}

function shake() {
  bitCounter.classList.add("shake");
  setTimeout(function() {
    bitCounter.classList.remove("shake");
  }, 500);
}

function confetti() {
  confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
  });
}

var cooldown = false;
var bitcoin = 0;
var bitcoinPerSecond = 0;
var perClick = 1;
const toBuy = {
  [1]: 20,
  [2]: 50,
  [3]: 100,
  [4]: 200
};
const bitCounter = document.getElementById("clk");
const loaded = document.getElementById("tdw");
const elements = {
  perSec: document.getElementById("perSecond")
}

document.addEventListener("keyup", function(e) {
  if (e.keyCode == 32 && !cooldown) {
    cooldown = true;
    bitcoin += perClick;
    bitCounter.textContent = "$" + abbreviateNumber(bitcoin);
    shake();
  }
});

document.addEventListener("keydown", function(e) {
  if (cooldown && e.keyCode == 32) {
    cooldown = false;
  }
});

bitCounter.textContent = "$" + bitcoin.toString();

loaded.textContent = "Loaded";

setTimeout(function() {
  loaded.remove();
}, 3000);

document.getElementById("perSecond").addEventListener("click", function(e) {
  if (bitcoin >= toBuy[1]) {
    bitcoin = bitcoin - toBuy[1];
    bitCounter.textContent = "$" + abbreviateNumber(bitcoin);
    shake();
    bitcoinPerSecond = bitcoinPerSecond + 1;
    toBuy[1] += 15;
    elements.perSec.textContent = "+1 $/sec ($" + toBuy[1].toString() + ")";
    confetti();
  }
});

document.getElementById("5sec").addEventListener("click", function(e) {
  if (bitcoin >= toBuy[4]) {
    bitcoin = bitcoin - toBuy[4];
    bitCounter.textContent = "$" + abbreviateNumber(bitcoin);
    shake();
    bitcoinPerSecond = bitcoinPerSecond + 5;
    toBuy[4] += 75;
      document.getElementById("5sec").textContent = "+5 $/sec ($" + toBuy[4].toString() + ")";
    confetti();
  }
});

document.getElementById("perClick").addEventListener("click", function() {
  if (bitcoin >= toBuy[2]) {
    bitcoin -= toBuy[2];
    bitCounter.textContent = "$" + abbreviateNumber(bitcoin);
    shake();
    perClick++;
    toBuy[2] += 10;
    document.getElementById("perClick").textContent = "+1 $/click ($" + toBuy[2].toString() + ")";
    confetti();
  }
})

document.getElementById("5click").addEventListener("click", function() {
  if (bitcoin >= toBuy[3]) {
    bitcoin -= toBuy[3];
    bitCounter.textContent = "$" + abbreviateNumber(bitcoin);
    shake();
    perClick += 5;
    toBuy[3] += 50;
    document.getElementById("5click").textContent = "+5 $/click ($" + toBuy[3].toString() + ")";
    confetti();
  }
})

function yak() {
  bitcoin += bitcoinPerSecond;
  bitCounter.textContent = "$" + abbreviateNumber(bitcoin);
  return true;
}

setInterval(yak, 1000);
