"use strict";

import im from "utils/imperial-metric.js";

export default {
    name: "convert",
    errorVerb: "convert your stuff",
    missingArgsVerb: "conversion",
    aliases: ["conv", "unit"],
    cooldown: 1,
    args: true,
    guildOnly: false,
    shortDesc: "Converts between metric and imperial units",
    description: `Converts between metric and imperial units.
	Available units: inch, foot, mm, cm, m, km, sqrt-m, sqrt-cm, sqrt-mm, sqrt-km, sqrt-inch, sqrt-foot.`,
    usage: "[**value**] [**from this unit**] (to) [**to this unit**]",

    execute(message, args) {
        const value = args[0];
        const from = args[1];
        let to;

        if (args[2].toLowerCase() === "to") {
            to = args[3];
        } else {
            to = args[2];
        }

        try {
            message.reply(`${value} ${from} = **${im(value.replace(/,/, "."))
                .from(from)
                .to(to)} ${to}**`,
            );
        } catch(err) {
            message.reply("I don't provide conversion for that type, I'm sorrii.");
            console.log(err);
        }
    },
};
