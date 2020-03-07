export default {
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
	guildOnly: true,
	args: false,
	shortDesc: "Randomly picks one server member",
	description:
		"This command will return the name of a randomly picked user on this text channel. \
		 It will not tag them. Doesn't work in DMs. Doesn't return bots.",
	usage: "",

	execute({ guild, channel }) {
		if (guild.available) {
			while (true) {
				randomMember = channel.members.random();
				if (!randomMember.user.bot) {
					break;
				} else {
					continue;
				}
			}
			if (randomMember.nickname !== null) {
				member = `***${randomMember.user.username}*** (**${randomMember.nickname}**)`;
			} else {
				member = `**${randomMember.user.username}**`;
			}
			/* botMessage = "";
			if (botPickCount = 1) {
				botMessage = " I also randomly hit one bot.";
			} else if (botPickCount > 1) {
				botMessage = " I also randomly hit " + botPickCount + " bots.";
			} */
			channel.send(`${member} was randomly picked!`);
		}
	},
};
