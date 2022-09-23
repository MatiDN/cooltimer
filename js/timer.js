let inputs, clock, alarm, hours, minutes, seconds, repeater;
const playButton = document.getElementById('play')

window.addEventListener('load', () =>{
    clock = document.querySelector('.clock');
    alarm = new Audio('sound/Ding-sound-effect.mp3');
});

function startTimer(){
    inputs = Array.from(document.getElementsByClassName('number'));
    // Leer los inputs 
    parseTime();
    // Actualizar la vista
    setTimer();
    // Arrnacar el timer
    countdown();

    playButton.disabled = true;
}

function parseTime(){
    hours = Number(inputs[0].value);
    minutes = Number(inputs[1].value);
    seconds = Number(inputs[2].value);
}

function setTimer() {
    clock.innerHTML = `
    <p class="number">${hours > 9 ? hours : ('0' + hours)}</p><span>hs </span>
    <p class="number">${minutes > 9 ? minutes : ('0' + minutes)}</p><span>min </span>
    <p class="number">${seconds > 9 ? seconds : ('0' + seconds)}</p><span>sec</span>`;

    document.title = `${hours > 9 ? hours : ('0' + hours)}:${minutes > 9 ? minutes : ('0' + minutes)}:${seconds > 9 ? seconds : ('0' + seconds)}`;
}

function countdown() {
    repeater = setInterval(runner,1000);
}

function runner(){
    /* Si tengo mas de 0 seg, resta seg */
    /* Si tengo 0 seg pero tengo mas de 0 min, pone seg en 59 y restale 1 a min */
    /* Si tengo 0 seg, 0 min pero mas de 0 hs, pone seg en 59, min en 59 y restale 1 a hs */
    /* Sino arranca la alarma */

    if(seconds > 0){
        seconds--;
    } else {
        if (minutes > 0){
            seconds = 59;
            minutes--;
        } else{
            if(hours > 0){
                seconds = 59;
                minutes = 59;
                hours--;
            } else{
                alarm.play();
            } 
        }
    }
    setTimer();
}

function stopTimer() {
    clearInterval(repeater);
    repeater = null;
}

function restartTimer() {
    stopTimer() 

    clock.innerHTML = `
    <input class="number" value="00" maxlength="2"></input><span>hs</span>
    <input class="number" value="00" maxlength="2"></input><span>min</span>
    <input class="number" value="00" maxlength="2"></input><span>sec</span>
    `;
    inputs.forEach(input => {
        input.value = '';
    });

    document.title = 'CoolTimer';

    playButton.disabled = false;
}