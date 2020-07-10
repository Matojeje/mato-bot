"use strict";

export default {
    name: "error",
    errorVerb: "throw an error",
    missingArgsVerb: "error",
    cooldown: 0,
    guildOnly: false,
    shortDesc: "Throws an error",
    description: "Throws an error.",
    usage: "",

    execute() {
        throw new Error("User-induced error");
    },
};
