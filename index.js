const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 10000 });

server.on('connection', (socket) => {
  console.log('Client connected.');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // broadcast message to all connected clients except the sender
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('error', (error) => {
    console.error(`Socket error: ${error}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected.');
  });
});

server.on('error', (error) => {
  console.error(`Server error: ${error}`);
});
