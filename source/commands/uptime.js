"use strict";

export default {
    name: "uptime",
    errorVerb: "look up my uptime",
    missingArgsVerb: "timing",
    aliases: ["up"],
    args: false,
    cooldown: 0,
    guildOnly: false,
    shortDesc: "Tells you the bot's uptime",
    description: "This tells you how long is it since I woke up.",
    usage: "",

    execute({ channel }, args, { uptime }) {
        channel.send(`My uptime's ${Math.round(uptime / 1000)}s!`);
    },
};
