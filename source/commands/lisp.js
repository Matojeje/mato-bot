"use strict";

import { evalLisp, loadFile } from "utils/repl.js";

export default {
    name: "lisp",
    errorVerb: "run a lisp command",
    missingArgsVerb: "lisping",
    aliases: ["repl"],
    args: true,
    cooldown: 10,
    guildOnly: false,
    description: "Runs a lisp command",
    shortDesc: "Runs a command of a lisp-like language in a repl",

    execute({ channel }, args) {
        loadFile("resources/standard-library.lisp");
        const output = evalLisp(args.join(" "));

        channel.send("```" + output + "```");
    },
};

