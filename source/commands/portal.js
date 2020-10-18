"use strict";

export default {
    name: "portal",
    errorVerb: "build a portal",
    missingArgsVerb: "portal",
    aliases: ["brazil", "yagt", "zagreb", "nether", "netherportal"],
    cooldown: 10,
    guildOnly: false,
    args: true,
    description:
        "This command will build a portal from an emoji to send people through.",
    shortDesc: "Builds a Nether portal from an emoji",
    usage: "([__emote__])",

    execute(message, args) {
        let reply;
        let block = "<:obsidian:767344800100909066>";
        let portal = "<a:portal:767343567701016596>";

        if (args[0]) {
            block = args[0];
        }

        if (args.length > 1) {
            reply = "```js\nError: I can only accept one argument, I am sorrii.```";
        } else {
            reply = `${block}${block}${block}${block}\n`;
            reply += `${block}${portal}${portal}${block}\n`;
            reply += `${block}${portal}${portal}${block}\n`;
            reply += `${block}${portal}${portal}${block}\n`;
            reply += `${block}${block}${block}${block}\n`;
        }

        message.channel.send(reply);
    },
};
