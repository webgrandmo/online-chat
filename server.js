const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
	console.log('New WS connection');

	socket.emit('message', 'Welcome to the chat!');

	// Broadcast them user connects
	socket.broadcast.emit('message', 'A user joined the chat');

	// Runs then user disconnects
	socket.on('disconnect', () => {
		io.emit('message', 'A user left the chat');
	});

	socket.on('chatMessage', (msg) => {
		io.emit('message', msg);
	});
});
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
