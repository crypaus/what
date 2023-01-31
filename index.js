const express = require('express');
const app = express();
const port = 3002;

let startTime;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/start', (req, res) => {
  startTime = Date.now();
  res.json({ message: 'Stopwatch started' });
});

app.get('/elapsed', (req, res) => {
  if (!startTime) {
    return res.status(400).json({ error: 'Stopwatch not started' });
  }

  const elapsedTime = Date.now() - startTime;

  // Calculate the number of days, hours, minutes, and seconds
  const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
  const elapsedHours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  // Add leading zeros to the values for days, hours, minutes, and seconds
  const elapsedDaysString = String(elapsedDays).padStart(2, '0');
  const elapsedHoursString = String(elapsedHours).padStart(2, '0');
  const elapsedMinutesString = String(elapsedMinutes).padStart(2, '0');
  const elapsedSecondsString = String(elapsedSeconds).padStart(2, '0');

  // Format the elapsed time as a string
  const elapsedTimeString = `${elapsedDaysString}:${elapsedHoursString}:${elapsedMinutesString}:${elapsedSecondsString}`;

  res.json({ elapsedTime: elapsedTimeString });
});

app.listen(port, () => {
  console.log(`Stopwatch API server started on port ${port}`);
});
