require("dotenv").config();
const Discord = require("discord.js");

module.exports = {
	name: "credits",
	errorVerb: "credit people",
	missingArgsVerb: "staff",
	cooldown: 20,
	shortDesc: "Shows who worked on this bot",
	description: process.env.PREFIX + "credits tells you who worked on me, beep!",
	guildOnly: false,
	args: false,

	execute(message) {
		const badge = new Discord.Attachment(
			"./resources/badgeAbout.png",
			"badge.png"
		);
		const drawing = new Discord.Attachment(
			"./resources/drawingBotWelcome.png",
			"drawing.png"
		);

		const icon = new Discord.Attachment("./resources/iconMato.png", "icon.png");

		const credits = new Discord.RichEmbed()
			.setColor("#2990bb")
			.setAuthor("About mato-bot", "attachment://badge.png", "")
			.setTitle(`**Credits**`)
			.setDescription("~~               ~~")
			.addField("Code:", `
\\🍪 Mato | https://github.com/Matojeje
\\🍪 Rifki K. | https://github.com/IAmRifki`, false)
			.addField("Artwork:", `
\\🍪 HavocDusk | https://DuskyUmbreon.deviantart.com
\\🍪 Spray-POKA | https://Spray-POKA.deviantart.com
\\🍪 ParaPetch | https://twitter.com/Parapetch_/`, false)
			.setURL("https://github.com/Matojeje/mato-bot")
			.setThumbnail("attachment://drawing.png")
			.setTimestamp()
			.setFooter("By Mato", "attachment://icon.png");

		message.channel.send({
			embed: credits,
			files: [badge, drawing, icon],
		});
	},
};
