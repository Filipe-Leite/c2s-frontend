const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const { createClient } = require('redis'); // Redis client

const server = require("http").createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: "true",
    }
});

// Redis Setup
const redisClient = createClient();
const redisSubscriber = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error', err));

redisClient.connect();
redisSubscriber.connect();

// Subscribe to the 'task_updates' channel
redisSubscriber.subscribe('task_updates', (message) => {
    console.log("Task update received:", message);

    console.log("someting here")
    // Emit the task update to all connected WebSocket clients
    io.emit('task_update', message);
});

app.use(helmet());
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true,
}));

app.use(express.json());

app.use('/auth', authRouter);

io.on("connect", (socket) => {
    console.log("Client connected to WebSocket");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});
