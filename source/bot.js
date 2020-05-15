"use strict";

import Discord from "discord.js";
import csvjson from "csvjson";
import fs from "fs";
import path from "path";

require("dotenv").config();
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync(__dirname + "/commands")
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(__dirname + `/commands/${file}`);
    client.commands.set(command.name, command);
}

const musicList = loadSongs();
const cooldowns = new Discord.Collection();

client.on("guildCreate", guild => {
    console.log(`Got added to ${guild}`);
    if (guild.available) {
        const drawing = new Discord.MessageAttachment(
            "resources/drawingBotWelcome.png",
            "drawing.png",
        );

        const joinEmbed = new Discord.MessageEmbed()
            .setColor("#2990bb")
            .setImage("attachment://drawing.png");

        client.channels.cache
            .get(guild.systemChannelID)
            .send(
                `Hello! I'm Mato-bot. My prefix is \`${process.env.PREFIX}\`. ` +
					`Type \`${process.env.PREFIX}help\` to get started, beep!`,
                {
                    embed: joinEmbed,
                    files: [drawing],
                },
            );
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.setInterval(() => mixtape(), 5 * 60 * 1000);
    mixtape("J̲u̲s̲t̲ ̲s̲t̲a̲r̲t̲e̲d̲ ̲u̲p̲!");

    client.users.cache
        .get(process.env.MATO)
        .send(`Bot is up! (${new Date().toLocaleTimeString()})`);
});

client.on("message", message => {
    // Command check
    let itsCommand;
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) {
        itsCommand = false;
        onDM(message);
        return;
    }
    console.log(message.author.id);
    if (
        message.author.id === process.env.MATO &&
		message.content.startsWith(`${process.env.PREFIX}mato`) &&
		!message.channel.name
    ) {
        secretCommand(message);
    }

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/); // Splitting out arguments and prefix
    const commandName = args.shift().toLowerCase();

    console.log(
        `Got command! ${commandName}, from ${
            message.author.username
        } at ${message.channel.name || "DMs"}`,
    );

    const command =
		client.commands.get(commandName) || // Is that a real command?
		client.commands.find(
		    ({ aliases }) => aliases && aliases.includes(commandName),
		);
    if (!command) {return;}

    if (command.guildOnly && message.channel.type !== "text") {
        // DMs check
        return message.reply(
            "I don't think I know how do that thing in DMs, sorrii!",
        );
    }

    if (command.args && !args.length) {
        // Argument count check from "args"
        let reply = `${
            message.author
        }, you forgot to tell me the ${command.missingArgsVerb ||
			"command"} settings`;

        if (command.usage) {
            // Did I write how to use it then?
            if (typeof command.usage === "string") {
                reply += `. You should write it like ${`${process.env.PREFIX}**${command.name}** ${command.usage}.`}`;
            } else {
                // There are multiple usages
                for (let i = 0; i < command.usage.length - 1; i++) {
                    usage += `${process.env.PREFIX}**${command.name}** ${command.usage[i]} or `;
                }
                usage += `${process.env.PREFIX}**${command.name}** ${command.usage[i]}.`;
            }
        } else {
            reply += ", silly";
        }

        return message.channel.send(reply);
    }

    // Cooldown Stuff
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);

    let cooldownAmount;

    // NOTE(alt): Due to "use strict" and Babel you can't just read a string called "true" as a boolean, you have to compare it directly
    if (process.env.DEBUG === "true") {
        console.log("Cooldown skip!");
        cooldownAmount = 0;
    } else {
        cooldownAmount = (command.cooldown || 3) * 1000; // default value is 3 seconds => ms
    }

    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
        const expirationTime =
			timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `Hold up! Please wait ${timeLeft.toFixed(1)}s to use ${
                    process.env.PREFIX
                }${command.name} again.`,
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
        let dmRecipient = "";
        if (message.channel.type !== "text") {
            dmRecipient = `${tag(message.author)}, `;
        }
        message.reply(
            `${dmRecipient}there was some sort of weird error when I was trying to ${command.errorVerb ||
				"execute the command."}.\n\n*a small rolled up paper strip prints out, saying:*\n\`\`\`js\n${error}\`\`\``,
        );
    }

    if (!itsCommand) {
        onDM(message);
    }
});

client.login(process.env.CLIENT_TOKEN);
console.log(`Prefix: ${process.env.PREFIX}`);

process.on("unhandledRejection", error =>
    console.error("Uncaught Promise Rejection:\n", error),
);

function loadSongs() {
    const musicFilePath = path.join(__dirname, "../mixtape.csv");
    const musicData = fs.readFileSync(musicFilePath, { encoding: "utf-8" });
    const tempList = csvjson.toObject(musicData);
    console.log(`Loaded a list of ${tempList.length} songs!`);
    return tempList;
}

function mixtape(message) {
    const musicTrack = Math.floor(Math.random() * musicList.length);
    const div = " :: ";
    const music =
		(message || "") +
		div +
		musicList[musicTrack].By +
		div +
		musicList[musicTrack].Song;
    client.user.setActivity(music, { type: "LISTENING" });
    console.log(`Music changed to ${music}!`);
}

function onDM(message) {
    if (
        message.channel.type === "dm" &&
		!message.content.startsWith(`${process.env.PREFIX}mato`) &&
		message.author.id != client.user.id // Not mato-bot
    ) {
        console.log(
            `Received a non-command DM from ${message.author.tag}:\n${message}`,
        );
        // client.users.cache.get(process.env.MATO).send("Recieved a non-command DM from " + message.author.tag + ":\n" + message);
    }
}

function secretCommand({ content, author }) {
    const args = content.slice(process.env.PREFIX.length).split(/\s?§\s?/g); // Splitting out arguments and prefix
    commandName = args.shift().toLowerCase();
    console.log(`Secret mato command: ${args[0]} (${content})`);

    // Parse discord stuff
    args[2] = args[2]
        .replace(/emoji\((\d+),(\w+)\)/g, "<:$2:$1>") // emoji(id,name)
        .replace(/animatedEmoji\((\d+),(\w+)\)/g, "<a:$2:$1>") // animatedEmoji(id,name)
        .replace(/channel\((\d+)\)/g, "<#$1>") // channel(id)
        .replace(/user\((\d+)\)/g, "<@$1>"); // user(id)

    switch (args[0]) {
        case "send": // ;mato § send § 12345 § henlo (§ settings)
            matoChannel = client.channels.cache.get(args[1]);
            if (matoChannel === undefined) {
                console.log("Can't send there");
            } else {
                matoChannel.send(args[2], args[3] || "");
            }
            break;
        case "sendDM": // ;mato § sendDM § 12345 § henlo (§ settings)
            matoUser = client.users.cache.get(args[1]);
            matoUser.send(args[2], args[3] || "");
            console.log(`I secretly sent a DM to ${matoUser.tag}!`);
            break;
        case "test":
            author.send("rii");
            break;
        case "music":
            client.user.setActivity(args[1], { type: "LISTENING" });
            break;
        default:
    }
}

function tag({ id }) {
    return `<@${id}>`;
}
