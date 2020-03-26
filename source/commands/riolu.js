"use strict";

import { Ecosia } from "alt-image-scraper";
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
        let query;
        let color;

        if (args[0] === "luu" || args[0] === "lucario") {
            query = "Lucario";
            color = "#268AB5";
        } else {
            query = "Riolu";
            color = "#91CAE9";
        }

        const ecosia = new Ecosia({
            keyword: query,
            puppeteer: {
                headless: true,
                args: ["--no-sandbox"],
            },
        });

        const results = await ecosia.scrape();
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
