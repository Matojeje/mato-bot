// https://i.imgur.com/Ppji6sz.jpg

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
			.setAuthor("**About mato-bot**", "https://i.imgur.com/Hny5LS4.png", "")
			.setTitle("**v1.4.0** (in development)")
			.setDescription("6. 2. 2019\nRunning on Discord.js@11.4.2!\n\n**Use " + process.env.PREFIX + "help to check the available commands.**\nhttps://github.com/Matojeje/mato-bot\nLicense: MIT")
			.addField("Uptime", Math.round(client.uptime) + " milliseconds, since *" + client.readyAt.toString().replace("00 (Střední Evropa (běžný čas))", "").replace("GMT+0", "GMT+").replace("GMT-0", "GMT-") + "*", true)
			.addField("Ping", Math.round(client.ping) + " milliseconds", true)
			.setURL("https://github.com/Matojeje/mato-bot")
			.setImage('https://i.imgur.com/akVZfty.png')
			.setTimestamp()
			.setFooter('By Mato', "https://cdn.discordapp.com/avatars/334780937135194112/07e19132e1f110b9dc8aa82b80d09a5a.png");
		message.channel.send({ embed: riiInfo });
	},
};
