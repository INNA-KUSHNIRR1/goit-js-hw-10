import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const form = event.currentTarget.elements;
  const delay = Number(form.delay.value);
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        message: `✅ OK Fulfilled promise in ${value} ms`,
        messageSize: '16',
        messageLineHeight: '24',
        messageColor: '#fff',
        color: '#59a10d',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${error} ms`,
        messageSize: '16',
        messageLineHeight: '24',
        messageColor: '#fff',
        color: '#ef4040',
        position: 'topRight',
      });
    });
}
