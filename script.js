const full = document.querySelector('.btn-voice-full')
const call = document.querySelector('.btn-voice-call')
const nto = document.querySelector('.btn-voice-nto')
const email = document.querySelector('.btn-email')
const pro = document.querySelector('.btn-voice-pro')
const result = document.querySelector('.result_text')
const saved = document.querySelector(".saved")

let count = 0
let countSav = 0
result.textContent = count

console.log(count)

full.addEventListener("click", function () {
    count = count + 20.5;
    result.textContent = count
    console.log(count)
})
call.addEventListener("click", function () {
    count = count + 17.5;
    result.textContent = count
})
nto.addEventListener("click", function () {
    count = count + 3;
    result.textContent = count
})
email.addEventListener("click", function () {
    count = count + 7.5;
    result.textContent = count
})
pro.addEventListener("click", function () {
    count = count + 30;
    result.textContent = count
})

const now = new Date();


function checkAndReset(){
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    if(minutes === 0 && seconds === 0){
        count = 0
    } 
    if(minutes === 59 && seconds === 59){
        countSav = count + countSav
    }
    result.textContent = count
    saved.textContent = countSav
}
setInterval(checkAndReset, 1000);