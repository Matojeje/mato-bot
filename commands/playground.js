const Discord = require("discord.js");
const Canvas = require("canvas");

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

				loss =
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAHCAMAAAAPmYwrAAAABlBMVEUAAAD///+l2Z/dAAAAIElEQVQIW2NgYGBkAGEQBAM0LkwIxoQDrLKoOmFckGIABjsAHwiH5BAAAAAASUVORK5CYII=";

				replyImage(loss);

			case "canvas":
				canvas = Canvas.createCanvas(64, 64);
				ctx = canvas.getContext('2d');

				mato =
					"https://cdn.discordapp.com/avatars/189400498497912832/8059a93a3e44ca4954cb0af13b7afcfc.png?size=128"

				loadImage(message.author.displayAvatarURL || mato).then(avatar => {
					ctx.drawImage(avatar, 0, 0, 64, 64);
					ctx.fillText("heya", 5, 40);
					replyImage(canvas.toDataURL())
				})

			default:
				reply("What??");
				break;
		}

		function reply(text) {
			message.channel.send(text);
		}

		function replyImage(dataURL) {
			message.channel.send({
				files: [dataURLtoBuffer(dataURL)],
			}).catch(e => {
				throw new Error(e);
			});
			break;
		}

		function dataURLtoBuffer(dataUrl) {
			return Buffer.from(dataUrl.split(",")[1], "base64");
		}
	},
};
