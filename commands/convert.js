const im = require("imperial-metric");

module.exports = {
	name: "convert",
	errorVerb: "convert your stuff",
	missingArgsVerb: "conversion",
	aliases: ["conv", "unit"],
	cooldown: 1,
	args: true,
	guildOnly: false,
	shortDesc: "Convert between metric and imperial units",
	description: `Converts between metric and imperial units.
	Available units: inch, foot, mm, cm, m, km, sqrt-m, sqrt-cm, sqrt-mm, sqrt-km, sqrt-inch, sqrt-foot.`,
	usage: "[**value**] [**from this unit**] (to) [**to this unit**]",

	execute(message, args) {
		value = args[0];
		from = args[1];
		if (args[2].toLowerCase() === "to") {
			to = args[3];
		} else {
			to = args[2];
		}

		message.reply(
			`${value} ${from} = **${im(value.replace(/,/, "."))
				.from(from)
				.to(to)} ${to}**`
		);
	},
};
