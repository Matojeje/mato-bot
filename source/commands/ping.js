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

	execute({ channel }, args, { ping }) {
		if (args[0] === "a") {
			channel.send(`Ping: ${ping}`);
		} else {
			channel.send("Pong!");
		}
	},
};
