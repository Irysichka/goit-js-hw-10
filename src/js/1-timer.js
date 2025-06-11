// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");

btnStart.disabled = true;
 let userSelectedDate; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
          return iziToast.error({
              position: "topLeft",
    message: 'Please choose a date in the future'
});
      } btnStart.disabled = false;
      userSelectedDate = selectedDates[0];
  },
};
flatpickr(input, options);



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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStart.addEventListener("click", handleClick);


const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

function handleClick(event) {
    btnStart.disabled = true;
  input.disabled = true;
const timerId = setInterval(() => {
    const timerNow = userSelectedDate - new Date();
     if (timerNow <= 0) {
         clearInterval(timerId);

      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
       seconds.textContent = "00";


       input.disabled = false;
       btnStart.disabled = true;
       return;
     }
     const time = convertMs(timerNow);

    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
}, 1000);     
}

