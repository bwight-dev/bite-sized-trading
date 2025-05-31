import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './api/routes/auth';
import tradingRoutes from './api/routes/trading';
import { errorHandler } from './api/middlewares/errorHandler';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/trading', tradingRoutes);

// Error handling middleware
app.use(errorHandler);

// Socket.io setup
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});