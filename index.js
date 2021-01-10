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
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startBtn.addEventListener("click", this.startTimer);
    this.pauseBtn.addEventListener("click", this.pauseTimer);
  }

  startTimer = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.currentTime();

    ///change the timing to update more frequently - 50 milliseconds
    //this should match line 49
    this.interval = setInterval(this.currentTime, 50);
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
      this.timeRemaining = timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  //getter function -- invoked on line 24
  get timeRemaining() {
    return parseFloat(this.timeInput.value);
  }

  set timeRemaining(time) {
    return (this.timeInput.value = time.toFixed(2));
  }
}

let duration;
const timer = new Timer(timeInput, startBtn, pauseBtn, {
  onStart(totalDuration) {
    duration = totalDuration;
    console.log("Timer started");
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("Timer is completed");
  },
});
