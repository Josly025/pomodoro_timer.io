const timeInput = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const circle = document.querySelector("circle");

//perimeter forumla
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

//** one class for all events and arguments from DOM
class Timer {
  constructor(timeInput, startBtn, pauseBtn, callbacks) {
    this.timeInput = timeInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;

    if (callbacks) {
      this.onStart = callbacks.onStart;
    }

    this.startBtn.addEventListener("click", this.startTimer);
    this.pauseBtn.addEventListener("click", this.pauseTimer);
  }

  startTimer = () => {
    if (this.onStart) {
      this.onStart();
    }
    this.currentTime();

    this.interval = setInterval(this.currentTime, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.interval);
  };

  currentTime = () => {
    const timeRemaining = parseFloat(this.timeInput.value);
    if (this.timeRemaining <= 0) {
      this.pauseTimer();
      if (this.onComplete) {
        this.onComplete;
      }
    } else {
      this.timeRemaining = timeRemaining - 1;
      if (this.onTick) {
        this.onTick();
      }
    }
  };

  //getter function -- invoked on line 24
  get timeRemaining() {
    return parseFloat(this.timeInput.value);
  }

  set timeRemaining(time) {
    return (this.timeInput.value = time);
  }
}

let currentOffset = 0;
const timer = new Timer(timeInput, startBtn, pauseBtn, {
  onStart() {
    console.log("Timer started");
  },
  onTick() {
    circle.setAttribute("stroke-dashoffset", currentOffset);
    currentOffset = currentOffset - 50;
  },
  onComplete() {
    console.log("Timer is completed");
  },
});
