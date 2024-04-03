import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ref = {
  currentDays: document.querySelector('span[data-days]'),
  currentHours: document.querySelector('span[data-hours]'),
  currentMinutes: document.querySelector('span[data-minutes]'),
  currentSeconds: document.querySelector('span[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
  dateTimePicker: document.querySelector('#datetime-picker'),
};

let userSelectedDate = null;
let intervalId = null;
let diffDate = null;

ref.btnStart.setAttribute('disabled', 'disabled');

ref.dateTimePicker.addEventListener('click', () => {
  ref.btnStart.removeAttribute('disabled', 'disabled');
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.show({
        title: 'WARNING!',
        message: 'Please choose a date in the future',
        color: 'green',
        position: 'topRight',
      });
      ref.btnStart.setAttribute('disabled', 'disabled');
    } else {
      ref.btnStart.removeAttribute('disabled', 'disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

ref.btnStart.addEventListener('click', () => {
  ref.btnStart.setAttribute('disabled', 'disabled');
  ref.dateTimePicker.setAttribute('disabled', 'disabled');
  intervalId = setInterval(() => {
    diffDate = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diffDate);
    addLeadingZero({ days, hours, minutes, seconds });
  }, 1000);
});
function addLeadingZero({ days, hours, minutes, seconds }) {
  if (diffDate <= 1000) {
    clearInterval(intervalId);
    iziToast.show({
      title: 'Stop sleeping!!!',
      message: 'Wake up! ',
      color: 'red',
      position: 'bottomCenter',
    });
  }
  ref.currentDays.textContent = `${days}`.padStart(2, '0');
  ref.currentHours.textContent = `${hours}`.padStart(2, '0');
  ref.currentMinutes.textContent = `${minutes}`.padStart(2, '0');
  ref.currentSeconds.textContent = `${seconds}`.padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
