const moment = require('moment');

function formatedMsg(username, text) {
	return {
		username,
		text,
		time: moment().format('hh:mm a'),
	};
}

module.exports = formatedMsg;
