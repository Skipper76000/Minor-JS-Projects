// Set the Countdown Date:
const newYear = new Date("2024-01-01").getTime();

function countdown() {
  const newYearDate = new Date(newYear);
  const currentDate = new Date();

  const seconds = (newYearDate - currentDate) / 1000;

  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);

  document.getElementById("day").innerText = days;
  document.getElementById("hour").innerText = hours;
  document.getElementById("minute").innerText = minutes;
  document.getElementById("second").innerText = secs;

  // Check if Countdown is Over:
  if (seconds <= 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "Happy New Year!";
  }
}

// Initial Call
countdown();

// Update the countdown every second
setInterval(countdown, 1000);
