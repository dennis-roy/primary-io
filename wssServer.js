
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });
const urlClientMap = new Map();
const httpserverMap = new Map();


wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage);

      if ('input3' in parsedMessage) {

        //step 4
        urlClientMap.set(parsedMessage['input3'],ws);
        console.log("step 4 executed");
        console.log(`Mapped a new URL: ${parsedMessage['input3']}`);

      // step 7
      } else if ('URL' in parsedMessage) {
        console.log(parsedMessage);
        httpserverMap.set('httpServerObj',ws);
        var urltobesearched = parsedMessage['URL'];
        var destination = urlClientMap.get(urltobesearched);
        
        console.log("step 7 executed");
        
        // step 8
        destination.send(message);
        console.log("step 8 executed");
        
      } else if('response' in parsedMessage){
        // step 12
        var sendto = httpserverMap.get('httpServerObj');
        sendto.send(message);

        console.log("step 12 executed");
      }
    } catch (error) {
      // console.log("catch block fired!!!!!!");
      var sendto = httpserverMap.get('httpServerObj');
      sendto.send(message);
      console.log("step 12 executed");
      // console.error(error);
    }
  });
});
console.log('WebSocket server is running on ws://localhost:3001');
