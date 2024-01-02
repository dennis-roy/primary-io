const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const port = 3002;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// step2
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'htmlscript.html');
  res.sendFile(filePath);
  console.log("step 2 executed");
});
server.listen(port, () => {
  console.log(`UI Server is running on http://localhost:${port}`);
});
