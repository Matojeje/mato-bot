"use strict";

import { MessageEmbed, MessageAttachment } from "discord.js";

require("dotenv").config();

const meta = {
    version: "1.9.5",
    timestamp: 1608299016861, // Time of last edit (roughly) from Date.now()
};

export default {
    name: "about",
    errorVerb: "tell you about myself",
    missingArgsVerb: "rii",
    aliases: ["bot", "info"],
    cooldown: 40,
    shortDesc: "Shows info about the bot",
    description: `In ${process.env.PREFIX}about, I tell you a little about myself!`,
    guildOnly: false,

    execute({ channel }, args, client) {
        const badge = new MessageAttachment(
            "resources/badgeAbout.png",
            "badge.png",
        );
        const drawing = new MessageAttachment(
            "resources/drawingBotHD.png",
            "drawing.png",
        );

        const cookies = Math.round(1.25 * (Math.random() * 7.7) ** 2);

        const blank = "\u200B";

        const riiInfo = new MessageEmbed()
            .setColor("#2990bb")
            .setAuthor("About mato-bot", "attachment://badge.png", "")
            .setTitle(`**v${meta.version}** (in development)`)
            .setDescription(
                `
Running on Discord.js v12!

Use **${process.env.PREFIX}help** to check the available commands.
https://github.com/Matojeje/mato-bot

Mato-bot currently has ${cookies} cookies in his belly.`,
            )
            .addField(
                "Uptime",
                client.uptime < 15 * 60 * 1000 // 15 minutes
                    ? `${Math.round(client.uptime / 1000)} seconds`
                    : `${Math.round(client.uptime / 60000)} minutes`,
                true,
            )
            .addField("Woke up at", client.readyAt.toLocaleString(), true)
            .addField("Ping", `${Math.round(client.ws.ping)} ms`, true)
            .addField("~~⠀           ⠀~~", "🔵 **Credits**")
            .addField(
                "<:blank:688476368471982165> Code:",
                `
🍪 Mato | https://github.com/Matojeje
🍪 Dania Rifki | https://github.com/IamRifki`,
            )
            .addField(
                "<:blank:688476368471982165> Artwork:",
                `
🍪 HavocDusk | https://DuskyUmbreon.deviantart.com
🍪 Spray-POKA | https://Spray-POKA.deviantart.com
🍪 Parapetch | https://twitter.com/Parapetch_/`,
            )
            .addField("~~⠀           ⠀~~", blank)
            .setImage("attachment://drawing.png")
            .setTimestamp(new Date(meta.timestamp));
        if (args[0]) {
            riiInfo.addField("<a:He:608354487836475394>", blank, true);
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
