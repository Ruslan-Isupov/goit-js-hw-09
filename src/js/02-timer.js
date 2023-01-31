import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const mainInput = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const daysInput = document.querySelector('[data-days]');
const hoursInput = document.querySelector('[data-hours]');
const minutesInput = document.querySelector('[data-minutes]');
const secondsInput = document.querySelector('[data-seconds]');
let particularDate = 0;
let timerId = null;
let datedifference = 0;
setAttributeDefault();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      particularDate = selectedDates[0].getTime();
      buttonStart.removeAttribute('disabled');
    }
  },
};

// flatpickr(mainInput, options);
// buttonStart.addEventListener(
//   'click',
//   () => {
//     timerId = setInterval(turnStart);
//   },
//   1000
// );
flatpickr(mainInput, options);
buttonStart.addEventListener(
  'click',
  () => {
    timerId = setInterval(turnStart,1000);
  },
  
);

function turnStart() {
  setAttributeDefault();

  datedifference = particularDate - Date.now();
  // console.log(datedifference);
  const calendarDate = convertMs(datedifference);
  addLeadingZero(calendarDate);

  if (datedifference < 1000) {
    clearInterval(timerId);
    console.log(datedifference)
  }
}
function addLeadingZero({ days, hours, minutes, seconds }) {
  daysInput.textContent = String(days).padStart(2, '0');
  hoursInput.textContent = String(hours).padStart(2, '0');
  minutesInput.textContent = String(minutes).padStart(2, '0');
  secondsInput.textContent = String(seconds).padStart(2, '0');
}

function setAttributeDefault() {
  buttonStart.setAttribute('disabled', '');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
