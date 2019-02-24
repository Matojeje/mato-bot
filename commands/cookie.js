module.exports = {
	name: "cookie",
	errorVerb: "bake the cookies",
	missingArgsVerb: "baking",
	aliases: ["yummy"],
	cooldown: 1,
	guildOnly: false,
	description: "Recieve a cookie for free!",
	usage: "",

	execute(message, args) {
		message.react("🍪");
	},
};
