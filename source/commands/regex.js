"use strict";

export default {
    name: "regex",
    errorVerb: "mess with text",
    missingArgsVerb: "messing text",
    aliases: ["re", "replace", "quirk", "string", "str"],
    args: true,
    cooldown: 10,
    guildOnly: false,
    shortDesc: "This command will mess with text.",
    description:
        "This command will mess with text with a user defined argument.",
    usage:
        "[**uwu**/**mock**/**baby**/**shuffle**/**lolcat**/**soviet**/**euro**] [__text__]",

    execute(message, args) {
        let reply;

        switch (args[0]) {
            case "uwu":
                reply = args.join(" ").slice(args[0].length).uwuify();
                break;
            case "baby":
                reply = args.join(" ").slice(args[0].length).babify();
                break;
            case "mock":
                reply = args.join(" ").slice(args[0].length).random();
                break;
            case "shuffle":
                reply = args.join(" ").slice(args[0].length).shuffle();
                break;
            case "lolcat":
                reply = args.join(" ").slice(args[0].length).lolcat();
                break;
            case "soviet":
                reply = args.join(" ").slice(args[0].length).soviet();
                break;
            case "euro":
                reply = args.join(" ").slice(args[0].length).euro();
                break;
            case "aesthetic":
                reply = args.join(" ").slice(args[0].length).aesthetic();
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
 * @returns {string} The input string with UwUfied letters.
 */
String.prototype.uwuify = function () {
    return this.replace(/(?:l|r)/g, "w")
        .replace(/(?:L|R)/g, "W")
        .replace(/n([aeiou])/g, "ny$1")
        .replace(/N([aeiou])/g, "Ny$1")
        .replace(/N([AEIOU])/g, "Ny$1")
        .replace(/ove/g, "uv")
        .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `);
};

/**
 * Randomize the capitalization of each letter in the given string.
 * @returns {string} The input string with randomized casing.
 */
String.prototype.random = function () {
    const string = this.split("");
    for (let i = 0; i < string.length; i++) {
        const cas = Math.random() < 0.5 ? 0 : 1;
        if (cas < 0.5) {
            string[i] = string[i].toUpperCase();
        } else {
            string[i] = string[i].toLowerCase();
        }
    }
    return string.join("");
};

/**
 * Shuffles the letters in the given string.
 * @returns {string} The input string with shuffled letters.
 */
String.prototype.shuffle = function () {
    const string = this.split("");
    const length = string.length;

    for (let i = length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return string.join("");
};

/**
 * Aesthetifies the given string.
 * @returns {string} The input string aesthetifies.
 */
String.prototype.aesthetic = function () {
    this
        .toUpperCase()
        .split("")
        .join(" ");
};

const prefix = [
    "In Soviet Russia",
    "In the Eastern Bloc",
    "In communist Poland",
    "In East Germany",
    "In communist Czechoslovakia",
    "In communist Hungary",
    "In Yugoslavia",
];

/**
 * Reverses the string and appends the prefix seen above.
 * @returns {string} The input string commified.
 */
String.prototype.soviet = function () {
    const string = this.toLowerCase().split(" ").reverse();
    return `${
        prefix[Math.floor(Math.random() * prefix.length)]
    }, ${string.toString().replace(/,/g, " ").capitalize()}`;
};

/**
 * Capitalizes the fist letter of the string.
 * @returns {string} String with the first letter capitalized.
 */
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Turns Standard English to a German Euro English Dialect.
 * @returns {string} String with the deutsche-ed words.
 */
String.prototype.euro = function () {
    return this.euroify().rmdouble().shorten().creplace();
};

// Below are string sub-functions for the euro "master" function
// Their names should be self-descriptive.
// Taken from here:
// https://raw.githubusercontent.com/Meowcolm024/euro/master/euro.js
String.prototype.euroify = function () {
    const mid = this.replace(/ph/g, "f")
        .replace(/th/g, "z")
        .replace(/ou/g, "o")
        .replace(/ea/g, "e")
        .replace(/w/g, "v")
        .replace(/Ph/g, "F")
        .replace(/Th/g, "Z")
        .replace(/Ou/g, "O")
        .replace(/Ea/g, "E")
        .replace(/W/g, "V");
    if (mid.endsWith("ed")) {
        const o = mid.slice(0, mid.length - 2);
        return o + "d";
    }
    return mid;
};

String.prototype.shorten = function () {
    if (this.length <= 3) {
        return this;
    }
    if (this.endsWith("e")) {
        return this.slice(0, this.length - 1);
    }
    return this;
};

String.prototype.rmdouble = function () {
    const x = this;

    if (x.length < 2) {
        return x;
    }
    const mid = takeWhile(y => {
        return y === x[0];
    }, x);
    const rest = x.slice(mid.length, x.length);
    return mid[0] + rest.rmdouble();
};

const takeWhile = (fn, a) =>
    a.length && fn(a[0]) ? [a[0], ...takeWhile(fn, a.slice(1))] : [];

String.prototype.creplace = function () {
    if (this.length < 2) {
        return this;
    }
    let x = this;
    for (let i = 0; i < this.length - 1; i++) {
        if (x[i] == "c") {
            if ("eiy".includes(x[i + 1])) {
                x = x.substr(0, i - 1) + "s" + x.substr(i + 1, this.length - 1);
            } else {
                x = x.substr(0, i - 1) + "k" + x.substr(i + 1, this.length - 1);
            }
        } else if (x[i] == "C") {
            if ("eiy".includes(x[i + 1])) {
                x = x.substr(0, i - 1) + "S" + x.substr(i + 1, this.length - 1);
            } else {
                x = x.substr(0, i - 1) + "K" + x.substr(i + 1, this.length - 1);
            }
        }
    }
    return x;
};

/**
 * Modifies the given string to resemble baby babble.
 * Converted using https://matojeje.github.io/playground/hotstrings/
 * @returns {string} The input string with babified letters.
 */
String.prototype.babify = function () {
    // TODO(mato): add more text to replace
    // TODO(mato): format all the regex patterns and replacements into an object
    // TODO(mato): move the new object to another file (maybe)
    // TODO(mato): add function that loops over all the patterns for cleaner code
    return this.replace(/\baccident\b/g, "oopsie")
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

/**
 * Modifies the given string to convert them to lolspeak.
 * @returns {string} The input string with LOLed characters.
 */
String.prototype.lolcat = function () {
    let str = this.toLowerCase();
    let regExp = "";

    // prettier-ignore
    const dictionary = {
        "i can have"    : "i can has",
        "oh really"    	: "orly",
        "seriously"    	: "srsly",
        "uestion"		: "wesjun",

        /* 6 */
        "unless"		: "unles",
        "really"		: ["rly", "rily", "rilly", "rilley"],
        "you're"		: ["yore", "yr"],
        "buddah"		: "ceiling cat",
        "kitten"		: "kitteh",

        /* 5 */
        "cture"			: "kshur",
        "esque"			: "esk",
        "tious"			: "shus",
        "thank"			: ["fank", "tank", "thx", "thnx"],
        "world"			: ["wurrld", "whirld", "wurld", "wrld"],
        "hello"			: "oh hai",
        "howdy"			: "oh hai",
        "allah"			: "ceiling cat",
        "diety"			: "ceiling cat",
        "kitty"			: "kitteh",


        /* 4 */
        "this"			: "thiz",
        "eady"			: "eddy",
        "what"			: ["wut", "whut"],
        "more"			: "moar",
        "sion"			: "shun",
        "just"			: "jus",
        "want"			: "waants",
        "eese"			: "eez",
        "ucke"			: ["ukki", "ukke"],
        "like"			: ["likes", "liek"],
        "love"			: ["loves", "lub", "lubs", "luv"],
        "outh"			: "owf",
        "scio"			: "shu",
        "ture"			: "chur",
        "sure"			: "shur",
        "were"			: "was",
        "ease"			: "eez",
        "have"			: ["has", "hav", "haz a"],
        "your"			: ["yur", "ur", "yore", "yoar"],
        "good"			: ["gud", "goed", "guud", "gude", "gewd"],
        "ight"			: "ite",
        "tion"			: "shun",


        /* 3 */
        "ome"			: "um",
        "are"			: ["r", "is", "ar"],
        "you"			: ["yu", "yous", "yoo", "u"],
        "the"			: "teh",
        "ose"			: "oze",
        "ead"			: "edd",
        "eak"			: "ekk",
        "age"			: "uj",
        "dog"			: "slowpaw",
        "who"			: "hoo",
        "ese"			: "eez",
        "too"			: ["to", "2"],
        "tty"			: "tteh",
        "thy"			: "fee",
        "que"			: "kwe",
        "oth"			: "udd",
        "ing"			: ["in", "ins", "ng", "ing"],
        "ove"			: ["oov", "ove", "uuv", "uv", "oove"],
        "for"			: ["fore", "4", "fr", "fur", "for", "foar"],
        "i'm"			: "im",
        "hey"			: "oh hai",
        "god"			: "ceiling cat",
        "cat"			: "kitteh",

        /* 2 */
        "ph"			: "f",
        "as"			: "az",
        "my"			: ["muh", "mah"],
        "er"			: "r",
        "of"			: ["of", "ov", "of"],
        "is"			: ["ar teh", "ar"],
        "nd"			: "n",
        "ok"			: ["k", "kay"],
        "ym"			: "im",
        "ly"			: "li",
    };

    for (const k in dictionary) {
        regExp += `(${k})|`;
    }
    regExp = regExp.slice(0, -1);

    const match = new RegExp(regExp, "gm");
    const matches = str.match(match);

    for (let i = 0, l = matches.length; i < l; i++) {
        let replace = dictionary[matches[i]];
        if (typeof replace !== "string") {
            replace = replace[Math.floor(Math.random() * replace.length)];
        }
        str = str.replace(matches[i], replace);
    }
    return str;
};
