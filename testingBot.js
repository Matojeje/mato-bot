const fs = require("fs");

require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const musicList = require("./tunes.json");
const cooldowns = new Discord.Collection();

client.on("guildCreate", (guild) => {
	console.log("Got added to " + guild);
	if (guild.available) {
		const riiHello = new Discord.RichEmbed()
			.setColor("#2990bb")
			.setImage("https://i.imgur.com/RNYfcer.png");
		client.channels
			.get(guild.systemChannelID)
			.send(
				`Hello! I'm Mato-bot. My prefix is \`${process.env.PREFIX}\`. Type \`${
					process.env.PREFIX
				}help\` to get started, beep!`,
				{ embed: riiHello }
			);
	}
});

client.on("ready", () => {
	console.log("Logged in as " + client.user.tag + "!");
	client.setInterval(() => mixtape(), 5 * 60 * 1000);
	mixtape();
	// client.user.setActivity('Mato', { type: 'LISTENING' });
});

client.on("message", (message) => {
	// Command check
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) {
		itsCommand = false;
		onDM(message);
		return;
	}
	console.log(message.author.id);
	if (
		message.author.id == 189400498497912832 &&
		message.content.startsWith(`${process.env.PREFIX}mato`) &&
		!message.channel.name
	) {
		args = message.content.slice(process.env.PREFIX.length).split(/\s?§\s?/g); // Splitting out arguments and prefix
		commandName = args.shift().toLowerCase();
		console.log(`Secret mato command: ${args[0]} (${message.content})`);
		switch (args[0]) {
		case "send": // ;mato § send § 12345 § henlo (§ settings)
			matoChannel = client.channels.get(args[1]);
			if (matoChannel == undefined) {
				console.log("Can't send there");
				break;
			}
			matoChannel.send(args[2], args[3] || "");
			break;
		case "sendDM": // ;mato § sendDM § 12345 § henlo (§ settings)
			matoUser = client.users.get(args[1]);
			matoUser.send(args[2], args[3] || "");
			console.log("I secretly sent a DM to " + matoUser.tag + "!");
			break;
		case "test":
			message.author.send("rii");
			break;
		case "music":
			client.user.setActivity(args[1], { type: "LISTENING" });
			break;
		default:
		}
	}

	/* if (message.content.toString().toLowerCase() == "f") {
		if (new Date.getSeconds().toString().endsWith(0) || new Date.getSeconds().toString().endsWith(5)) {
			message.channel.send("F");
		}
	} */

	args = message.content.slice(process.env.PREFIX.length).split(/ +/); // Splitting out arguments and prefix
	commandName = args.shift().toLowerCase();

	console.log(
		`Got command! ${commandName}, from ${message.author.username} at ${message
			.channel.name || "DMs"}`
	);
	const command =
		client.commands.get(commandName) || // Is that a real command?
		client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
		);
	if (!command) return;

	if (command.guildOnly && message.channel.type !== "text") {
		// DMs check
		return message.reply(
			"I don't think I know how do that thing in DMs, sorrii!"
		);
	}

	if (command.args && !args.length) {
		// Argument count check from "args"
		let reply = `${message.author}, you forgot to tell me the ${
			command.missingArgsVerb
		} settings`;

		if (command.usage) {
			// Did I write how to use it then?
			reply += `. You should say it like ${process.env.PREFIX}${command.name} ${
				command.usage
			}`;
		} else {
			reply += ", silly";
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		// Cooldown stuff
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	if (process.env.DEBUG == true) {
		cooldownAmount = 0;
	} else {
		cooldownAmount = (command.cooldown || 3) * 1000; // default value is 3 seconds => ms
	}

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	} else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`hold up! Please wait ${timeLeft.toFixed(1)}s to use ${
					process.env.PREFIX
				}${command.name} again.`
			);
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		// Goes launch /commands/command.js
		itsCommand = true;
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply(
			"there was some sort of weird error when I was trying to " +
				command.errorVerb +
				".\n\n*a small rolled up paper strip prints out, saying:*\n```js\n" +
				error +
				"```"
		);
	}

	if (!itsCommand) {
		onDM(message);
	}

	/* switch(command){
		case "help":
			message.channel.send("**About bot**\n\n"+
			"Commands: \\*help, \\*metronome\n"+
			"Testing commands: \\*beep, \\*boop, \\*blep, \\*pingme, \\*cookie\n"+
			"Made by <@189400498497912832>");
			break;
		case "metronome": metronome(message.author,message.channel); break;
		case "beep": message.channel.send("boop"); break;
		case "boop": message.channel.send("beep"); break;
		case "blep": message.channel.send("blep"); break;
		case "cookie": message.channel.send(":cookie:"); break;
		case "pingme": message.channel.send(message.author); break;
		default: console.log("Unknown command");
	} */
});

client.login(process.env.CLIENT_TOKEN);
console.log("Prefix: " + process.env.PREFIX);

process.on("unhandledRejection", (error) =>
	console.error(`Uncaught Promise Rejection:\n${error}`)
);

function mixtape() {
	n = Math.floor(Math.random() * musicList.length);
	music = musicList[n].By + " :: " + musicList[n].Song;
	client.user.setActivity(music, { type: "LISTENING" });
	console.log("Music changed to " + music + "!");
}

function onDM(message) {
	if (
		message.channel.type == "dm" &&
		!message.content.startsWith(`${process.env.PREFIX}mato`) &&
		message.author.id != 342273963734466561
	) {
		console.log(
			"Recieved a non-command DM from " + message.author.tag + ":\n" + message
		);
		// client.users.get(189400498497912832).send("Recieved a non-command DM from " + message.author.tag + ":\n" + message);
	}
}
