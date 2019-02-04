// https://i.imgur.com/Ppji6sz.jpg

const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: "about",
	errorVerb: "tell you about myself",
	missingArgsVerb: "rii",
	aliases: ["bot"],
	cooldown: 40,
	description: "In " + prefix + "about, I tell you a little about myself!",
	guildOnly: false,
	usage: "",

	execute(message, args, client) {
		const riiInfo = new Discord.RichEmbed()
			.setColor("#2990bb")
			.setAuthor("About mato-bot", "https://i.imgur.com/Hny5LS4.png", "")
			.setTitle("v1.2.0-H (indev)")
			.setDescription("4. 2. 2019\nRunning on Heroku using Discord.js!\n\nUse " + prefix + "help to check the available commands.")
			.addField("Uptime", Math.round(client.uptime) + " milliseconds, since " + client.readyAt, true)
			.addField("Ping", Math.round(client.ping) + " milliseconds", true)
			.setImage('https://i.imgur.com/akVZfty.png')
			.setTimestamp()
			.setFooter('By Mato', "https://cdn.discordapp.com/avatars/334780937135194112/07e19132e1f110b9dc8aa82b80d09a5a.png");
		message.channel.send({ embed: riiInfo });
	},
};