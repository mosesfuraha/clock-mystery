function Clock(timeZoneOffset = 0, is24HourFormat = true) {
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.is24HourFormat = is24HourFormat;
  this.timeZoneOffset = timeZoneOffset;
}
const date = new Date()
console.log(date)
Clock.prototype.updateTime = function () {
  //updates the time according to the time zone
  const currentTime = new Date(
    new Date().getTime() + this.timeZoneOffset * 3600 * 1000
  );
  this.hours = currentTime.getUTCHours();
  this.minutes = currentTime.getUTCMinutes();
  this.seconds = currentTime.getUTCSeconds();
};

Clock.prototype.getFormattedTime = function () {
  const hours = (this.hours < 10 ? "0" : "") + this.hours;
  const minutes = (this.minutes < 10 ? "0" : "") + this.minutes;
  const seconds = (this.seconds < 10 ? "0" : "") + this.seconds;
  return `${hours}:${minutes}:${seconds}`;
};

Clock.prototype.get12HourTime = function () {
  let hours = this.hours;
  const minutes = (this.minutes < 10 ? "0" : "") + this.minutes;
  const seconds = (this.seconds < 10 ? "0" : "") + this.seconds;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; //when zero hour, it should be 12
  //adding zeros on numbers less than 10
  const formattedHours = (hours < 10 ? "0" : "") + hours;
  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

Clock.prototype.set24HourFormat = function (is24Hour) {
  this.is24HourFormat = is24Hour;
};

Clock.prototype.setTimeZone = function (offset) {
  this.timeZoneOffset = offset;
};

function displayClock(clock) {
  const hrs = document.getElementById("hrs");
  const min = document.getElementById("min");
  const sec = document.getElementById("sec");
  const ampm = document.getElementById("ampm");

  setInterval(() => {
    clock.updateTime();
    const formattedTime = clock.is24HourFormat
      ? clock.getFormattedTime()
      : clock.get12HourTime();

    // Extract hours, minutes, and seconds
    const hours = formattedTime.substring(0, 2);
    const minutes = formattedTime.substring(3, 5);
    const seconds = formattedTime.substring(6, 8);

    hrs.textContent = hours;
    min.textContent = minutes;
    sec.textContent = seconds;

    // Handle AM/PM display
    if (!clock.is24HourFormat) {
      ampm.textContent = formattedTime.substring(9, 11);
    } else {
      ampm.textContent = "";
    }
  }, 1000);
}

function setUpClock() {
  const clock = new Clock();
 

  displayClock(clock);

  const formatToggle = document.getElementById("formatToggle");
  formatToggle.addEventListener("change", (event) => {
    clock.set24HourFormat(event.target.checked);
  });

  const timeZoneDropdown = document.getElementById("timeZone");
  timeZoneDropdown.addEventListener("change", (event) => {
    const offset = parseInt(event.target.value, 10);
    clock.setTimeZone(offset);
  });

  const colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", (event) => {
    clock.setClockColor(event.target.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setUpClock();
});
