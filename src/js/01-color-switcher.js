const body = document.querySelector('body');
const startChangeBgColor = document.querySelector('[data-start]');
const stopChangeBgColor = document.querySelector('[data-stop]');
let timerId = 0;
startChangeBgColor.addEventListener('click', changeBg);

function changeBg(e) {
  startChangeBgColor.setAttribute('disabled', '');
  stopChangeBgColor.removeAttribute('disabled');
  timerId = setInterval(() => {
    const valueOfColor = getRandomHexColor();

    body.style.backgroundColor = valueOfColor;
  }, 1000);
}

stopChangeBgColor.addEventListener('click', stopChangeBg);

function stopChangeBg(e) {
  clearInterval(timerId);
  startChangeBgColor.removeAttribute('disabled');
  stopChangeBgColor.setAttribute('disabled', '');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
