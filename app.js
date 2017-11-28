'use strict';

// [START app]
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/app'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
