import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import redis from 'redis';

const app = express();
export const socketServer = http.createServer(app);

const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:8000",
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

const redisChannel = 'task_updates';

redisClient.subscribe(redisChannel, (err) => {
  if (err) {
    console.error('Error subscribing to Redis channel:', err);
  } else {
    console.log(`Subscribed to Redis channel: ${redisChannel}`);
  }
});

redisClient.on('message', (channel, message) => {
  if (channel === redisChannel) {
    console.log(`Message received on channel ${channel}: ${message}`);
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Parsed message:', parsedMessage);
      io.emit('task_updates', parsedMessage);
      console.log('Emitted message to all sockets:', parsedMessage);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 5000;
socketServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
