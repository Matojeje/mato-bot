const Discord = require("discord.js");

module.exports = {
	name: "playground",
	errorVerb: "test something",
	missingArgsVerb: "experiment",

	aliases: ["pg", "experiment"],
	args: true,
	cooldown: 0,
	guildOnly: false,
	description: "Mato's WIP commands",
	shortDesc: "Lets Mato test stuff",
	usage: "[*experiment name*]",

	execute(message, args, client) {
		switch (args[0].toLowerCase()) {
		case "dataurl":
			reply("DataURL test!");

			loss = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAHCAMAAAAPmYwrAAAABlBMVEUAAAD///+l2Z/dAAAAIElEQVQIW2NgYGBkAGEQBAM0LkwIxoQDrLKoOmFckGIABjsAHwiH5BAAAAAASUVORK5CYII=";

			message.channel.send({
				files: [dataURLtoBuffer(loss)],
			}).catch(e => {
				throw new Error(e);
			});
			break;

		default:
			reply("What??");
			break;
		}

		function reply(text) {
			message.channel.send(text);
		}

		function dataURLtoBuffer(dataUrl) {
			return Buffer.from(dataUrl.split(",")[1], 'base64');
		}
	},
};