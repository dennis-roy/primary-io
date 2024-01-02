const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

const wshttp = new WebSocket('ws://localhost:3001');

app.use(bodyParser.json());
app.post('/:variable', (req, res) => {
  console.log('req.params:', req.params); // Route parameters
  console.log('req.query:', req.query);   // Query parameters
  console.log('req.headers:', req.headers); // Request headers
  console.log('req.method:', req.method);   // HTTP method (GET, POST, etc.)
  console.log('req.url:', req.url);         // Requested URL
  console.log('req.baseUrl:', req.baseUrl); // Base URL
  console.log('req.path:', req.path);       // Path part of the URL
  console.log('req.originalUrl:', req.originalUrl); // Original URL
  console.log('req.body:', req.body); 
  const variable = req.params.variable;     // Request body (for POST requests with a body)
  const message = {"URL": variable,"method":req.method,"headers": JSON.stringify(req.headers),"body":JSON.stringify(req.body)};
  wshttp.send(JSON.stringify(message));
  console.log("step 6 executed");

  const waitForWebSocketMessage = new Promise(resolve => {
    wshttp.once('message', resolve);
  });

  // Wait for the WebSocket message and then send the HTTP response
  waitForWebSocketMessage.then((messageFromWebSocket) => {
    res.send(`Message received: ${messageFromWebSocket}`);
  });
});

app.get('/:variable', (req, res) => {
  console.log("request from outside client made!");
  const variable = req.params.variable;
  const message = { "URL": variable, "Headers": JSON.stringify(req.headers),"method":req.method};
  wshttp.send(JSON.stringify(message));
  console.log(JSON.stringify(message));
  console.log("step 6 executed");

  // Create a promise to handle the WebSocket message
  const waitForWebSocketMessage = new Promise(resolve => {
    wshttp.once('message', resolve);
  });

  // Wait for the WebSocket message and then send the HTTP response
  waitForWebSocketMessage.then((messageFromWebSocket) => {
    res.send(`Message received: ${messageFromWebSocket}`);
  });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// ------------------------------------------------------------------------
// const WebSocket = require('ws');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 9000;

// const wshttp = new WebSocket('ws://localhost:3001');

// app.use(bodyParser.json());
// app.post('/:variable', (req, res) => {
//   console.log('req.params:', req.params); // Route parameters
//   console.log('req.query:', req.query);   // Query parameters
//   console.log('req.headers:', req.headers); // Request headers
//   console.log('req.method:', req.method);   // HTTP method (GET, POST, etc.)
//   console.log('req.url:', req.url);         // Requested URL
//   console.log('req.baseUrl:', req.baseUrl); // Base URL
//   console.log('req.path:', req.path);       // Path part of the URL
//   console.log('req.originalUrl:', req.originalUrl); // Original URL
//   console.log('req.body:', req.body);      // Request body (for POST requests with a body)
//   const message = { "method":req.method,"headers": JSON.stringify(req.headers),"body":JSON.stringify(req.body)};
//   wshttp.send(JSON.stringify(message));
//   console.log("step 6 executed");
// });

// app.get('/:variable', (req, res) => {
//   console.log("request from outside client made!");
//   const variable = req.params.variable;
//   const message = { "URL": variable, "Headers": JSON.stringify(req.headers),"body":JSON.stringify(req.body),"method":req.method};
//   wshttp.send(JSON.stringify(message));
//   console.log(JSON.stringify(message));
//   console.log("step 6 executed");

//   // Create a promise to handle the WebSocket message
//   const waitForWebSocketMessage = new Promise(resolve => {
//     wshttp.once('message', resolve);
//   });

//   // Wait for the WebSocket message and then send the HTTP response
//   waitForWebSocketMessage.then((messageFromWebSocket) => {
//     res.send(`Message received: ${messageFromWebSocket}`);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
