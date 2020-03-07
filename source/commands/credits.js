import Discord from "discord.js";

require("dotenv").config();

export default {
	name: "credits",
	errorVerb: "credit people",
	missingArgsVerb: "staff",
	cooldown: 20,
	shortDesc: "Shows who worked on this bot",
	description: `${process.env.PREFIX}credits tells you who worked on me, beep!`,
	guildOnly: false,
	args: false,

	execute({ channel }) {
		const badge = new Discord.MessageAttachment(
			"resources/badgeAbout.png",
			"badge.png"
		);
		const drawing = new Discord.MessageAttachment(
			"resources/drawingBotWelcome.png",
			"drawing.png"
		);

		const icon = new Discord.MessageAttachment(
			"resources/iconMato.png",
			"icon.png"
		);

		const credits = new Discord.MessageEmbed()
			.setColor("#2990bb")
			.setAuthor("About mato-bot", "attachment://badge.png", "")
			.setTitle(`**Credits**`)
			.setDescription("~~               ~~")
			.addField(
				"Code:",
				`
\\🍪 Mato | https://github.com/Matojeje
\\🍪 Rifki K. | https://github.com/IAmRifki`,
				false
			)
			.addField(
				"Artwork:",
				`
\\🍪 HavocDusk | https://DuskyUmbreon.deviantart.com
\\🍪 Spray-POKA | https://Spray-POKA.deviantart.com
\\🍪 Parapetch | https://twitter.com/Parapetch_/`,
				false
			)
			.setURL("https://github.com/Matojeje/mato-bot")
			.setThumbnail("attachment://drawing.png")
			.setTimestamp()
			.setFooter("By Mato", "attachment://icon.png");

		channel.send({
			embed: credits,
			files: [badge, drawing, icon],
		});
	},
};
