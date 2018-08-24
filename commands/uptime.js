module.exports = {
	name: 'uptime',
	errorVerb: "look up my uptime",
	missingArgsVerb: "timing",

	aliases: ['up'],
	args: false,
	cooldown: 0,
	guildOnly: false,
	description: "This tells you how long is it since I woke up.",
	usage: "",

	execute(message, args, client) {
		message.channel.send("My uptime's " + (client.uptime / 1000) + "s!");
	},
};
