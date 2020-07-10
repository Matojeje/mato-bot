"use strict";

export default {
    name: "cookie",
    errorVerb: "bake the cookies",
    missingArgsVerb: "baking",
    aliases: ["yummy"],
    cooldown: 1,
    guildOnly: false,
    shortDesc: "Reacts with a cookie",
    description: "Recieve a cookie for free!",
    usage: "",

    execute(message) {
        message.react("🍪");
    },
};
