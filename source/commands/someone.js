"use strict";

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
        "pick",
    ],
    cooldown: 4,
    guildOnly: true,
    args: false,
    shortDesc: "Randomly picks one server member",
    description:
		"This command will return the name of a randomly picked user in this text channel." +
        "It will not tag them. Doesn't work in DMs.",
    usage: "(**bots**) to enable picking bots",

    execute({ guild, channel }, args, client) {
        if (guild.available) {
            let randomMember;
            let picked = false;
            let isBot = false;
            const wantBots = args[0] === "bots";

            while (!picked) {
                randomMember = channel.members.random();
                isBot = randomMember.user.bot;
                console.log("Trying out", randomMember.user.username, { isBot, wantBots });
                if (!isBot || wantBots) { picked = true; }
            }

            const botBadge = isBot ? "`[bot]`" : "";
            const nickname = randomMember.nickname ? `(***${randomMember.nickname + botBadge}***) ` : "";
            // NOTE(alt): As of Discord.js ~12.0, users with no username gets read as undefined instead of null.
            channel.send(
                randomMember.id === client.user.id
                    ? "**Woah!** I randomly picked myself!!"
                    : `**${ randomMember.user.username + botBadge }** ${ nickname }was randomly picked!`,
            );
        }
    },
};
