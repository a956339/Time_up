const timersContainer = document.getElementById('timers');
let timers = [];

document.getElementById('set-timer-btn').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  if (totalSeconds > 0) {
    const timerId = setInterval(() => updateTimer(timerId), 1000);
    const timerData = {
      id: timerId,
      timeLeft: totalSeconds,
      element: createTimerElement(totalSeconds, timerId)
    };
    timers.push(timerData);
  }
});

function createTimerElement(timeLeft, timerId) {
  const timerDiv = document.createElement('div');
  timerDiv.classList.add('timer');
  
  const timeLeftDisplay = document.createElement('span');
  timeLeftDisplay.classList.add('time-left');
  timeLeftDisplay.textContent = formatTime(timeLeft);
  
  const stopButton = document.createElement('button');
  stopButton.textContent = 'Delete';
  stopButton.addEventListener('click', () => stopTimer(timerId));

  timerDiv.appendChild(timeLeftDisplay);
  timerDiv.appendChild(stopButton);
  timersContainer.appendChild(timerDiv);

  return timerDiv;
}

function updateTimer(timerId) {
  const timer = timers.find(t => t.id === timerId);
  if (timer) {
    timer.timeLeft--;
    if (timer.timeLeft <= 0) {
      clearInterval(timer.id);
      timer.element.innerHTML = `<span class="time-up">Timer Is Up!</span>`;
      playAlarm();
    } else {
      timer.element.querySelector('.time-left').textContent = formatTime(timer.timeLeft);
    }
  }
}

function stopTimer(timerId) {
  const timerIndex = timers.findIndex(t => t.id === timerId);
  if (timerIndex !== -1) {
    clearInterval(timers[timerIndex].id);
    timers[timerIndex].element.remove();
    timers.splice(timerIndex, 1);
  }
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
}

function playAlarm() {
  const audio = new Audio("./time_up.mp3");  // Add your alarm sound file
  audio.play();
}
