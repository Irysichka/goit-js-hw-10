// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", onSubmit)

function onSubmit(event) {
    event.preventDefault();

    const { delay, state } = event.target.elements;

    const delayValue = +delay.value;
    const stateValue = state.value;
  
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
            if (stateValue === "fulfilled") {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then((delay) => {
      iziToast.success({
        position: "topLeft",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        position: "topLeft",
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}