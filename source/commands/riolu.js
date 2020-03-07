import { MessageAttachment } from "discord.js";
import Scraper from "images-scraper";

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
	// This uses an old version of images-scraper which I will fix once pevers on GitHub comes up with a solution.
	async execute({ channel }) {
		const bing = new Scraper.Bing();
		const results = await bing.list({ keyword: "riolu", detail: true });
		const reply = !results.length
			? "```js\nError: I was not able to get any images, I am sorrii.```"
			: new MessageAttachment(
				results[Math.floor(Math.random() * results.length)].url
			);

		channel.send(reply);
	},
};
