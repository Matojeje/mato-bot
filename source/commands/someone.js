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
			let randomMember;
			let member;

			while (true) {
				randomMember = channel.members.random();
				if (!randomMember.user.bot) {
					break;
				} else {
					continue;
				}
			}

			// NOTE(alt): As of Discord.js ~12.0, users with no username gets read as undefined instead of null.
			if (randomMember.nickname !== undefined) {
				member = `***${randomMember.user.username}*** (**${randomMember.nickname}**)`;
			} else {
				member = `**${randomMember.user.username}**`;
			}

			channel.send(`${member} was randomly picked!`);
		}
	},
};
