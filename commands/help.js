require('dotenv').config();

module.exports = {
	name: "help",
	errorVerb: "help you",
	missingArgsVerb: "help",
	aliases: ["h"],
	cooldown: 4,
	description: "This thingy shows various useful things to know about what I can do, beep!",
	guildOnly: false,
	usage: "[**command name**]",
	execute(message, args, client) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push("[Help] Beep beep, here's what I can do:");
			data.push(commands.map(command => command.name).join(", "));
			data.push(`And if you'd like to know more about one of these, send the command name after ${process.env.PREFIX}help!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('It seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("I dunno that one!");
		}

		data.push(`**:: ${command.name} ::**`);

		if (command.aliases) data.push(`(aka ${command.aliases.join(', ')})`);
		if (command.description) data.push(`**>** ${command.description}`);
		if (command.usage) data.push(`Usage: **${prefix}${command.name}** ${command.usage}`);

		data.push(`Cooldown: ${command.cooldown || 3}s`);


		message.channel.send(data, { split: true });
	},
};