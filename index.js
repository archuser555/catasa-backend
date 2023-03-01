// server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (data) => {
    console.log(`Received message: ${data}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});