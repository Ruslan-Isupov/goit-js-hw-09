import Notiflix from 'notiflix';

const form = document.querySelector('.form');
let submitTimer = 0;
let timerId = 0;
let position = 0;
let amount = 0;
let delay = 0;
let step = 0;

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  delay = Number(form.elements.delay.value);

  amount = Number(form.elements.amount.value);

  step = Number(form.elements.step.value);

  submitTimer = setInterval(() => {
    position += 1;
    if (position > 1) {
      delay += step;
    } else {
      delay;
    }
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    if (position >= amount) {
      clearInterval(submitTimer);
      position = 0;
    }
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timerId = setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
