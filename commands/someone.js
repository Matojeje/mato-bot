module.exports = {
	name: "someone",
	errorVerb: "pick a user",
	missingArgsVerb: "booping",
	aliases: [
		"@someone",
		"pick",
		"randomuser",
		"randuser",
		"randusr",
		"ru",
		"who",
	],
	cooldown: 4,
	guildOnly: false,
	args: false,
	shortDesc: "Randomly picks one server member",
	description:
		"This command will return the name of a randomly picked user on this text channel. It will not tag them. Doesn't work in DMs. Doesn't return bots.",
	usage: "",

	execute(message) {
		if (message.guild.available) {
			let botPickCount = 0;
			for (;;) {
				randomMember = message.channel.members.random();
				if (!randomMember.user.bot) {
					break;
				} else {
					botPickCount++;
				}
			}
			if (randomMember.nickname !== null) {
				member =
					"***" +
					randomMember.user.username +
					"*** " +
					"(**" +
					randomMember.nickname +
					"**)";
			} else {
				member = "**" + randomMember.user.username + "**";
			}
			/* botMessage = "";
			if (botPickCount = 1) {
				botMessage = " I also randomly hit one bot.";
			} else if (botPickCount > 1) {
				botMessage = " I also randomly hit " + botPickCount + " bots.";
			} */
			message.channel.send(member + " was randomly picked!");
		}
	},
};
