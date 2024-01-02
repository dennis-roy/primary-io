const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'index.html')));

let data = { message: 'Hello from the server!', 'response':''};

app.get('/api/data', (req, res) => {
  console.log("faergikhersdvi");
  res.json(data);
});

app.post('/api/data', (req, res) => {
  data = req.body;
  res.json({ message: 'Data updated successfully!','response':'' });
});

app.delete('/api/data', (req, res) => {
  data = {};
  res.json({ message: 'Data deleted successfully!','response':'' });
});

// Route for handling the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
