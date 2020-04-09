"use strict";

export default {
    name: "regex",
    errorVerb: "mess with text",
    missingArgsVerb: "messing text",
    aliases: ["re", "replace", "quirk"],
    args: true,
    cooldown: 10,
    guildOnly: false,
    shortDesc: "This command will mess with text.",
    description:
        "This command will mess with text with a user defined argument.",
    usage: "[**uwu**/**mock**/**baby**] [__text__]",

    execute(message, args) {
        let reply;

        switch (args[0]) {
            case "uwu":
                reply = UwUify(args.join(" ").slice(args[0].length));
                break;
            case "baby":
                reply = babify(args.join(" ").slice(args[0].length));
                break;
            case "mock":
                reply = randomCase(args.join(" ").slice(args[0].length));
                break;
            default:
                reply = `<@${message.author.id}> Please add the word transformation type argument.`;
                break;
        }

        if (args[1] === undefined) {
            reply = `<@${message.author.id}> Please provide the sentence that you want to transform.`;
        }

        message.channel.send(reply);
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

/**
 * Modifies the given string to resemble baby babble.
 * Converted using https://matojeje.github.io/playground/hotstrings/
 *
 * @param   {string} str string to be babified.
 * @return  {string} The input string with babified letters.
 */
function babify(string) {
    // TODO add more text to replace
    // TODO format all the regex patterns and replacements into an object
    // TODO move the new object to another file (maybe)
    // TODO add function that loops over all the patterns for cleaner code
    return string
        .replace(/\baccident\b/g, "oopsie")
        .replace(/\ball/g, "awl")
        .replace(/\band\b/g, "an")
        .replace(/\bass/g, "butt")
        .replace(/\bbest/g, "bestest")
        .replace(/\bbathroom/g, "potty")
        .replace(/\bbitch/g, "meanie")
        .replace(/\bconstant/g, "cawnstant")
        .replace(/\bcute/g, "kewt")
        .replace(/\bcouldn't/g, "couldn")
        .replace(/\bcouldnt/g, "couldn")
        .replace(/\bdad/g, "daddy")
        .replace(/\bdo not/g, "dun")
        .replace(/\bdont/g, "dun")
        .replace(/\bdon't/g, "dun")
        .replace(/\bdidn't/g, "dint")
        .replace(/\bdidnt/g, "dint")
        .replace(/\bdiaper/g, "diapee")
        .replace(/\bdead/g, "ded")
        .replace(/\bdoom/g, "dewm")
        .replace(/\bdamn/g, "dawn")
        .replace(/\bdick/g, "peepee")
        .replace(/\beverything/g, "evewytin")
        .replace(/\bfunction/g, "funcshin")
        .replace(/\bfuck/g, "fwick")
        .replace(/\bgotta/g, "gotsa")
        .replace("girl", "guwl")
        .replace(/\bgot to/g, " gotsa")
        .replace(/\bgorl/g, "gowl")
        .replace(/\bgood/g, "gud")
        .replace(/\bhi/g, "hai")
        .replace(/\bhaha/g, "hehe")
        .replace(/\bhey/g, "hai")
        .replace("home", "howme")
        .replace(/\bhell/g, "heck")
        .replace(/\bhave/g, "hab")
        .replace(/\bit's/g, "ish")
        .replace(/\bits/g, "ish")
        .replace(/\bit'll/g, "itw")
        .replace(/\bitll/g, "itw")
        .replace(/\bi'll/g, "imma")
        .replace(/\bI'm/g, "am")
        .replace(/\bIm\b/g, "am")
        .replace(/\binto/g, "intuh")
        .replace(/\bis/g, "ish")
        .replace(/\bjust/g, "jus")
        .replace("kind of", "kinda")
        .replace(/\blove/g, "wub")
        .replace(/\bletter/g, "lettew")
        .replace(/\blittle/g, "widdwe")
        .replace(/\bmom/g, "mommy")
        .replace("multi", "muwtee")
        .replace("my", "muh")
        .replace(/\bmuch/g, "mush")
        .replace(/\bnormally/g, "nowmawly")
        .replace(/\bno\b/g, "nu")
        .replace(/\bnobody/g, "nubuddy")
        .replace(/\bnot/g, "nawt")
        .replace(/\bouch/g, "owwie")
        .replace(/\bof\b/g, "uh")
        .replace(/\boh\b/g, "owh")
        .replace("out", "owt")
        .replace(/\bpoop/g, "poopie")
        .replace(/\bpee/g, "wee")
        .replace(/\bquestion/g, "kweshtin")
        .replace(/\brestroom/g, "potty")
        .replace(/\bstill/g, "stiwl")
        .replace(/\bsnuggles/g, "snuggwies")
        .replace(/\bstuff/g, "stuffs")
        .replace(/\bsandwich/g, "sammich")
        .replace(/\bstop/g, "stahp")
        .replace("sort of", "sowta")
        .replace(/\bso\b/g, "sow")
        .replace(/\bshit/g, "poop")
        .replace(/\bthese/g, "dese")
        .replace(/\bthis/g, "dis")
        .replace(/\bthe\b/g, "da")
        .replace(/\bthose/g, "dose")
        .replace(/\bthere\b/g, "dewe")
        .replace(/\bthem\b/g, "dem")
        .replace(/\bthat\b/g, "dat")
        .replace(/\bthat's/g, "das")
        .replace(/\bthats/g, "das")
        .replace(/\bthanks/g, "thankies")
        .replace(/\bthink/g, "tink")
        .replace("tool", "toowl")
        .replace("time", "tyme")
        .replace(/\bto\b/g, "tew")
        .replace(/\bthough\b/g, "doe")
        .replace(/\bthey're/g, "dewe")
        .replace(/\btheyre/g, "dewe")
        .replace(/\btheir\b/g, "dewe")
        .replace(/\btoo/g, "tew")
        .replace(/\bthank/g, "fank")
        .replace(/\btoilet\b/g, "potty")
        .replace(/\bunivers/g, "yoonivews")
        .replace(/\bwhat/g, "whut")
        .replace(/\bwont/g, "wun")
        .replace(/\bwon't/g, "wun")
        .replace(/\bwant a/g, "wanna")
        .replace(/\bwill/g, "wiwl")
        .replace(/\bwas/g, "wus")
        .replace(/\bwith/g, "wif")
        .replace(/\bwant to/g, "wanna")
        .replace(/\bwanted/g, "wunted")
        .replace(/\bwell\b/g, "wewl")
        .replace(/\bwhen/g, "wen")
        .replace(/\bwhy/g, "wai")
        .replace(/\byou/g, "yoo")
        .replace(/\byes\b/g, "yus");
};