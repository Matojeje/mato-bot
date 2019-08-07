require("dotenv").config();
const Discord = require("discord.js");
// var cjson = require("cjson");
// const meta = cjson.load("../versionInfo.jsonc");

const meta = {
	version: "1.7",
	timestamp: new Date(1565136000000), // Time of last edit (±) from Date.now()
};

module.exports = {
	name: "about",
	errorVerb: "tell you about myself",
	missingArgsVerb: "rii",
	aliases: ["bot"],
	cooldown: 40,
	shortDesc: "Shows info about the bot",
	description:
		"In " + process.env.PREFIX + "about, I tell you a little about myself!",
	guildOnly: false,
	usage: "**credits** to include credits",

	execute(message, args, client) {
		const badge = new Discord.Attachment(
			"./resources/badgeAbout.png",
			"badge.png"
		);
		const drawing = new Discord.Attachment(
			"./resources/drawingBotHD.png",
			"drawing.png"
		);
		// const icon = new Discord.Attachment("./resources/iconMato.png", "icon.png");

		const blank = "\u200B";

		riiInfo = new Discord.RichEmbed()
			.setColor("#2990bb")
			.setAuthor("About mato-bot", "attachment://badge.png", "")
			.setTitle(`**v${meta.version}** (in development)`)
			.setDescription(
				new Date(meta.timestamp).toLocaleString() +
					`
Running on Discord.js@11.4.2!

Use **${process.env.PREFIX}help** to check the available commands.
https://github.com/Matojeje/mato-bot`
			)
			.addField("Uptime", Math.round(client.uptime) + " ms", true)
			.addField("Woke up at", client.readyAt.toLocaleString(), true)
			.addField("Ping", client.ping.toFixed(1) + " ms", true)
			.addField(
				"Cookies in belly",
				Math.round(Math.random() * 5000),
				true
			)
			/* .setURL("https://github.com/Matojeje/mato-bot") */
			.setThumbnail("attachment://drawing.png")
			.setTimestamp(new Date(meta.timestamp));

		if (args[0] === "credits") {
			riiInfo
				.addBlankField()
				.addField(
					"<:blueDot:357620038838124544> **Credits**",
					"~~             ~~"
				)
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
				);
		} else if (args[0]) {
			riiInfo.addField("He", "<a:He:608354487836475394>", true);
		}

		client.fetchUser(process.env.MATO).then(mato => {
			avatarURL = `https://cdn.discordapp.com/avatars/${mato.id}/${mato.avatar}.webp`;
			riiInfo.setFooter("By " + mato.username, avatarURL);
			message.channel.send({
				embed: riiInfo,
				files: [badge, drawing],
			});
		});
	},
};
