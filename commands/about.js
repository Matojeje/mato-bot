require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
	name: "about",
	errorVerb: "tell you about myself",
	missingArgsVerb: "rii",
	aliases: ["bot"],
	cooldown: 40,
	description: "In " + process.env.PREFIX + "about, I tell you a little about myself!",
	guildOnly: false,
	usage: "",

	execute(message, args, client) {
		const riiInfo = new Discord.RichEmbed()
			.setColor("#2990bb")
			.setAuthor("About mato-bot", "./resources/badgeAbout.png", "")
			.setTitle("**v1.5.1** (in development)")
			.setDescription(
				`12. 2. 2019
				Running on Discord.js@11.4.2!

				**Use ${process.env.PREFIX}help to check the available commands.**
				https://github.com/Matojeje/mato-bot
				License: MIT`)
			.addField("Uptime", Math.round(client.uptime) + " ms", true)
			.addField("Woke up at", client.readyAt.toLocaleString(), true)
			.addField("Ping", client.ping.toFixed(1) + " ms", true)
			.addField("Cookies in belly", Math.round(Math.random() * 5000), true)
			/* .setURL("https://github.com/Matojeje/mato-bot") */
			.setImage("./resources/drawingBotHD.png")
			.setTimestamp()
			.setFooter("By Mato", "./resources/iconMato.png");
		message.channel.send({ embed: riiInfo });
	},
};
