const socket = io();

const form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true,
});

console.log(username, room);
socket.emit('joinRoom', { username, room });

socket.on('message', (message) => {
	outputMessage(message);
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputMsg = e.target.elements.msg;
	socket.emit('chatMessage', inputMsg.value);
	inputMsg.value = '';
	inputMsg.focus();
});

function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>
    `;
	document.querySelector('.chat-messages').appendChild(div);
}
