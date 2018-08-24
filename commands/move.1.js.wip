const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

module.exports = {
	name: 'moveinfo',
	errorVerb: "search up what that move does (WIP)",
	missingArgsVerb: "move",

	aliases: ['mi', 'move'],
	args: true,
	cooldown: 8,
	guildOnly: false,
	description: "Looks up what a move does.",
	usage: "[text: **dex**/**effect**/**effectshort**] [*move name or ID*]\nNote: When looking up a Z move with multiple damage categories, specify which one you want (for example \"tectonic rage--physical\")",

	execute(message, args, client) {
		if (args[1] == undefined) {
			message.reply("please enter both text kind and move name");
			h = true;
		} else {
			P.getMoveByName(args[1].toLowerCase().replace(" ", "-"))
				.then(function(response) {
					moveInfo = response;
				})
				.catch(function(error) {
					console.log('There was an ERROR: ', error);
				});
		}

		if (moveInfo == undefined) {
			message.reply("Move " + args[1] + "not found");
			h = true;
			g = true;
		}

		a = args[0].toLowerCase();
		if ((a === "dex" || a === "effect" || a === "effectshort") && !g) {
			switch (a) {
			case "dex":
				ft = moveInfo.flavor_text_entries;
				for (x in ft) {
					if (ft[x].language.name == "en" && ft[x].version_group.name == "sun-moon") {
						infoText = ft[x].flavor_text;
						break;
					}
				}
				break;
			case "effect":
				infoText = moveInfo.effect_entries.effect;
				break;
			case "effectshort":
				infoText = moveInfo.effect_entries.short_effect;
				break;
			default:
			}
			message.channel.send("**" + moveInfo.name + "**: " + infoText);
		} else if (!h) {
			message.reply("please specify the text kind");
		}
	},
};
