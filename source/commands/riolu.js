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

	// This function is used to get a random image from Google and then send it to Discord.
	// Sadly, we need to use a headless browser because Google rate limits calls now.
	async execute({ channel }) {
		let google = new Scraper.Google({
			keyword: "riolu",
			limit: 10,
			puppeteer: {
				headless: true,
			},
		});

		const results = await google.start();

		const reply = !results.length
			? "```js\nError: I was not able to get any images, I am sowwy.```"
			: new MessageAttachment(
					results[Math.floor(Math.random() * results.length)].url
			  );

		channel.send(reply);
	},
};
