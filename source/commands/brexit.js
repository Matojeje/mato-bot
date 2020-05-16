"use strict";

import { MessageAttachment } from "discord.js";
import puppeteer from "puppeteer";

export default {
    name: "brexit",
    errorVerb: "getting ready",
    missingArgsVerb: "brexiting",
    aliases: ["gr", "ready"],
    cooldown: 10,
    guildOnly: false,
    args: true,
    description: "This command will get the bot to brexit. 🇬🇧✂️🇪🇺",
    shortDesc: "Get ready for something",
    usage: "[__text__]",

    async execute(message, args) {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], });
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 720 });
        await page.goto(`https://iamrifki.github.io/brexit/?text=${args.join(" ")}`, {
            waitUntil: "networkidle2",
        });
        await page.waitFor(1000);

        const imageBuffer = await page.screenshot({ type: "png" });
        await browser.close();

        const attachment = new MessageAttachment(imageBuffer);
        message.channel.send(attachment);
    },
};
