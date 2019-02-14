require("dotenv").config();
const Discord = require("discord.js");

module.exports = {
	name: "about",
	errorVerb: "tell you about myself",
	missingArgsVerb: "rii",
	aliases: ["bot"],
	cooldown: 40,
	description:
		"In " + process.env.PREFIX + "about, I tell you a little about myself!",
	guildOnly: false,
	usage: "",

	execute(message, args, client) {
		const badge = new Discord.Attachment(
			"./resources/badgeAbout.png",
			"badge.png"
		);
		const drawing = new Discord.Attachment(
			"./resources/drawingBotHD.png",
			"drawing.png"
		);
		const icon = new Discord.Attachment("./resources/iconMato.png", "icon.png");

		const riiInfo = new Discord.RichEmbed()
			.setColor("#2990bb")
			.setAuthor("About mato-bot", "attachment://badge.png", "")
			.setTitle("**v1.5.1** (in development)")
			.setDescription(
				`13. 2. 2019
				Running on Discord.js@11.4.2!

				**Use ${process.env.PREFIX}help to check the available commands.**
				https://github.com/Matojeje/mato-bot
				License: MIT`
			)
			.addField("Uptime", Math.round(client.uptime) + " ms", true)
			.addField("Woke up at", client.readyAt.toLocaleString(), true)
			.addField("Ping", client.ping.toFixed(1) + " ms", true)
			.addField("Cookies in belly", Math.round(Math.random() * 5000), true)
			/* .setURL("https://github.com/Matojeje/mato-bot") */
			.setImage("attachment://drawing.png")
			.setTimestamp()
			.setFooter("By Mato", "attachment://icon.png");

		message.channel.send({
			embed: riiInfo,
			files: [badge, drawing, icon],
		});
	},
};
