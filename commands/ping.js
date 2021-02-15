module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send(`Your ping is ${Date.now() - message.createdTimestamp} ms`);
	},
};