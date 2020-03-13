"use strict";

import { MessageAttachment } from "discord.js";
import Scraper from "scraper";

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
    usage: "",

    // This function is used to get a random image from Bing and then send it to Discord.
    async execute({ channel }, args) {
        let query;

        if (args[0] === "luu") {
            query = "Lucario";
        } else {
            query = "Riolu";
        }

        const scraper = new Scraper();
        const results = await scraper.list({ keyword: query, detail: true });
        const reply = !results.length
            ? "```js\nError: I was not able to get any images, I am sorrii.```"
            : new MessageAttachment(
                results[Math.floor(Math.random() * results.length)].url,
            );

        channel.send(reply);
    },
};
