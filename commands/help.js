require("dotenv").config();

module.exports = {
	name: "help",
	errorVerb: "help you",
	missingArgsVerb: "help",
	aliases: ["h"],
	cooldown: 4,
	description:
		"This thingy shows various useful things to know about what I can do, `beep!`",
	guildOnly: false,
	shortDesc: "Lists all commands or shows details of one *(you're here!)*",
	usage: "[*command name*]",
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(
				"**```ini\n[Help] Beep beep, here's what I can do:\n" +
					"If you'd like to know more about one of these, " +
					"send the command name after " +
					process.env.PREFIX +
					"help!```**"
			);
			data.push(
				commands
					.map(command => {
						return `• ${process.env.PREFIX}**${
							command.name
						}**: ${command.shortDesc || ""}`;
					})
					.join("\n")
			);

			return message.author
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === "dm") return;
					message.reply("I've sent you a DM with all my commands!");
				})
				.catch(error => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);
					message.reply("It seems like I can't DM you!");
				});
		}

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("I don't know that one!");
		}

		data.push(`**:: ${command.name} ::**`);

		if (command.aliases) {
			data.push(`(aka ${command.aliases.join(", ")})`);
		}
		if (command.description) {
			data.push(`**>** ${command.description}`);
		} else data.push(`**>** ${command.shortDesc}`);
		if (command.usage && command.usage !== "") {
			if (typeof command.usage === "string") {
				data.push(
					`Usage: ${process.env.PREFIX}**${command.name}** ${command.usage}`
				);
			} else {
				let usage = "Usage:";
				for (let i = 0; i < command.usage.length; i++) {
					usage += `\n${process.env.PREFIX}**${command.name}** ${command.usage[i]}`;
				}
				data.push(usage + "\n");
			}
		}

		data.push(`Cooldown: ${command.cooldown || 3}s`);

		message.channel.send(data, { split: true });
	},
};
