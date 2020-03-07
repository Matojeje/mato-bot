export default {
	name: "ping",
	errorVerb: "ping you",
	missingArgsVerb: "pinging",

	aliases: ["test"],
	args: false,
	cooldown: 1,
	guildOnly: false,
	description: "Ping!",
	shortDesc: 'Gives back a "pong", or the actual ping time',
	usage: "(**a**) to display actual ping",

	execute({ channel }, args, client) {
		if (args[0] === "a") {
			channel.send(`Ping: ${client.ws.ping.toFixed(1)}`);
		} else {
			channel.send("Pong!");
		}
	},
};
