const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketio(server);
const formatedMsg = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');
const chatBot = 'Ultimate Chat';
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
	console.log('New WS connection');

	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		// Welcome current user
		socket.emit('message', formatedMsg(chatBot, 'Welcome to ChatCord!'));

		// Broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatedMsg(chatBot, `${user.username} has joined the chat`)
			);

		socket.on('chatMessage', (msg) => {
			io.emit('message', formatedMsg('USER', msg));
		});
	});
	// Runs then user disconnects
	socket.on('disconnect', () => {
		io.emit('message', formatedMsg(chatBot, 'A user left the chat'));
	});
});
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
