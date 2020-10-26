"use strict";

import EcoasiaImageScraper from "ecoasia-image-scraper";
import { MessageEmbed } from "discord.js";

export default {
    name: "riolu",
    errorVerb: "look up Riolu pictures",
    missingArgsVerb: "Riolu",
    aliases: ["rpics", "rii", "riolupics"],
    args: false,
    cooldown: 10,
    guildOnly: false,
    shortDesc: "Looks up a random Riolu picture.",
    description:
        "This command will look up a random Riolu picture from Ecosia. This might take a while.",
    usage: "(**luu**/**lucario**) to search Lucario pictures instead.",

    /**
     * This function is used to get a random image from Ecosia
     * and then send it to Discord via an embed.
     */
    async execute(message, args) {
        const query =
            args[0] === "luu" || args[0] === "lucario" ? "Lucario" : "Riolu";
        const color =
            args[0] === "luu" || args[0] === "lucario" ? "#268AB5" : "#91CAE9";

        const imageScraper = new EcoasiaImageScraper({
            keyword: query,
            puppeteer: {
                headless: true,
                args: ["--no-sandbox"],
            },
        });

        const results = await imageScraper.scrape();
        const reply = !results.length
            ? "```js\nError: I was not able to get any images, I am sorrii.```"
            : new MessageEmbed()
                .setColor(color)
                .setImage(results[Math.floor(Math.random() * results.length)])
                .setFooter(
                    `Requested by ${message.author.username}`,
                    message.author.avatarURL(),
                );

        message.channel.send(reply);
    },
};
