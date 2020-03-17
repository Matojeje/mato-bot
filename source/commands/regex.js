"use strict";

export default {
    name: "regex",
    errorVerb: "mess with text",
    missingArgsVerb: "messing text",
    aliases: ["re", "replace"],
    args: true,
    cooldown: 10,
    guildOnly: false,
    shortDesc: "This command will mess with text",
    description:
        "This command will mess with text with a user defined argument.",
    usage: "[**uwu**/**mock**] [__text__]",

    execute({ channel }, args) {
        let reply;

        switch (args[0]) {
            case "uwu":
                reply = UwUify(args.join(" ").slice(args[0].length));
                break;
            case "mock":
                reply = randomCase(args.join(" ").slice(args[0].length));
                break;
            default:
                reply = "Please add the word transformation type argument";
        }

        channel.send(reply);
    },
};

const faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];

/**
 * UwUifies the text in the given string.
 *
 * @param   {string} str string to be UwUfied.
 * @return  {string} The input string with UwUfied letters.
 */
function UwUify(string) {
    string = string.replace(/(?:l|r)/g, "w");
    string = string.replace(/(?:L|R)/g, "W");
    string = string.replace(/n([aeiou])/g, "ny$1");
    string = string.replace(/N([aeiou])/g, "Ny$1");
    string = string.replace(/N([AEIOU])/g, "Ny$1");
    string = string.replace(/ove/g, "uv");
    string = string.replace(
        /!+/g,
        ` ${faces[Math.floor(Math.random() * faces.length)]} `,
    );

    return string;
}

/**
 * Randomize the capitalization of each letter in the given string.
 *
 * @param   {string} str  string to be randomized.
 * @return  {string} The input string with randomized casing.
 */
function randomCase(str) {
    str = str.split("");
    for (let i = 0; i < str.length; i++) {
        const cas = Math.random() < 0.5 ? 0 : 1;
        if (cas < 0.5) {
            str[i] = str[i].toUpperCase();
        } else {
            str[i] = str[i].toLowerCase();
        }
    }
    return str.join("");
}
