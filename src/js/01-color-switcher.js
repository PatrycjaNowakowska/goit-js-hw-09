const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

//Aby wygenerować losowy kolor użyj funkcji
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.disabled = true;

let timerId = null;

startBtn.addEventListener('click', () => {
    timerId = setInterval(bgColorChanger, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  
});

stopBtn.addEventListener('click', () => {
    clearTimeout(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  
});

const bgColorChanger = () => {
  body.style.backgroundColor = getRandomHexColor();
};