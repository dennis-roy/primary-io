// const express = require('express');
// const app = express();
// const port = 9001;

// // Middleware to handle CORS headers
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your actual frontend origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// // Your route handling logic
// app.get('/', (req, res) => {
//   console.log("got a request!!!");
//   var output = {'response':'Hello from my cool server!'};
//     res.send(output);
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });

// -------------------------------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 9001;

// Use the cors middleware
app.use(cors());
app.use(bodyParser.json());
// Your route handling logic
app.get('/', (req, res) => {
  console.log("got a get request!!!");
  var output = {'response':'Hello from my cool server!','req_method':req.method,'req_headers':req.headers};
  console.log(`req_method:${req.method}`);
  console.log(`req_headers:${JSON.stringify(req.headers)}`);
  res.send(output);
});

app.post('/', (req, res) => {
  console.log("got a post request!!!");
  var output = {'response':'Hello from my cool server!','req_method':req.method,'req_headers':req.headers,'req_body':req.body};
  console.log(`req_method:${req.method}`);
  console.log(`req_headers:${JSON.stringify(req.headers)}`);
  console.log(`req_body:${JSON.stringify(req.body)}`);
  res.send(output);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
