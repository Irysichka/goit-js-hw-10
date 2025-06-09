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
  
    setTimeout(() => {
    new Promise((resolve, reject) => {
            if (stateValue === "fulfilled") {
               resolve( iziToast.show({
              position: "topLeft",
    message:`✅ Fulfilled promise in ${delayValue}ms`
}))
            }else if (stateValue === "rejected"){
               reject (iziToast.show({
              position: "topLeft",
    message:`❌ Rejected promise in ${delayValue}ms`
}))
   }
})
    }, delayValue)
}