"use strict";

import { MessageEmbed } from "discord.js";
import Scraper from "utils/scraper-yandex.js";

export default {
    name: "riolu",
    errorVerb: "look up Riolu pictures",
    missingArgsVerb: "Riolu",
    aliases: ["rpics", "rii", "riolupics"],
    args: false,
    cooldown: 10,
    guildOnly: false,
    shortDesc: "Fetches and sends a Riolu picture",
    description:
        "This command will look up a random Riolu picture from Bing. This might take a while.",
    usage: "(**luu**/**lucario**) to search Lucario pictures instead.",

    /**
     * This function is used to get a random image from Bing
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

        const scraper = new Scraper();
        const results = await scraper.list({ keyword: query, detail: true });
        const reply = !results.length
            ? "```js\nError: I was not able to get any images, I am sorrii.```"
            : new MessageEmbed()
                .setColor(color)
                .setImage(
                    results[Math.floor(Math.random() * results.length)].url,
                )
                .setFooter(
                    `Requested by ${message.author.username}`,
                    message.author.avatarURL(),
                );

        message.channel.send(reply);
    },
};
