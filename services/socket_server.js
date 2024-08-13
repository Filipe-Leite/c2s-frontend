const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000", // Certifique-se de que esta URL está correta
    methods: ["GET", "POST"],
    credentials: true
  }
});

const redisClient = redis.createClient({ url: 'redis://localhost:6379/1' });

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Definindo o canal Redis
const redisChannel = 'task_updates';

// Inscrição no canal Redis
redisClient.subscribe(redisChannel, (err) => {
  if (err) {
    console.error('Error subscribing to Redis channel:', err);
  } else {
    console.log(`Subscribed to Redis channel: ${redisChannel}`);
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Recebendo mensagens do Redis e emitindo para o cliente
  redisClient.on('message', (channel, message) => {
    if (channel === redisChannel) {
      console.log(`Message received on channel ${channel}: ${message}`);
      try {
        const parsedMessage = JSON.parse(message);
        console.log('Parsed message:', parsedMessage);
        socket.emit('task_updates', parsedMessage);
        console.log('Emitted message to socket:', parsedMessage);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
