"use strict";

export default {
    name: "portal",
    errorVerb: "build a portal",
    missingArgsVerb: "portal",
    aliases: ["yagt", "zagreb"],
    cooldown: 10,
    guildOnly: false,
    args: true,
    description:
        "This command will build a portal from an emoji to send people through.",
    shortDesc: "Builds a portal from an emoji",
    usage: "[__emote__]",

    execute(message, args) {
        let reply;

        if (args.length > 1) {
            reply = "I can only accept one argument, I am sorrii";
        } else {
            reply = `${args[0]}${args[0]}${args[0]}${args[0]}\n`;
            reply += `${args[0]}:purple_square::purple_square:${args[0]}\n`;
            reply += `${args[0]}:purple_square::purple_square:${args[0]}\n`;
            reply += `${args[0]}:purple_square::purple_square:${args[0]}\n`;
            reply += `${args[0]}${args[0]}${args[0]}${args[0]}\n`;
        }

        message.channel.send(reply);
    },
};
