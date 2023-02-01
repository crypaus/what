const express = require('express');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
let startTime;

// Start the stopwatch
app.get('/start', (req, res) => {
  startTime = Date.now();
  res.send({ message: 'Stopwatch started' });
});

// Get the elapsed time
app.get('/elapsed', (req, res) => {
  if (!startTime) {
    return res.status(400).send({ error: 'Stopwatch not started' });
  }

  const elapsedTime = Date.now() - startTime;
  res.send({ elapsedTime });
});

// Start the server on port 3000
app.listen(3002, () => {
  console.log('Stopwatch API server listening on port 3000');
});
