const timeInput = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");

//one class for all events and arguments from DOM
class Timer {
  constructor(timeInput, startBtn, pauseBtn) {
    this.timeInput = timeInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;

    this.startBtn.addEventListener("click", this.startTimer);
    this.pauseBtn.addEventListener("click", this.pauseTimer);
  }
  startTimer = () => {
    console.log("timer is starting");
    this.interval = setInterval(this.currentTime, 1000);
  };
  pauseTimer = () => {
    clearInterval(this.interval);
  };
  currentTime = () => {
    console.log("tick");
    const timeRemaing = parseFloat(this.timeInput.value);
    this.timeInput = timeRemaing - 1;
  };
}

const timer = new Timer(timeInput, startBtn, pauseBtn);
