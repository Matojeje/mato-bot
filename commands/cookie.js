module.exports = {
	name: 'random',
	errorVerb: "bake the cookies",
	missingArgsVerb: "baking",
	aliases: [],
	cooldown: 1,
	guildOnly: false,
	description: "Recieve a cookie for free!",
	usage: "\n"

	execute(message, args) {
		message.react("🍪")
      .then(console.log)
      .catch(console.error);
	},
};
