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
			.setTitle("v1.1.0-H (indev)")
			.setDescription("24. 8. 2018\nRunning on Heroku using Discord.js!\n\nUse " + prefix + "help to check the available commands.")
			.addField("Uptime", client.uptime + " milliseconds, since " + client.readyAt, true)
			.addField("Ping", client.ping + " milliseconds", true)
			.setImage('https://i.imgur.com/akVZfty.png')
			.setTimestamp()
			.setFooter('By Mato', "https://cdn.discordapp.com/avatars/189400498497912832/d7dc389f5d85cccde8468e68911648d6.png");
		message.channel.send({ embed: riiInfo });
		// console.log(message.author);
	},
};