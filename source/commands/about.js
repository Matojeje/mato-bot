"use strict";

import Discord from "discord.js";

require("dotenv").config();

const meta = {
    version: "1.8",
    timestamp: new Date(1570314700000), // Time of last edit (±) from Date.now()
};

export default {
    name: "about",
    errorVerb: "tell you about myself",
    missingArgsVerb: "rii",
    aliases: ["bot"],
    cooldown: 40,
    shortDesc: "Shows info about the bot",
    description: `In ${process.env.PREFIX}about, I tell you a little about myself!`,
    guildOnly: false,
    usage: "**credits** to include credits",

    execute({ channel }, args, client) {
        const badge = new Discord.MessageAttachment(
            "resources/badgeAbout.png",
            "badge.png",
        );
        const drawing = new Discord.MessageAttachment(
            "resources/drawingBotHD.png",
            "drawing.png",
        );

        const blank = "\u200B";

        const riiInfo = new Discord.MessageEmbed()
            .setColor("#2990bb")
            .setAuthor("About mato-bot", "attachment://badge.png", "")
            .setTitle(`**v${meta.version}** (in development)`)
            .setDescription(
                new Date(meta.timestamp).toLocaleString() +
					`
Running on Discord.js!

Use **${process.env.PREFIX}help** to check the available commands.
https://github.com/Matojeje/mato-bot`,
            )
            .addField("Uptime", `${Math.round(client.uptime)} ms`, true)
            .addField("Woke up at", client.readyAt.toLocaleString(), true)
            .addField("Ping", `${client.ws.ping.toFixed(1)} ms`, true)
            .addField(
                "Cookies in belly",
                Math.round(Math.random() * 5000),
                true,
            )
        /* .setURL("https://github.com/Matojeje/mato-bot") */
            .setThumbnail("attachment://drawing.png")
            .setTimestamp(new Date(meta.timestamp));

        if (args[0] === "credits") {
            riiInfo
                .addField("\u200b", "\u200b", false) // NOTE(alt): This does the same thing as .addBlankField in Discord.js v11; They removed it for some stupid reason.
                .addField("🔵 **Credits**", "~~             ~~")
                .addField(
                    "Code:",
                    `
\\🍪 Mato | https://github.com/Matojeje
\\🍪 Rifki K. | https://github.com/IamRifki`,
                    false,
                )
                .addField(
                    "Artwork:",
                    `
\\🍪 HavocDusk | https://DuskyUmbreon.deviantart.com
\\🍪 Spray-POKA | https://Spray-POKA.deviantart.com
\\🍪 Parapetch | https://twitter.com/Parapetch_/`,
                    false,
                );
        } else if (args[0]) {
            riiInfo.addField("He", "<a:He:608354487836475394>", true);
        }

        client.users
            .fetch(process.env.MATO)
            .then(({ id, avatar, username }) => {
                const avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`;

                riiInfo.setFooter(`By ${username}`, avatarURL);
                channel.send({
                    embed: riiInfo,
                    files: [badge, drawing],
                });
            });
    },
};
