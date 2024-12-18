const distanceInput = document.querySelector('#id_distance');
const unitsInput = document.querySelector("#id_units");
const hoursInput = document.querySelector("#id_hours");
const minutesInput = document.querySelector("#id_minutes")
const secondsInput = document.querySelector("#id_seconds");
const errorP = document.querySelector("#error");
const subButton = document.querySelector('#id_submit');
const unitToggle = document.querySelector('#unitToggle');
const unitLabel = document.querySelector('#unitLabel');
const distanceLabel = document.querySelector('#distanceLabel');
const speedLabel = document.querySelector("#speedLabel");
const splitLable = document.querySelector("#splitLabel");
const tableDiv = document.querySelector("#table");
const totalDistanceMP = document.querySelector("#totalDistanceM");
const totalDistanceKmP = document.querySelector("#totalDistanceKm");
const totalTimeP = document.querySelector("#totalTime");
const avgSpeedMphP = document.querySelector("#avgSpeedMph");
const avgSpeedKmhP = document.querySelector("#avgSpeedKmh");
const avgSplitMP = document.querySelector("#avgSplitM");
const avgSplitKmP = document.querySelector("#avgSplitKm");

let units = "miles";
let runs = [];

unitToggle.addEventListener('click', function(){
    if (units === "miles"){
        units = "kilometers";
        unitLabel.textContent = "Kilometers";
        distanceLabel.textContent = "Distance: Kilometers";
        speedLabel.textContent = "Speed: Km/h";
        splitLable.textContent = "Minute per Kilometer";
    }
    else{
        units = "miles";
        unitLabel.textContent = "Miles";
        distanceLabel.textContent = "Distance: Miles";
        speedLabel.textContent = "Speed: Mph";
        splitLable.textContent = "Minute per Mile";
    }
    clearTable();
    renderRuns();
})


function runSubmit(event){
    event.preventDefault();

    if (distanceInput.value === '' || isNaN(distanceInput.value)){
        errorP.textContent = "!  Enter a Valid Distance  !";
    }
    else if(hoursInput.value === "0" && minutesInput.value === "0" && secondsInput.value === "0"){
        errorP.textContent = "!  Enter a Valid Time  !";
    }
    else{
        errorP.textContent = "";
        let distanceM = 0;
        let distanceKm = 0;
        let timeString = hoursInput.value+"h:"+minutesInput.value+"m:"+secondsInput.value+"s"
        let timeValue = Number(hoursInput.value)+(Number(minutesInput.value)/60) + (Number(secondsInput.value)/3600);
        if(unitsInput.value === "1"){
            distanceM = Number(distanceInput.value);
            distanceKm = distanceM * 1.60934;
        }
        else{
            distanceKm = Number(distanceInput.value);
            distanceM = distanceKm / 1.60934; 
        }
        const runObj = {
            distanceM : distanceM,
            distanceKm : distanceKm,
            timeString : timeString,
            timeValue : timeValue,
        }
        clearTable();
        runs.push(runObj)
        localStorage.setItem('runArray',JSON.stringify(runs))
        renderRuns();
    }
}

subButton.addEventListener('click', runSubmit)

function renderRuns() {
    for(let i = (runs.length-1); i >= 0; i--){
        const rowDiv = document.createElement('div');
        rowDiv.setAttribute('run-index', i);
        rowDiv.setAttribute('id', i+"_row")
        rowDiv.setAttribute('class', 'row')

        const div1 = document.createElement('div');
        div1.setAttribute('class', 'col-6');
        div1.setAttribute('style','margin-left:20px;')
        const div2 = document.createElement('div');
        div2.setAttribute('class', 'col-sm');
        div2.setAttribute('style','margin-left:11px;')
        const div3 = document.createElement('div');
        div3.setAttribute('class', 'col-sm');
        const div4 = document.createElement('div');
        div4.setAttribute('class', 'col-sm');

        const distanceP = document.createElement('p');
        const timeP = document.createElement('p');
        const speedP = document.createElement('p');
        const splitP = document.createElement('p');
        timeP.textContent = runs[i].timeString;
        let speed = 0;
        let split = 0;
        if (units === "miles"){
            distanceP.textContent = runs[i].distanceM.toFixed(3)+" miles"
            speed = runs[i].distanceM / runs[i].timeValue;
            split = 60/speed;
            speedP.textContent = speed.toFixed(3) + " MPH";
            splitP.textContent = split.toFixed(3) + "Min per Mile"
        }
        else{
            distanceP.textContent = runs[i].distanceKm.toFixed(3)+" kilometers"
            speed = runs[i].distanceKm / runs[i].timeValue;
            split = 60/speed;
            speedP.textContent = speed.toFixed(3) + " Km/H";
            splitP.textContent = split.toFixed(3) + "Min per Km"
        }
        div1.appendChild(distanceP);
        div2.appendChild(timeP);
        div3.appendChild(speedP);
        div4.appendChild(splitP);

        rowDiv.appendChild(div1);
        rowDiv.appendChild(div2);
        rowDiv.appendChild(div3);
        rowDiv.appendChild(div4);

        const closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("class", "btn-close");

        rowDiv.appendChild(closeButton);

        tableDiv.appendChild(rowDiv);

    }

    let totaldistanceM = 0;
    let totaldistanceKm = 0;
    let totalTime = 0;
    let avgSpeedMph = 0;
    let avgSpeedKmh = 0;
    let avgSplitM = 0;
    let avgSplitKm = 0;
    for (let i = 0; i < runs.length; i++){
        totaldistanceM += runs[i].distanceM;
        totaldistanceKm += runs[i].distanceKm;
        totalTime += runs[i].timeValue;
    }
    avgSpeedMph = totaldistanceM / totalTime;
    avgSpeedKmh = totaldistanceKm / totalTime;
    avgSplitM = 60 / avgSpeedMph;
    avgSplitKm = 60 / avgSpeedKmh;

    totalDistanceMP.textContent = totaldistanceM.toFixed(3) +" miles"
    totalDistanceKmP.textContent = totaldistanceKm.toFixed(3)+" Kilometers"
    totalTimeP.textContent = totalTime.toFixed(3)+" hours"
    if (totalTime !== 0){
        avgSpeedMphP.textContent = avgSpeedMph.toFixed(3)+" Mph"
        avgSpeedKmhP.textContent = avgSpeedKmh.toFixed(3)+" Km/H"
        avgSplitMP.textContent = avgSplitM.toFixed(3)+" Min per Mile"
        avgSplitKmP.textContent = avgSplitKm.toFixed(3)+" Min per Km"
    }
    else {
        avgSpeedMphP.textContent = "0.000 Mph"
        avgSpeedKmhP.textContent =  "0.000 Km/H"
        avgSplitMP.textContent = "0.000 Min per Mile"
        avgSplitKmP.textContent = "0.000 Min per Km"
    }
    





}


tableDiv.addEventListener('click', function(event){
    const element = event.target;
    if(element.matches('button') === true) {
        clearTable();
        const index = element.parentElement.getAttribute('run-index');
        runs.splice(index,1);
        localStorage.setItem('runArray',JSON.stringify(runs))
        renderRuns();
    }
})




function clearTable(){
    for(let i = 0; i< runs.length; i++){
        const row = document.getElementById(i+"_row");
        row.remove();
    }
}

function init(){
    if (localStorage.getItem('runArray') !== null){
        runs = JSON.parse(localStorage.getItem('runArray'));
    }
    renderRuns();
}
init();