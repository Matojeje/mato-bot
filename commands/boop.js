module.exports = {
	name: "boop",
	errorVerb: "boop someone",
	missingArgsVerb: "booping",
	aliases: ["bop", "bloop"],
	cooldown: 5,
	guildOnly: false,
	args: true,
	description: "This command will boop someone.",
	shortDesc: "Boop someone",
	usage: "[__user__]",

	execute(message, args, client) {
		message.channel.send(`*boops ${args[0]}!*`);
	},
};
