const full = document.querySelector(".btn-voice-full");
const call = document.querySelector(".btn-voice-call");
const nto = document.querySelector(".btn-voice-nto");
const email = document.querySelector(".btn-email");
const pro = document.querySelector(".btn-voice-pro");
const result = document.querySelector(".result_text");
const saved = document.querySelector(".saved");
const undo = document.querySelector(".btn-undo");
const diff = document.querySelector(".diff");
const syncButton = document.querySelector('.btn-sync');
const resetAllButton = document.querySelector('.btn-reset-all');

const now = new Date();
let count = 0;
let countSav = 0;
let lastCount = 0;
let deviation = 0;
let minutes
let seconds
result.textContent = count;

function updateDiff() {
    minutes = new Date().getMinutes();
  deviation = count - minutes * 10;
  diff.textContent = deviation;
  if (deviation < 0) {
    diff.style.color = "#d9534f";
  } else {
    diff.style.color = "#27ae60";
  }
}

full.addEventListener("click", function () {
  lastCount = count;
  count = count + 20.7;
  result.textContent = count;
  updateDiff();
  saveToLocalStorage();
});
call.addEventListener("click", function () {
  lastCount = count;
  count = count + 17.7;
  result.textContent = count;
  updateDiff();
  saveToLocalStorage();
});
nto.addEventListener("click", function () {
  lastCount = count;
  count = count + 3;
  result.textContent = count;
  updateDiff();
  saveToLocalStorage();
});
email.addEventListener("click", function () {
  lastCount = count;
  count = count + 7.5;
  result.textContent = count;
  updateDiff();
  saveToLocalStorage();
});
pro.addEventListener("click", function () {
  lastCount = count;
  count = count + 30;
  result.textContent = count;
  updateDiff();
  saveToLocalStorage();
});
undo.addEventListener("click", function () {
  count = lastCount;
  updateDiff();
  saveToLocalStorage();
});

function checkAndReset() {
    updateDiff()
  minutes = new Date().getMinutes();
  seconds = new Date().getSeconds();
  if (minutes === 0 && seconds === 0) {
    count = 0;
  }
  if (minutes === 59 && seconds === 59) {
    countSav = count + countSav;
  }
  result.textContent = count;
  saved.textContent = countSav;
}
setInterval(checkAndReset, 1000);

syncButton.addEventListener("click", function () {
  countSav = count + countSav;
    count = 0;
  result.textContent = count;
  saved.textContent = countSav;
}
);

function saveToLocalStorage(){
  localStorage.setItem('count', count);
  localStorage.setItem('countSav', countSav)
}
const savedCount = localStorage.getItem('count');
if (savedCount !== null) {
    count = Number(savedCount);
}

const savedCountSav = localStorage.getItem('countSav');
if (savedCountSav !== null) {
    countSav = Number(savedCountSav);
}
result.textContent = count;
saved.textContent = countSav;

resetAllButton.addEventListener("click", function () {
  localStorage.clear();
  count = 0
  countSav = 0
});