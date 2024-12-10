const distanceInput = document.querySelector('#id_distance');
const unitsInput = document.querySelector("#id_units");
const hoursInput = document.querySelector("#id_hours");
const minutesInput = document.querySelector("#id_minutes")
const secondsInput = document.querySelector("#id_seconds");
const errorP = document.querySelector("#error");
const subButton = document.querySelector('#id_submit');

function runSubmit(event){
    event.preventDefault();

    if (distanceInput.value === '' || isNaN(distanceInput.value)){
        errorP.textContent = "enter a valid distance";
    }
    else{
        errorP.textContent = "";
    }
}

subButton.addEventListener('click', runSubmit)