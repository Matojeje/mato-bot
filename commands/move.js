const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

module.exports = {
	name: "moveinfo",
	errorVerb: "search up what that move does (WIP)",
	missingArgsVerb: "move",

	aliases: ["mi", "move"],
	args: true,
	cooldown: 10,
	guildOnly: false,
	description: "Looks up what a move does. (Returns flavor text using Pokéapi)",
	usage:
		'[*move name or ID*]\nNote: When looking up a Z move with multiple damage categories, specify which one you want (for example "tectonic rage--physical")',

	execute(message, args, client) {
		let hasTextSetting = false;
		let hasMove = false;

		input = args.toString().replace(",", " ");
		console.log("i: " + input);

		formattedMove = input.toLowerCase().replace(/hasMove/, "-");
		console.log("f: " + formattedMove);
		P.getMoveByName(formattedMove)
			.then(function(response) {
				moveInfo = response;
				if (moveInfo == undefined) {
					message.reply("Move " + input + "not found");
					hasTextSetting = true;
					hasMove = true;
				}

				a = input.toLowerCase();
				if (!hasMove) {
					ft = moveInfo.flavor_text_entries;
					for (x in ft) {
						if (
							ft[x].language.name == "en" &&
							ft[x].version_group.name == "sun-moon"
						) {
							infoText = ft[x].flavor_text;
							break;
						}
					}
					message.channel.send(
						`**${cap(input)}** (${moveInfo["type"]["name"] ||
							"unknown"} type ${moveInfo["damage_class"]["name"] ||
							""} move)\nPower: **${moveInfo["power"] ||
							"?"}** Accuracy: **${moveInfo["accuracy"] || "?"}**\n${infoText}`
					);
				} else if (!hasTextSetting) {
					message.reply("please specify the text kind");
				}
			})
			.catch(function(error) {
				console.log("Pokédex API error:\n\n" + error);
				message.channel.send("**PokéAPI error**:\n" + error);
			});

		function cap(string) {
			return string[0].toUpperCase() + string.slice(1);
		}
	},
};
