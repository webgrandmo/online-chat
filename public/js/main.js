const socket = io();

const form = document.getElementById('chat-form');

socket.on('message', (message) => {
	console.log(message);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputMsg = e.target.elements.msg.value;
	socket.emit('chatMessage', inputMsg);
});
