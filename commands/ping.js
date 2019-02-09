module.exports = {
	name: "ping",
	errorVerb: "ping you",
	missingArgsVerb: "pinging",

	aliases: ["test"],
	args: false,
	cooldown: 1,
	guildOnly: false,
	description: "Ping!",
	usage: "(**a**) to display actual ping",

	execute(message, args, client) {
		if (args[0] === "a") {
			message.channel.send("Ping: " + client.ping);
		} else {
			message.channel.send("Pong!");
		}
	},
};
