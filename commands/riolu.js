require("dotenv").config();
const Discord = require("discord.js");

const GoogleImages = require("google-images");
const googleImages = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

module.exports = {
	name: "riolu",
	errorVerb: "look up Riolu pics",
	missingArgsVerb: "Riolu",

	aliases: ["rpics", "rii", "riolupics"],
	args: false,
	cooldown: 10,
	guildOnly: false,
	description:
		"This command will look up a random Riolu picture from Google Images.",
	usage: "\n",

	// This function is used to get a random image from Google and then send it to Discord
	execute(message, args, client) {
		try {
			const results = googleImages.search("Riolu"); // Indexing Google images
			const reply = !results
				? "No results"
				: new Attachment(
						results[Math.floor(Math.random() * results.length)].url
				  ); // Randomize output
			message.channel.send(reply);
		} catch (e) {
			return e;
		}
	},
};
