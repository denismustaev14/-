const full = document.querySelector(".btn-voice-full");
const call = document.querySelector(".btn-voice-call");
const nto = document.querySelector(".btn-voice-nto");
const email = document.querySelector(".btn-email");
const pro = document.querySelector(".btn-voice-pro");
const result = document.querySelector(".result_text");
const saved = document.querySelector(".saved");
const undo = document.querySelector(".btn-undo");
const diff = document.querySelector(".diff");
const syncButton = document.querySelector(".btn-sync");
const resetAllButton = document.querySelector(".btn-reset-all");
const rusBtn = document.querySelector(".rus");
const belBtn = document.querySelector(".bel");


const rates = {
  russia: {
    full: 20.5,
    call: 17.5,
    nto: 3,
    email: 7.5,
    pro: 30,
    qwe: 10
  },
  belarus: {
    full: 0.75,
    call: 0.64,
    nto: 0.1,
    email: 0.27,
    pro: 1.10,
    qwe: 0.37
  },
};

let currentCountry = "russia";

function getBonus(type) {
  return rates[currentCountry][type];
}

const now = new Date();
let count = 0;
let countSav = 0;
let lastCount = 0;
let deviation = 0;
let minutes;
let seconds;
result.textContent = count;

rusBtn.addEventListener("click", function () {
  currentCountry = "russia";
  console.log(currentCountry);
  full.textContent = "сорт. голос фулл(20.5)";
  call.textContent = "сорт. голос звонок (17.5)";
  nto.textContent = "сорт голос нто (3)";
  email.textContent = "письмо (7.5)";
  pro.textContent = "проф. голос (30)";
  rusBtn.style.backgroundColor = "white";
  belBtn.style.backgroundColor = "#eef2f5";
});
belBtn.addEventListener("click", function () {
  currentCountry = "belarus";
  console.log(currentCountry);
  full.textContent = "сорт. голос фулл(0.75)";
  call.textContent = "сорт. голос звонок (0.64)";
  nto.textContent = "сорт голос нто (0.1)";
  email.textContent = "письмо (0.27)";
  pro.textContent = "проф. голос (1.10)";
  rusBtn.style.backgroundColor = "#eef2f5";
  belBtn.style.backgroundColor = "white";
});

function updateDiff() {
  minutes = new Date().getMinutes();
  deviation = count - minutes * getBonus("qwe");
  diff.textContent = deviation.toFixed(2);
  if (deviation < 0) {
    diff.style.color = "#d9534f";
  } else {
    diff.style.color = "#27ae60";
  }
  
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    lastCount = count;
    count += getBonus(this.dataset.type);
    updateDiff();
    saveToLocalStorage();
    result.textContent = count.toFixed(2);
  });
});

undo.addEventListener("click", function () {
  count = lastCount;
  updateDiff();
  saveToLocalStorage();
});

function checkAndReset() {
  updateDiff();
  minutes = new Date().getMinutes();
  seconds = new Date().getSeconds();
  if (minutes === 0 && seconds === 0) {
    count = 0;
  }
  if (minutes === 59 && seconds === 59) {
    countSav = count + countSav;
  }
  result.textContent = count.toFixed(2);
  saved.textContent = countSav.toFixed(2);
}
setInterval(checkAndReset, 1000);

syncButton.addEventListener("click", function () {
  countSav = count + countSav;
  count = 0;
  result.textContent = count.toFixed(2);
  saved.textContent = countSav.toFixed(2);
});

function saveToLocalStorage() {
  localStorage.setItem("count", count);
  localStorage.setItem("countSav", countSav);
}
const savedCount = localStorage.getItem("count");
if (savedCount !== null) {
  count = Number(savedCount);
}

const savedCountSav = localStorage.getItem("countSav");
if (savedCountSav !== null) {
  countSav = Number(savedCountSav);
}
result.textContent = count.toFixed(2);
saved.textContent = countSav.toFixed(2);

resetAllButton.addEventListener("click", function () {
  localStorage.clear();
  count = 0;
  countSav = 0;
});





