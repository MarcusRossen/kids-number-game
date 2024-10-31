const express = require('express');
const app = express();
const path = require('path');
const port = 7700;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Website running on http://localhost:${port}`);
})
